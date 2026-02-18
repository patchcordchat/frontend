export type WorkerMessage =
  | {
      type: 'SOCKET_EVENT'
      event: string
      payload: unknown
    }
  | {
      type: 'CONNECTION_STATUS'
      status: 'connected' | 'disconnected' | 'error'
    }

export type ClientMessage =
  | {
      type: 'EMIT'
      event: string
      payload: unknown
    }
  | {
      type: 'SET_TOKEN'
      token: string
    }
