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

export enum SocketEvents {
  // Text Channels
  CHANNEL_JOIN = 'channel:join',
  CHANNEL_LEAVE = 'channel:leave',
  CHANNEL_TYPING = 'channel:typing',
  CHANNEL_TYPING_UPDATE = 'channel:typing_update',
  MESSAGE_NEW = 'message:new',

  // Voice Channels
  VOICE_JOIN = 'voice:join',
  VOICE_CREATE_TRANSPORT = 'voice:createTransport',
  VOICE_NEW_PRODUCER = 'voice:newProducer',
}
