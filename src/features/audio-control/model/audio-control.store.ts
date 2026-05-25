import { defineStore } from 'pinia'
import { ref, shallowRef, watch } from 'vue'
import { useMediaDevices } from '@/shared/composables/useMediaDevices'

export const useAudioStore = defineStore('audio-control', () => {
  // State
  const { audioInputs, audioOutputs, requestAudioPermissions, getAudioStream } = useMediaDevices()

  const selectedMicId = ref(localStorage.getItem('mic-id') || 'default')
  const selectedSpeakerId = ref(localStorage.getItem('speaker-id') || 'default')

  const isMicMuted = ref(false)
  const isDeafened = ref(false)

  const currentStream = shallowRef<MediaStream | null>(null)

  // Actions
  const init = async () => {
    await requestAudioPermissions()
    await updateStream()
  }

  const updateStream = async () => {
    if (currentStream.value) {
      currentStream.value.getTracks().forEach((t) => t.stop())
    }

    try {
      const stream = await getAudioStream(selectedMicId.value)
      applyMuteState(stream)
      currentStream.value = stream
    } catch (err) {
      console.error('Failed to update stream:', err)
    }
  }

  const applyMuteState = (stream: MediaStream | null = currentStream.value) => {
    if (!stream) return
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !isMicMuted.value && !isDeafened.value
    })
  }

  const toggleMic = () => {
    isMicMuted.value = !isMicMuted.value
    applyMuteState()
  }

  const toggleDeafen = () => {
    isDeafened.value = !isDeafened.value
    applyMuteState()
  }

  // Следим за сменой устройств
  watch([selectedMicId, selectedSpeakerId], () => {
    localStorage.setItem('mic-id', selectedMicId.value)
    localStorage.setItem('speaker-id', selectedSpeakerId.value)
    updateStream()
  })

  return {
    // State
    audioInputs,
    audioOutputs,
    isMicMuted,
    isDeafened,
    selectedMicId,
    selectedSpeakerId,
    currentStream,

    // Actions
    init,
    toggleMic,
    toggleDeafen,
  }
})
