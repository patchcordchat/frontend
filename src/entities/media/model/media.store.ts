import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMediaStore = defineStore('media', () => {
  // State
  const devices = ref<MediaDeviceInfo[]>([])
  const currentInputId = ref<string | null>(null)
  const currentOutputId = ref<string | null>(null)
  const stream = ref<MediaStream | null>(null)
  const globalAudioElement = ref<HTMLAudioElement | null>(null)

  // Getters
  const audioInputs = computed(() => devices.value.filter((d) => d.kind === 'audioinput'))
  const audioOutputs = computed(() => devices.value.filter((d) => d.kind === 'audiooutput'))

  // Actions

  // 1. Получение списка устройств
  async function fetchDevices() {
    try {
      if (!stream.value) await initStream()
      const allDevices = await navigator.mediaDevices.enumerateDevices()
      devices.value = allDevices
    } catch (e) {
      console.error('Ошибка получения списка устройств:', e)
      throw e
    }
  }

  // 2. Инициализация микрофона
  async function initStream(deviceId?: string) {
    if (stream.value) {
      stream.value.getTracks().forEach((track) => track.stop())
    }

    const constraints = {
      audio: deviceId ? { deviceId: { exact: deviceId } } : true,
      video: false,
    }

    try {
      stream.value = await navigator.mediaDevices.getUserMedia(constraints)

      const track = stream.value.getAudioTracks()[0]
      if (!track) throw new Error('Нет доступных аудио треков')

      const settings = track.getSettings()
      if (settings.deviceId) currentInputId.value = settings.deviceId
    } catch (e) {
      console.error('Ошибка доступа к микрофону:', e)
      throw e
    }
  }

  // 3. Смена микрофона
  async function setInputDevice(deviceId: string) {
    currentInputId.value = deviceId
    await initStream(deviceId)
  }

  // 4. Смена динамиков (Output)
  async function setOutputDevice(deviceId: string) {
    currentOutputId.value = deviceId

    if (globalAudioElement.value && 'setSinkId' in globalAudioElement.value) {
      await globalAudioElement.value.setSinkId(deviceId)
    }
  }

  // Регистрация глобального элемента аудио
  function registerAudioElement(element: HTMLAudioElement) {
    globalAudioElement.value = element
    // Если уже был выбран deviceId, применяем его
    if (currentOutputId.value) setOutputDevice(currentOutputId.value)
  }

  return {
    // State
    devices,
    currentInputId,
    currentOutputId,
    stream,

    // Getters
    audioInputs,
    audioOutputs,

    // Actions
    fetchDevices,
    setInputDevice,
    setOutputDevice,
    registerAudioElement,
  }
})
