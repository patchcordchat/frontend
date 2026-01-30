export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  username?: string
  global_name?: string
  date_of_birth?: Date
  consent?: boolean
  promotional_email_opt_in?: boolean
}

export interface AuthResponse {
  user_id: string
  token: string
}
