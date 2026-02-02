import axios from 'axios'
import { apiConfig } from '@/shared/config'

const apiClient = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: apiConfig.timeout,
  headers: {
    Accept: 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      const { default: router } = await import('@/app/router')

      router.push('/login')
    }
    return Promise.reject(error)
  },
)

export default apiClient
