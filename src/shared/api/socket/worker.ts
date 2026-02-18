import { io, Socket } from 'socket.io-client'
import { apiConfig } from '@/shared/config'
import type { WorkerMessage, ClientMessage } from './types'

interface SharedWorkerGlobalScope {
  onconnect: (event: MessageEvent) => void
}

declare const self: SharedWorkerGlobalScope

const ports: MessagePort[] = []
let socket: Socket | null = null

function initSocket(token: string) {
  if (socket) return

  socket = io(apiConfig.baseUrl, {
    transports: ['polling', 'websocket'],
    reconnection: true,
    extraHeaders: {
      Authorization: token,
    },
  })

  console.log(socket)

  socket.on('connect', () => {
    console.log('[SocketWorker] Connected successfully. Socket ID:', socket?.id)
    broadcast({ type: 'CONNECTION_STATUS', status: 'connected' })
  })

  socket.on('disconnect', (reason) => {
    console.log('[SocketWorker] Disconnected. Reason:', reason)
    broadcast({ type: 'CONNECTION_STATUS', status: 'disconnected' })
  })

  socket.on('connect_error', (error) => {
    console.error('[SocketWorker] Connection error:', error.message, error)
    broadcast({
      type: 'CONNECTION_STATUS',
      status: 'error',
    })
  })

  socket.onAny((event, ...args) => {
    broadcast({
      type: 'SOCKET_EVENT',
      event,
      payload: args[0],
    })
  })
}

function broadcast(message: WorkerMessage) {
  ports.forEach((port) => {
    try {
      port.postMessage(message)
    } catch (e) {
      console.error('Error posting to port', e)
    }
  })
}

self.onconnect = (e: MessageEvent) => {
  const port = e.ports[0]
  if (!port) return
  ports.push(port)

  port.onmessage = (event: MessageEvent<ClientMessage>) => {
    const data = event.data
    console.log(data)

    if (data.type === 'SET_TOKEN') {
      initSocket(data.token)
    }

    if (data.type === 'EMIT' && socket?.connected) {
      socket.emit(data.event, data.payload)
    }
  }

  port.start()
}
