import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../model/types'
import { apiClient } from '@/shared/api'

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse>('/auth/login', credentials),

  register: (credentials: RegisterCredentials) =>
    apiClient.post<AuthResponse>('/auth/register', credentials),

  logout: () => apiClient.post('/auth/logout'),
}
