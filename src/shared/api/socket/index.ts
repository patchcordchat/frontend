import SocketWorker from './worker?sharedworker'
import type { WorkerMessage } from './types'
import { ref } from 'vue'

let workerInstance: SharedWorker | null = null

const isConnected = ref(false)
const lastEvent = ref<unknown>(null)

const listeners = new Map<string, Array<(data: unknown) => void>>()

export function useSocketWorker() {
  if (!workerInstance) {
    workerInstance = new SocketWorker()

    workerInstance.port.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const { data } = event

      if (data.type === 'CONNECTION_STATUS') {
        isConnected.value = data.status === 'connected'
      }

      if (data.type === 'SOCKET_EVENT') {
        lastEvent.value = data

        const eventListeners = listeners.get(data.event)
        if (eventListeners) {
          eventListeners.forEach((cb) => cb(data.payload))
        }
      }
    }

    workerInstance.port.start()

    const token = localStorage.getItem('token')
    if (token) {
      workerInstance.port.postMessage({
        type: 'SET_TOKEN',
        token: token,
      })
    }
  }

  /**
   * Отправить событие на сервер (через воркер)
   */
  const emit = (event: string, payload: unknown) => {
    workerInstance?.port.postMessage({
      type: 'EMIT',
      event,
      payload,
    })
  }

  /**
   * Подписаться на событие (как socket.on)
   */
  const on = (event: string, callback: (data: unknown) => void) => {
    if (!listeners.has(event)) {
      listeners.set(event, [])
    }
    listeners.get(event)?.push(callback)
  }

  /**
   * Отписаться (как socket.off)
   */
  const off = (event: string, callback: (data: unknown) => void) => {
    const eventListeners = listeners.get(event)
    if (eventListeners) {
      listeners.set(
        event,
        eventListeners.filter((cb) => cb !== callback),
      )
    }
  }

  const setToken = (token: string) => {
    workerInstance?.port.postMessage({
      type: 'SET_TOKEN',
      token,
    })
  }

  return {
    isConnected,
    emit,
    on,
    off,
    setToken,
  }
}
