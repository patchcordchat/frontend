export interface IApiConfig {
  baseUrl: string
  timeout: number
}

const config: IApiConfig = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 5000,
}

export default config
