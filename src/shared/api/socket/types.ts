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
  // Chat
  CHAT_JOIN = 'chat:join',
  CHAT_LEAVE = 'chat:leave',
  CHAT_TYPING = 'chat:typing',
  CHAT_TYPING_UPDATE = 'chat:user_typing',

  // Messages
  MESSAGE_NEW = 'chat:message:new',
  MESSAGE_UPDATED = 'chat:message:updated',
  MESSAGE_DELETED = 'chat:message:deleted',
  MESSAGE_PINNED = 'chat:message:pinned',
  MESSAGE_UNPINNED = 'chat:message:unpinned',

  // Message Reactions
  REACTION_ADD = 'chat:reaction:add',
  REACTION_REMOVE = 'chat:reaction:remove',

  // Voice
  VOICE_JOIN = 'voice:join',
  VOICE_CREATE_TRANSPORT = 'voice:createTransport',
  VOICE_NEW_PRODUCER = 'voice:newProducer',
}
