export interface MediaConfig {
  mediaUrl: string
}

const config: MediaConfig = {
  mediaUrl: import.meta.env.VITE_MEDIA_URL || 'http://localhost:9001',
}

export default config
