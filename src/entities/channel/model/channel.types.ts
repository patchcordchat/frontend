export interface Channel {
  _id: string
  type: number
  server_id: string
  position: number
  name: string
  last_message_id?: string
  user_limit: number
  recipients: string[]
  owner_id: string
  member_count: number
  flags: number
  created_at: number
  updated_at: number
}

export interface CreateChannelDto {
  name: string
  type: number
  position?: number
  user_limit?: number
}
