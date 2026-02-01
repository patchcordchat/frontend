import type { InjectionKey } from 'vue'
import { useCreateServerForm } from './useCreateServerForm'
export {
  serverInfoSchema,
  serverTemplateSchema,
  createServerSchema,
  type CreateServerFormData,
} from './schema'
export { useCreateServerForm }

type CreateServerContext = ReturnType<typeof useCreateServerForm>

export const CREATE_SERVER_FORM_KEY: InjectionKey<CreateServerContext> = Symbol('CreateServerForm')
