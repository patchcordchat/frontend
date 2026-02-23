<template>
  <div class="sfu-room">
    <div class="controls">
      <div v-if="!joined" class="join-form">
        <p-input v-model="userId" placeholder="My User ID" />
        <p-input v-model="channelId" placeholder="Channel ID" />
        <p-button @click="join" :disabled="!userId || !channelId"> Connect Voice </p-button>
      </div>

      <div v-else class="actions">
        <div class="status">Connected as: {{ userId }}</div>

        <p-button @click="toggleVideo" :class="{ active: isVideoEnabled }">
          {{ isVideoEnabled ? 'Stop Cam' : 'Start Cam' }}
        </p-button>

        <p-button @click="toggleAudio" :class="{ active: !isAudioMuted }">
          {{ isAudioMuted ? 'Unmute Mic' : 'Mute Mic' }}
        </p-button>

        <p-button @click="leave" class="leave-btn">Leave</p-button>
      </div>
    </div>

    <div class="video-grid">
      <div v-if="joined" class="video-card" :class="{ speak: speaking }">
        <video v-if="localVideoStream" :srcObject.prop="localVideoStream" autoplay playsinline muted
          class="video-feed"></video>

        <div v-else class="avatar-placeholder">
          <span>{{ userId }} (Me)</span>
          <span v-if="isAudioMuted">🎤 Muted</span>
        </div>

        <div class="user-label">Me</div>
      </div>

      <div v-for="peer in remotePeers" :key="peer.userId" class="video-card" :class="{ speak: peer.isSpeaking }">
        <video v-if="peer.videoStream" :srcObject.prop="peer.videoStream" autoplay playsinline
          class="video-feed"></video>

        <div v-else class="avatar-placeholder">
          <span>{{ peer.userId }}</span>
        </div>

        <audio v-if="peer.audioStream" :srcObject.prop="peer.audioStream" autoplay playsinline></audio>

        <div class="user-label">{{ peer.userId }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { io, Socket } from 'socket.io-client'
import { apiConfig } from '@/shared/config'
import * as MediasoupClient from 'mediasoup-client'
import { PButton, PInput } from '@/shared/ui' // Ваши компоненты

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
const localVideoStream = ref<MediaStream | null>(null)
const isVideoEnabled = ref(false)
const isAudioMuted = ref(false)
let localAudioTrack: MediaStreamTrack | null = null

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
    async (response: any) => {
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

  producerTransport.on('connect', ({ dtlsParameters }, cb, err) => {
    socket.emit(
      'webrtc:connect_transport',
      { transportId: producerTransport.id, dtlsParameters },
      cb,
    )
  })

  producerTransport.on('produce', ({ kind, rtpParameters, appData }, cb, err) => {
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

  consumerTransport.on('connect', ({ dtlsParameters }, cb, err) => {
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
      sum += dataArray[i]
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
    localVideoStream.value = null
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

<style scoped>
.sfu-room {
  min-height: 100vh;
  padding: 20px;
  color: white;
  background: #1a1a1a;
}

.controls {
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  background: #2a2a2a;
}

.join-form {
  display: flex;
  gap: 10px;
}

.actions {
  display: flex;
  gap: 15px;
  align-items: center;
}

.status {
  margin-right: auto;
  font-weight: bold;
}

.active {
  border-color: #c0392b !important;
  background-color: #e74c3c !important;

  /* Красный для Stop/Mute */
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
}

.video-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;
  background: #000;
  aspect-ratio: 16/9;
}

.video-card.speak {
  border: 2px solid #3498db;
}

.video-feed {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.avatar-placeholder {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  color: #888;
  font-size: 1.2rem;
}

.user-label {
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 4px 8px;
  font-size: 0.8rem;
  border-radius: 4px;
  background: rgb(0 0 0 / 60%);
}
</style>