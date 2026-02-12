import type { LoginDto, RegisterDto, AuthResponse } from '../model/session.types'
import { apiClient } from '@/shared/api'

export const sessionApi = {
  login: (credentials: LoginDto) => apiClient.post<AuthResponse>('/auth/login', credentials),

  register: (credentials: RegisterDto) =>
    apiClient.post<AuthResponse>('/auth/register', credentials),

  logout: () => apiClient.post('/auth/logout'),
}
