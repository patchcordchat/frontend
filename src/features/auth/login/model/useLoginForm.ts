import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { loginSchema } from './schema'
import { AxiosError } from 'axios'
import { authApi, useSessionStore } from '@/entities/session'

export const useLoginForm = () => {
  const router = useRouter()
  const sessionStore = useSessionStore()
  const serverError = ref<string | undefined>(undefined)

  const { handleSubmit, errors, isSubmitting, defineField } = useForm({
    validationSchema: toTypedSchema(loginSchema),
  })

  const [email, emailAttrs] = defineField('email')
  const [password, passwordAttrs] = defineField('password')

  const onSubmit = handleSubmit(async (values) => {
    serverError.value = undefined

    try {
      const { data } = await authApi.login(values)

      sessionStore.setUser(data.user_id)

      localStorage.setItem('token', data.token)

      await router.push({ name: 'discovery' })
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          serverError.value = 'Неверный email или пароль'
        } else {
          serverError.value = error.response?.data?.message || 'Ошибка входа'
        }
      } else {
        serverError.value = 'Ошибка входа'
      }
    }
  })

  return {
    // Поля
    email,
    emailAttrs,
    password,
    passwordAttrs,

    // Состояние
    errors,
    serverError,
    isSubmitting,

    // Методы
    onSubmit,
  }
}
