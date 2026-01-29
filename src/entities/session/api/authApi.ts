import type { LoginCredentials, AuthResponse } from '../model/types'
import { apiClient } from '@/shared/api'

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse>('/auth/login', credentials),

  logout: () => apiClient.post('/auth/logout'),
}
