export interface User {
  id: string
  username: string
  avatar?: string
  public_flags: number
  flags: number
  global_name?: string
}

export interface CurrentUser extends User {
  email: string
  verified: boolean
  phone?: string
  bio: string
}

export enum UserFlags {
  NONE = 0,
  DELETED = 1 << 0,
  SELF_DELETED = 1 << 1,
  DISABLED = 1 << 2,
}

export enum UserPublicFlags {
  NONE = 0,
  STAFF = 1 << 3,
  SPAMMER = 1 << 4,
}
