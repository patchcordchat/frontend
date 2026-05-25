export interface Server {
  id: string
  name: string
  icon?: string
  owner_id: string
  description: string
  afk_timeout: number
  created_at: string
  updated_at: string
}

export interface CreateServerDto {
  name: string
  description?: string
  icon?: string
  afk_timeout?: number
}
