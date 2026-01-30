import axios from 'axios'
import { apiConfig } from '@/shared/config'
import { useRouter } from 'vue-router'

const apiClient = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: apiConfig.timeout,
  headers: {
    Accept: 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    if (error.response.status === 401) {
      const router = useRouter()
      router.push({ name: 'login' })
    }
    return Promise.reject(error)
  },
)

export default apiClient
