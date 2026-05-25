export enum MessageTypes {
  DEFAULT = 0,
  RECIPIENT_ADD = 1,
  RECIPIENT_REMOVE = 2,
  CALL = 3,
  CHANNEL_NAME_CHANGE = 4,
  CHANNEL_ICON_CHANGE = 5,
  CHANNEL_PINNED_MESSAGE = 6,
  USER_JOIN = 7,
  REPLY = 8,
  CHAT_INPUT_COMMAND = 9,
}

export enum MessageFlags {
  NONE = 0,
  PINNED = 1 << 0,
  LOADING = 1 << 1,
  IS_VOICE_MESSAGE = 1 << 2,
}

export interface IReaction {
  emoji: string
  count: number
  users: string[]
}

export interface Message {
  id: string
  channel_id: string
  author: {
    id: string
    username: string
    global_name: string
    bot: boolean
    avatar?: string
  }
  content: string
  timestamp: number
  edited_timestamp: number | null
  tts: boolean
  attachments: string[]
  reactions: IReaction[]
  pinned: boolean
  type: MessageTypes
  flags: number
  created_at: number
  updated_at: number
}

export interface CreateMessageDto {
  content: string
  tts?: boolean
}
