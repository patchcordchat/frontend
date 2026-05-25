import { ref } from 'vue'
import { io, Socket } from 'socket.io-client'
import { apiConfig } from '@/shared/config'

let socket: Socket | null = null

const isConnected = ref(false)

export function useSocket() {
  /**
   * Инициализация сокета
   */
  ;(function initSocket() {
    if (socket) return

    socket = io(apiConfig.baseUrl, {
      transports: ['polling', 'websocket'],
      reconnection: true,
      extraHeaders: {
        authorization: localStorage.getItem('token') || '',
      },
    })

    socket.on('connect', () => {
      console.log('[Socket] Connected. ID:', socket?.id)
      isConnected.value = true
    })

    socket.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected. Reason:', reason)
      isConnected.value = false
    })

    socket.on('connect_error', (error) => {
      console.error('[Socket] Connection error:', error.message)
      isConnected.value = false
    })
  })()

  return { socket, isConnected }
}
