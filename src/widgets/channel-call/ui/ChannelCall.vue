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
          {{ isVideoEnabled ? 'Stop Cam' : 'Start Cam' }}
        </p-button>

        <p-button @click="toggleAudio" :class="{ active: !isAudioMuted }">
          {{ isAudioMuted ? 'Unmute Mic' : 'Mute Mic' }}
        </p-button>

        <p-button @click="leave" class="leave-btn">Leave</p-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { io, Socket } from 'socket.io-client'
import { apiConfig } from '@/shared/config'
import * as MediasoupClient from 'mediasoup-client'
import { PeerCard } from '@/entities/peer'
import { PButton, PInput } from '@/shared/ui'
import CallConnect from '@/widgets/call-connect'

// --- Types ---
interface RemotePeer {
  userId: string
  audioStream?: MediaStream
  videoStream?: MediaStream
  isSpeaking?: boolean
}

// --- State ---
const serverId = 'server-1' // Хардкод или пропс
const userId = ref(`user-${Math.floor(Math.random() * 1000)}`)
const channelId = ref('general')
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
let socket: Socket
let device: MediasoupClient.Device
let producerTransport: MediasoupClient.types.Transport
let consumerTransport: MediasoupClient.types.Transport
let audioProducer: MediasoupClient.types.Producer | null = null
let videoProducer: MediasoupClient.types.Producer | null = null

const speaking = ref(false)
let audioContext: AudioContext | null = null
let analyser: AnalyserNode | null = null
let microphoneSource: MediaStreamAudioSourceNode | null = null
let animationFrameId: number | null = null
const SPEAKING_THRESHOLD = -20 // dB, настройте под ваш микрофон
const SILENCE_DURATION = 1000 // ms, после которого считаем что речь закончилась
let lastSpeakingTime = 0
let speakingTimeout: NodeJS.Timeout | null = null

// --- Lifecycle ---
onMounted(() => {
  initSocket()
})

onUnmounted(() => {
  leave()
})

// --- Socket Logic ---
const initSocket = () => {
  socket = io(apiConfig.baseUrl, {
    transports: ['polling', 'websocket'],
    reconnection: true,
    extraHeaders: {
      authorization: localStorage.getItem('token') || '',
    },
  })

  // Новый продюсер (кто-то включил камеру или микрофон)
  socket.on('webrtc:new_producer', async ({ producerId, userId, kind }) => {
    // Если это мы сами (на всякий случай) — игнорируем
    if (userId === userId.value) return
    await consumeSource(producerId, userId, kind)
  })

  // Кто-то зашел (просто создаем слот, пока без стримов)
  socket.on('webrtc:peer_joined', ({ userId: newUserId }) => {
    if (!remotePeersMap.has(newUserId)) {
      remotePeersMap.set(newUserId, { userId: newUserId })
      updatePeersArray()
    }
  })

  // Кто-то ушел
  socket.on('webrtc:peer_left', ({ userId: leftUserId }) => {
    remotePeersMap.delete(leftUserId)
    updatePeersArray()
  })

  socket.on('webrtc:peer_speaking', ({ userId: peerId, speaking }) => {
    const peer = remotePeersMap.get(peerId)
    if (peer) {
      peer.isSpeaking = speaking
      updatePeersArray()
    }
  })
}

// Хелпер для реактивности Vue (Map -> Array)
const updatePeersArray = () => {
  remotePeers.value = Array.from(remotePeersMap.values())
}

// --- Main Actions ---

// 1. Вход в канал (Сразу Аудио)
const join = async () => {
  if (!userId.value || !channelId.value) return

  socket.emit(
    'webrtc:join',
    {
      serverId,
      channelId: channelId.value,
      userId: userId.value,
    },
    async (response: { error?: string; rtpCapabilities: MediasoupClient.types.RtpCapabilities; peers?: any }) => {
      if (response.error) return console.error(response.error)

      // Init Device
      device = new MediasoupClient.Device()
      await device.load({ routerRtpCapabilities: response.rtpCapabilities })

      // Init Transports
      await initTransports()

      joined.value = true

      // 1.1 Сразу подключаем микрофон
      await publishMic()

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
    socket.emit('webrtc:create_transport', { forceTcp: false }, resolve),
  )

  producerTransport = device.createSendTransport(sendParams)

  producerTransport.on('connect', ({ dtlsParameters }, cb) => {
    socket.emit(
      'webrtc:connect_transport',
      { transportId: producerTransport.id, dtlsParameters },
      cb,
    )
  })

  producerTransport.on('produce', ({ kind, rtpParameters, appData }, cb) => {
    socket.emit(
      'webrtc:produce',
      {
        transportId: producerTransport.id,
        kind,
        rtpParameters,
        appData: { ...appData, userId: userId.value }, // Передаем наш ID
      },
      ({ id }: any) => cb({ id }),
    )
  })

  // Recv Transport
  const recvParams = await new Promise<any>((resolve) =>
    socket.emit('webrtc:create_transport', { forceTcp: false }, resolve),
  )

  consumerTransport = device.createRecvTransport(recvParams)

  consumerTransport.on('connect', ({ dtlsParameters }, cb) => {
    socket.emit(
      'webrtc:connect_transport',
      { transportId: consumerTransport.id, dtlsParameters },
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
        socket.emit('webrtc:speaking', {
          userId: userId.value,
          channelId: channelId.value,
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
          socket.emit('webrtc:speaking', {
            userId: userId.value,
            channelId: channelId.value,
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
      socket.emit('webrtc:speaking', {
        userId: userId.value,
        channelId: channelId.value,
        speaking: false,
      })
    }
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
      socket.emit('webrtc:speaking', {
        userId: userId.value,
        channelId: channelId.value,
        speaking: false,
      })
    }
  }
}

// 6. Подписка (Consume)
const consumeSource = async (producerId: string, remoteUserId: string, kind: 'audio' | 'video') => {
  const { rtpCapabilities } = device

  // Запрос на сервер
  socket.emit(
    'webrtc:consume',
    {
      transportId: consumerTransport.id,
      producerId,
      rtpCapabilities,
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

      socket.emit('webrtc:resume', { consumerId: consumer.id })
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
    socket.emit('webrtc:speaking', {
      userId: userId.value,
      channelId: channelId.value,
      speaking: false,
    })
  }

  localVideoStream.value?.getTracks().forEach((t) => t.stop())
  localAudioTrack?.stop()
  socket.emit('webrtc:leave')
  socket.disconnect()
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