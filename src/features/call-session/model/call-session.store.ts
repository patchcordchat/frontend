import { defineStore, storeToRefs } from 'pinia'
import { ref, shallowRef, reactive, computed, watch } from 'vue'
import { Device } from 'mediasoup-client'
import type { Transport, Producer, RtpCapabilities } from 'mediasoup-client/types'
import { useSocket } from '@/shared/api'
import { useAudioStore } from '@/features/audio-control'
import { useChannelStore } from '@/entities/channel'
import { useSound } from '@/shared/composables'
import type { RemotePeer } from '@/entities/peer'

export const useCallSessionStore = defineStore('call-session', () => {
  const { socket } = useSocket()
  const { play } = useSound()
  const audioStore = useAudioStore()
  const { currentStream, isMicMuted } = storeToRefs(audioStore)
  const { activeId: channelId } = storeToRefs(useChannelStore())

  // State
  const userId = ref(`user-${Math.floor(Math.random() * 1000)}`)
  const joined = ref(false)
  const speaking = ref(false)
  const isVideoEnabled = ref(false)
  const localVideoStream = shallowRef<MediaStream>()

  // reactive Map
  const remotePeersMap = reactive(new Map<string, RemotePeer>())
  const remotePeers = computed(() => Array.from(remotePeersMap.values()))

  // Mediasoup internals
  let device: Device | null = null
  let producerTransport: Transport | null = null
  let consumerTransport: Transport | null = null
  let audioProducer: Producer | null = null
  let videoProducer: Producer | null = null

  let listenersAttached = false

  // Socket listeners
  const attachListeners = () => {
    if (listenersAttached) return
    socket.on('call:media:producer_added', onProducerAdded)
    socket.on('call:user_joined', onUserJoined)
    socket.on('call:user_left', onUserLeft)
    socket.on('call:user_speaking', onUserSpeaking)
    listenersAttached = true
  }

  const detachListeners = () => {
    socket.off('call:media:producer_added', onProducerAdded)
    socket.off('call:user_joined', onUserJoined)
    socket.off('call:user_left', onUserLeft)
    socket.off('call:user_speaking', onUserSpeaking)
    listenersAttached = false
  }

  const onProducerAdded = async (data: {
    producer_id: string
    user_id: string
    kind: 'audio' | 'video'
  }) => {
    if (data.user_id === userId.value) return
    await consumeSource(data.producer_id, data.user_id, data.kind)
  }

  const onUserJoined = (data: { user_id: string }) => {
    if (!remotePeersMap.has(data.user_id)) {
      remotePeersMap.set(data.user_id, { userId: data.user_id })
    }
  }

  const onUserLeft = (data: { user_id: string }) => {
    remotePeersMap.delete(data.user_id)
  }

  const onUserSpeaking = (data: { user_id: string; speaking: boolean }) => {
    const peer = remotePeersMap.get(data.user_id)
    if (!peer) return
    // Пересоздаём запись, чтобы reactive Map увидел изменение
    remotePeersMap.set(data.user_id, { ...peer, isSpeaking: data.speaking })
  }

  // --- Actions ---
  const join = async () => {
    if (!userId.value || !channelId.value || joined.value) return

    attachListeners()

    socket.emit(
      'call:join',
      { channel_id: channelId.value, user_id: userId.value },
      async (response: { error?: string; rtpCapabilities: RtpCapabilities; peers?: any }) => {
        if (response.error) return console.error(response.error)

        device = new Device()
        await device.load({ routerRtpCapabilities: response.rtpCapabilities })
        await initTransports()

        joined.value = true
        play('user_join')

        await publishMic()

        if (response.peers) {
          for (const peer of response.peers) {
            if (!remotePeersMap.has(peer.userId)) {
              remotePeersMap.set(peer.userId, { userId: peer.userId })
            }
            for (const producer of peer.producers) {
              await consumeSource(producer.id, peer.userId, producer.kind)
            }
          }
        }
      },
    )
  }

  const initTransports = async () => {
    if (!device) return

    const sendParams = await new Promise<any>((resolve) =>
      socket.emit('call:media:create_transport', { forceTcp: false }, resolve),
    )

    producerTransport = device.createSendTransport(sendParams)

    producerTransport.on('connect', ({ dtlsParameters }, cb) => {
      socket.emit(
        'call:media:connect_transport',
        { transport_id: producerTransport!.id, dtls_parameters: dtlsParameters },
        cb,
      )
    })

    producerTransport.on('produce', ({ kind, rtpParameters, appData }, cb) => {
      socket.emit(
        'call:media:produce',
        {
          transport_id: producerTransport!.id,
          kind,
          rtp_parameters: rtpParameters,
          app_data: { ...appData, user_id: userId.value },
        },
        ({ id }: any) => cb({ id }),
      )
    })

    const recvParams = await new Promise<any>((resolve) =>
      socket.emit('call:media:create_transport', { force_tcp: false }, resolve),
    )

    consumerTransport = device.createRecvTransport(recvParams)

    consumerTransport.on('connect', ({ dtlsParameters }, cb) => {
      socket.emit(
        'call:media:connect_transport',
        { transport_id: consumerTransport!.id, dtls_parameters: dtlsParameters },
        cb,
      )
    })
  }

  const publishMic = async () => {
    if (!producerTransport) return

    try {
      if (!currentStream.value) await audioStore.init()

      const track = currentStream.value?.getAudioTracks()[0]
      if (!track) throw new Error('Аудио трек недоступен')

      audioProducer = await producerTransport.produce({
        track,
        appData: { kind: 'audio' },
      })

      if (isMicMuted.value) audioProducer.pause()
    } catch (e) {
      console.error('Mic error', e)
    }
  }

  const consumeSource = async (
    producerId: string,
    remoteUserId: string,
    kind: 'audio' | 'video',
  ) => {
    if (!device || !consumerTransport) return

    socket.emit(
      'call:media:consume',
      {
        transport_id: consumerTransport.id,
        producer_id: producerId,
        rtp_capabilities: device.rtpCapabilities,
      },
      async (params: any) => {
        if (params.error) return console.error(params.error)

        const consumer = await consumerTransport!.consume({
          id: params.id,
          producerId: params.producerId,
          kind: params.kind,
          rtpParameters: params.rtpParameters,
        })

        const stream = new MediaStream([consumer.track])
        const existing = remotePeersMap.get(remoteUserId) ?? { userId: remoteUserId }

        // Пересоздаём объект — иначе reactive не заметит изменение вложенного поля
        remotePeersMap.set(remoteUserId, {
          ...existing,
          ...(kind === 'video' ? { videoStream: stream } : { audioStream: stream }),
        })

        socket.emit('call:media:resume', { consumer_id: consumer.id })
      },
    )
  }

  const toggleVideo = async () => {
    if (isVideoEnabled.value) {
      videoProducer?.close()
      localVideoStream.value?.getTracks().forEach((t) => t.stop())
      localVideoStream.value = undefined
      videoProducer = null
      isVideoEnabled.value = false
      play('camera_off')
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        localVideoStream.value = stream

        if (producerTransport) {
          videoProducer = await producerTransport.produce({
            track: stream.getVideoTracks()[0],
            appData: { kind: 'video' },
          })
        }

        isVideoEnabled.value = true
        play('camera_on')
      } catch (e) {
        console.error('Camera error', e)
      }
    }
  }

  const leave = () => {
    if (!joined.value) return

    joined.value = false
    detachListeners()

    if (speaking.value) {
      speaking.value = false
      socket.emit('call:speaking', {
        user_id: userId.value,
        channel_id: channelId.value,
        speaking: false,
      })
    }

    localVideoStream.value?.getTracks().forEach((t) => t.stop())
    localVideoStream.value = undefined
    isVideoEnabled.value = false

    audioProducer?.close()
    videoProducer?.close()
    audioProducer = null
    videoProducer = null

    remotePeersMap.clear()

    socket.emit('call:leave')
    play('user_leave')
  }

  // --- Watchers ---
  watch(currentStream, async (newStream) => {
    if (!newStream || !audioProducer) return
    const track = newStream.getAudioTracks()[0]
    if (track) await audioProducer.replaceTrack({ track })
  })

  watch(isMicMuted, (muted) => {
    if (!audioProducer) return
    if (muted) {
      audioProducer.pause()
      play('mute')
    } else {
      audioProducer.resume()
      play('unmute')
    }
  })

  return {
    joined,
    speaking,
    isVideoEnabled,
    localVideoStream,
    remotePeers,
    join,
    leave,
    toggleVideo,
  }
})
