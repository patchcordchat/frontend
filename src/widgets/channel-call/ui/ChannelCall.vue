<template>
  <div class="channel-call">
    <div class=" channel-call__content">

      <div v-if="joined" class="channel-call__video-grid">
        <peer-card :is-speaking="speaking" :videoStream="localVideoStream" />

        <peer-card v-for="peer in remotePeers" :key="peer.userId" :audioStream="peer.audioStream"
          :videoStream="peer.videoStream" :is-speaking="peer.isSpeaking" />
      </div>

      <call-connect v-else @join="join" />
    </div>

    <div class="channel-call__video-controls">
      <div class="channel-call__controls-top">
      </div>

      <div v-if="joined" class="channel-call__controls-bottom">
        <p-button @click="toggleVideo" :class="{ active: isVideoEnabled }">
          <p-icon v-if="isVideoEnabled" icon="misc.video-off" size="sm" />

          <p-icon v-else icon="misc.video" size="sm" />
        </p-button>

        <p-button @click="toggleAudio" :class="{ active: !isAudioMuted }">
          <p-icon v-if="isAudioMuted" icon="misc.mic-off" size="sm" />

          <p-icon v-else icon="misc.mic" size="sm" />
        </p-button>

        <p-button @click="leave" class="leave-btn">
          <p-icon icon="misc.end-call" size="sm" />
        </p-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Device } from 'mediasoup-client'
import type { Transport, Producer, RtpCapabilities } from 'mediasoup-client/types'
import { PeerCard, type RemotePeer } from '@/entities/peer'
import { PButton, PIcon } from '@/shared/ui'
import CallConnect from '@/widgets/call-connect'
import { useChannelStore } from '@/entities/channel'
import { useSound } from '@/shared/composables';
import { useSocket } from '@/shared/api'
const { activeId: channelId } = storeToRefs(useChannelStore())

const { play } = useSound();

// --- State ---
const userId = ref(`user-${Math.floor(Math.random() * 1000)}`)
const joined = ref(false)

// Локальные стримы
const localVideoStream = ref<MediaStream>()
const isVideoEnabled = ref(false)
const isAudioMuted = ref(false)
let localAudioTrack: MediaStreamTrack | null | undefined = null

// Удаленные участники
// Используем Map для удобного поиска по userId, но для шаблона конвертируем в array
const remotePeersMap = reactive(new Map<string, RemotePeer>())
const remotePeers = ref<RemotePeer[]>([])

// Mediasoup internals
const { socket } = useSocket()
let device: Device
let producerTransport: Transport
let consumerTransport: Transport
let audioProducer: Producer | null = null
let videoProducer: Producer | null = null

const speaking = ref(false)
let audioContext: AudioContext | null = null
let analyser: AnalyserNode | null = null
let microphoneSource: MediaStreamAudioSourceNode | null = null
let animationFrameId: number | null = null
const SPEAKING_THRESHOLD = -20 // dB, настройте под ваш микрофон
const SILENCE_DURATION = 1000 // ms, после которого считаем что речь закончилась
let lastSpeakingTime = 0
let speakingTimeout: NodeJS.Timeout | null = null

const onProducerAdded = async (data: { producer_id: string, user_id: string, kind: 'audio' | 'video' }) => {
  if (data.user_id === userId.value) return
  await consumeSource(data.producer_id, data.user_id, data.kind)
}

const onUserJoined = (data: { user_id: string }) => {
  if (remotePeersMap.has(data.user_id)) return;

  remotePeersMap.set(data.user_id, { userId: data.user_id })
  updatePeersArray()
}

const onUserLeft = (data: { user_id: string }) => {
  remotePeersMap.delete(data.user_id)
  updatePeersArray()
}

const onUserSpeaking = (data: { user_id: string, speaking: boolean }) => {
  const peer = remotePeersMap.get(data.user_id)
  if (!peer) return;

  peer.isSpeaking = data.speaking
  updatePeersArray()
}

// --- Lifecycle ---
onMounted(() => {
  socket.on('call:media:producer_added', onProducerAdded)
  socket.on('call:user_joined', onUserJoined)
  socket.on('call:user_left', onUserLeft)
  socket.on('call:user_speaking', onUserSpeaking)
})

onUnmounted(() => {
  socket.off('call:media:producer_added')
  socket.off('call:user_joined')
  socket.off('call:user_left')
  socket.off('call:user_speaking')

  leave()
})

// Хелпер для реактивности Vue (Map -> Array)
const updatePeersArray = () => {
  remotePeers.value = Array.from(remotePeersMap.values())
}

// --- Main Actions ---

// 1. Вход в канал (Сразу Аудио)
const join = async () => {
  if (!userId.value || !channelId.value) return

  socket.emit(
    'call:join',
    {
      channel_id: channelId.value,
      user_id: userId.value,
    },
    async (response: { error?: string; rtpCapabilities: RtpCapabilities; peers?: any }) => {
      if (response.error) return console.error(response.error)

      // Init Device
      device = new Device()
      await device.load({ routerRtpCapabilities: response.rtpCapabilities })

      // Init Transports
      await initTransports()

      joined.value = true

      // 1.1 Сразу подключаем микрофон
      await publishMic()

      play('user_join')

      // 1.2 Подписываемся на всех, кто уже в комнате
      // Backend теперь возвращает массив peers: [{ userId, producers: [...] }]
      if (response.peers) {
        for (const peer of response.peers) {
          // Создаем запись пира
          if (!remotePeersMap.has(peer.userId)) {
            remotePeersMap.set(peer.userId, { userId: peer.userId })
          }
          // Подписываемся на их потоки
          for (const producer of peer.producers) {
            await consumeSource(producer.id, peer.userId, producer.kind)
          }
        }
        updatePeersArray()
      }
    },
  )
}

// 2. Инициализация транспортов
const initTransports = async () => {
  // Send Transport
  const sendParams = await new Promise<any>((resolve) =>
    socket.emit('call:media:create_transport', { forceTcp: false }, resolve),
  )

  producerTransport = device.createSendTransport(sendParams)

  producerTransport.on('connect', ({ dtlsParameters }, cb) => {
    socket.emit(
      'call:media:connect_transport',
      { transport_id: producerTransport.id, dtls_parameters: dtlsParameters },
      cb,
    )
  })

  producerTransport.on('produce', ({ kind, rtpParameters, appData }, cb) => {
    socket.emit(
      'call:media:produce',
      {
        transport_id: producerTransport.id,
        kind,
        rtp_parameters: rtpParameters,
        app_data: { ...appData, user_id: userId.value }, // Передаем наш ID
      },
      ({ id }: any) => cb({ id }),
    )
  })

  // Recv Transport
  const recvParams = await new Promise<any>((resolve) =>
    socket.emit('call:media:create_transport', { force_tcp: false }, resolve),
  )

  consumerTransport = device.createRecvTransport(recvParams)

  consumerTransport.on('connect', ({ dtlsParameters }, cb) => {
    socket.emit(
      'call:media:connect_transport',
      { transport_id: consumerTransport.id, dtls_parameters: dtlsParameters },
      cb,
    )
  })
}

// 3. Публикация Аудио (Автоматически при входе)
const publishMic = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    localAudioTrack = stream.getAudioTracks()[0]

    // Публикуем
    audioProducer = await producerTransport.produce({
      track: localAudioTrack,
      appData: { kind: 'audio' },
    })

    isAudioMuted.value = false

    initVoiceActivityDetection(stream)
  } catch (e) {
    console.error('Mic access denied or error', e)
  }
}

const initVoiceActivityDetection = (stream: MediaStream) => {
  try {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    analyser = audioContext.createAnalyser()
    microphoneSource = audioContext.createMediaStreamSource(stream)

    microphoneSource.connect(analyser)

    analyser.fftSize = 512
    analyser.smoothingTimeConstant = 0.8

    startVoiceActivityMonitoring()
  } catch (e) {
    console.error('VAD init error:', e)
  }
}

const startVoiceActivityMonitoring = () => {
  if (!analyser) return

  const dataArray = new Uint8Array(analyser.frequencyBinCount)

  const checkSpeaking = () => {
    if (!analyser || isAudioMuted.value || !audioProducer) {
      animationFrameId = null
      return
    }

    analyser.getByteFrequencyData(dataArray)

    // Вычисляем средний уровень звука
    let sum = 0
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i] || 0
    }
    const average = sum / dataArray.length

    // Конвертируем в dB (0-255 -> -100 to -30 примерно)
    const db = 20 * Math.log10(average / 255)

    const now = Date.now()
    const isCurrentlySpeaking = db > SPEAKING_THRESHOLD && average > 0

    if (isCurrentlySpeaking) {
      lastSpeakingTime = now

      if (!speaking.value) {
        // Начали говорить
        speaking.value = true
        socket.emit('call:speaking', {
          user_id: userId.value,
          channel_id: channelId.value,
          speaking: true,
        })
      }

      // Сбрасываем таймер молчания
      if (speakingTimeout) {
        clearTimeout(speakingTimeout)
      }

      speakingTimeout = setTimeout(() => {
        if (speaking.value && Date.now() - lastSpeakingTime > SILENCE_DURATION) {
          speaking.value = false
          socket.emit('call:speaking', {
            user_id: userId.value,
            channel_id: channelId.value,
            speaking: false,
          })
        }
      }, SILENCE_DURATION)
    }

    animationFrameId = requestAnimationFrame(checkSpeaking)
  }

  animationFrameId = requestAnimationFrame(checkSpeaking)
}

const stopVoiceActivityMonitoring = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }

  if (speakingTimeout) {
    clearTimeout(speakingTimeout)
    speakingTimeout = null
  }

  if (microphoneSource) {
    microphoneSource.disconnect()
    microphoneSource = null
  }

  if (analyser) {
    analyser.disconnect()
    analyser = null
  }

  if (audioContext && audioContext.state !== 'closed') {
    audioContext.close()
    audioContext = null
  }
}

// 4. Публикация Видео (Кнопка)
const toggleVideo = async () => {
  if (isVideoEnabled.value) {
    // Выключить
    videoProducer?.close() // Закрываем в mediasoup
    localVideoStream.value?.getTracks().forEach((t) => t.stop()) // Останавливаем камеру
    localVideoStream.value = undefined
    isVideoEnabled.value = false
    videoProducer = null

    play('camera_off')
  } else {
    // Включить
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      const track = stream.getVideoTracks()[0]

      // Локальный предпросмотр
      localVideoStream.value = stream

      // Публикация
      videoProducer = await producerTransport.produce({
        track,
        appData: { kind: 'video' },
      })

      isVideoEnabled.value = true

      play('camera_on')
    } catch (e) {
      console.error('Camera error', e)
    }
  }
}

// 5. Тогл микрофона (без остановки трека, просто пауза)
const toggleAudio = () => {
  if (!audioProducer) return

  if (isAudioMuted.value) {
    // Включаем звук
    audioProducer.resume()
    localAudioTrack!.enabled = true
    isAudioMuted.value = false

    // Перезапускаем VAD если есть трек
    if (localAudioTrack && audioContext?.state === 'suspended') {
      audioContext.resume()
    }

    // Останавливаем статус "говорит" при включении
    if (speaking.value) {
      speaking.value = false
      socket.emit('call:speaking', {
        user_id: userId.value,
        channel_id: channelId.value,
        speaking: false,
      })
    }

    play('unmute')
  } else {
    // Выключаем звук
    audioProducer.pause()
    localAudioTrack!.enabled = false
    isAudioMuted.value = true

    // Останавливаем VAD
    stopVoiceActivityMonitoring()

    // Если был статус "говорит" - сбрасываем
    if (speaking.value) {
      speaking.value = false
      socket.emit('call:speaking', {
        user_id: userId.value,
        channel_id: channelId.value,
        speaking: false,
      })
    }

    play('mute')
  }
}

// 6. Подписка (Consume)
const consumeSource = async (producerId: string, remoteUserId: string, kind: 'audio' | 'video') => {
  const { rtpCapabilities } = device

  // Запрос на сервер
  socket.emit(
    'call:media:consume',
    {
      transport_id: consumerTransport.id,
      producer_id: producerId,
      rtp_capabilities: rtpCapabilities,
    },
    async (params: any) => {
      if (params.error) return console.error(params.error)

      // Создаем consumer mediasoup
      const consumer = await consumerTransport.consume({
        id: params.id,
        producerId: params.producerId,
        kind: params.kind,
        rtpParameters: params.rtpParameters,
      })

      // Создаем MediaStream из трека
      const stream = new MediaStream([consumer.track])

      // Обновляем стейт пира
      let peer = remotePeersMap.get(remoteUserId)
      if (!peer) {
        peer = { userId: remoteUserId }
        remotePeersMap.set(remoteUserId, peer)
      }

      if (kind === 'video') peer.videoStream = stream
      if (kind === 'audio') peer.audioStream = stream

      updatePeersArray()

      socket.emit('call:media:resume', { consumer_id: consumer.id })
    },
  )
}

const leave = () => {
  joined.value = false

  // Останавливаем VAD
  stopVoiceActivityMonitoring()

  // Сбрасываем статус говорящего
  if (speaking.value) {
    speaking.value = false
    socket.emit('call:speaking', {
      user_id: userId.value,
      channel_id: channelId.value,
      speaking: false,
    })
  }

  localVideoStream.value?.getTracks().forEach((t) => t.stop())
  localAudioTrack?.stop()
  socket.emit('call:leave')

  play('user_leave')
}
</script>

<style scoped lang="scss">
$block: '.channel-call';

#{$block} {
  flex: 1 1 auto;
  overflow: hidden;
  background: var(--black);

  &:hover {

    #{$block}__controls-bottom,
    #{$block}__controls-top {
      opacity: 1;
      transform: translateZ(0);
    }
  }

  &__content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--white);
    background: var(--black);
  }

  &__video-grid {
    display: flex;
    flex: 1 1 auto;
    flex-flow: row nowrap;
    gap: var(--space-xs);
    align-items: center;
    align-self: stretch;
    justify-content: center;
    overflow: hidden scroll;
    width: 100%;
    min-width: 100px;
    height: 100%;
    padding: var(--space-sm);
    scrollbar-color: transparent transparent;
    scrollbar-width: thin;
  }

  &__video-controls {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 var(--space-md) var(--space-md);
    inset-inline: 0;
    pointer-events: none;
  }

  &__controls-top {
    display: flex;
    flex: 0 1 auto;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    opacity: 0;
    pointer-events: all;
    transform: translate3d(0, -8px, 0);
    transition: transform .2s ease-in-out, opacity .2s ease-in-out;
  }

  &__controls-bottom {
    display: flex;
    flex: 0 1 auto;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    line-height: 0;
    opacity: 0;
    pointer-events: all;
    transform: translate3d(0, 8px, 0);
    transition: transform .2s ease-in-out, opacity .2s ease-in-out;
  }
}

.status {
  margin-right: auto;
  font-weight: bold;
}

.active {
  border-color: #c0392b !important;
  background-color: #e74c3c !important;
}
</style>