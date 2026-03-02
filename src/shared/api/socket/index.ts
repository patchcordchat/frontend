/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { io, Socket } from 'socket.io-client'
import { apiConfig } from '@/shared/config'

let socketInstance: Socket | null = null

const isConnected = ref(false)

export function useSocket() {
  /**
   * Инициализация сокета
   */
  const initSocket = () => {
    if (socketInstance) return

    socketInstance = io(apiConfig.baseUrl, {
      transports: ['polling', 'websocket'],
      reconnection: true,
      extraHeaders: {
        authorization: localStorage.getItem('token') || '',
      },
    })

    socketInstance.on('connect', () => {
      console.log('[Socket] Connected. ID:', socketInstance?.id)
      isConnected.value = true
    })

    socketInstance.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected. Reason:', reason)
      isConnected.value = false
    })

    socketInstance.on('connect_error', (error) => {
      console.error('[Socket] Connection error:', error.message)
      isConnected.value = false
    })
  }

  /**
   * Отправить событие и ждать подтверждения (ACK)
   */
  const emit = <TResponse = any, TPayload = any>(
    event: string,
    payload?: TPayload,
  ): Promise<TResponse> => {
    return new Promise((resolve, reject) => {
      if (!socketInstance) {
        return reject(new Error('Socket not initialized'))
      }

      socketInstance.emit(event, payload, (response: TResponse) => {
        resolve(response)
      })
    })
  }

  /**
   * Подписаться на событие
   */
  const on = <T = any>(event: string, callback: (data: T) => void) => {
    socketInstance?.on(event, callback)
  }

  /**
   * Отписаться от события
   */
  const off = <T = any>(event: string, callback: (data: T) => void) => {
    socketInstance?.off(event, callback)
  }

  initSocket()

  return {
    isConnected,
    emit,
    on,
    off,
  }
}
