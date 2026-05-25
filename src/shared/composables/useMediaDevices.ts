import { ref, onMounted, onUnmounted } from 'vue'

export const useMediaDevices = () => {
  const audioInputs = ref<MediaDeviceInfo[]>([])
  const audioOutputs = ref<MediaDeviceInfo[]>([])
  const hasPermissions = ref(false)

  const requestAudioPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      hasPermissions.value = true
      stream.getTracks().forEach((track) => track.stop())
      await updateDeviceList()
    } catch (error) {
      console.error('Ошибка доступа к микрофону:', error)
      hasPermissions.value = false
      throw error
    }
  }

  const updateDeviceList = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      audioInputs.value = devices.filter((device) => device.kind === 'audioinput')
      audioOutputs.value = devices.filter((device) => device.kind === 'audiooutput')
    } catch (error) {
      console.error('Ошибка при получении списка устройств:', error)
    }
  }

  const getAudioStream = async (deviceId?: string): Promise<MediaStream> => {
    const constraints: MediaStreamConstraints = {
      audio: deviceId ? { deviceId: { ideal: deviceId } } : true,
    }
    return await navigator.mediaDevices.getUserMedia(constraints)
  }

  const handleDeviceChange = () => {
    updateDeviceList()
  }

  onMounted(() => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange)
    }
  })

  onUnmounted(() => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange)
    }
  })

  return {
    audioInputs,
    audioOutputs,
    hasPermissions,
    requestAudioPermissions,
    updateDeviceList,
    getAudioStream,
  }
}
