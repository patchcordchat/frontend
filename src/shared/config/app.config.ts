export interface IAppConfig {
  env: string
}

const config: IAppConfig = {
  env: import.meta.env.MODE || 'development',
}

export default config
