import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerSchema } from './schema'
import { AxiosError } from 'axios'
import { authApi, useSessionStore } from '@/entities/session'

interface MonthItem {
  title: string
  value: number
}

export const useRegisterForm = () => {
  const router = useRouter()
  const sessionStore = useSessionStore()
  const serverError = ref<string | undefined>(undefined)

  const { handleSubmit, errors, isSubmitting, defineField } = useForm({
    validationSchema: toTypedSchema(registerSchema),
  })

  const [username, usernameAttrs] = defineField('username')
  const [globalName, globalNameAttrs] = defineField('global_name')
  const [email, emailAttrs] = defineField('email')
  const [password, passwordAttrs] = defineField('password')
  const [consent, consentAttrs] = defineField('consent')
  const [promotionalEmailOptIn, promotionalEmailOptInAttrs] = defineField(
    'promotional_email_opt_in',
  )

  const selectedMonth = ref<number | null>(null)
  const selectedYear = ref<number | null>(null)
  const selectedDay = ref<number | null>(null)

  const maxYear = new Date().getFullYear() - 13
  const years: number[] = Array.from({ length: 100 }, (_, index) => maxYear - index)

  const months: MonthItem[] = Array.from({ length: 12 }, (_, i) => {
    const monthNumber = i + 1
    const date = new Date(2026, i, 1)
    return {
      title: date.toLocaleString('ru-RU', { month: 'long' }),
      value: monthNumber,
    }
  })

  const days = computed(() => {
    if (!selectedMonth.value || !selectedYear.value) {
      return Array.from({ length: 31 }, (_, i) => i + 1)
    }
    const daysInMonth = new Date(selectedYear.value, selectedMonth.value, 0).getDate()

    return Array.from({ length: daysInMonth }, (_, i) => i + 1)
  })

  const onSubmit = handleSubmit(async (values) => {
    serverError.value = undefined

    try {
      const dateOfBirthValue =
        selectedDay.value && selectedMonth.value && selectedYear.value
          ? new Date(selectedYear.value, selectedMonth.value - 1, selectedDay.value)
          : undefined

      const { data } = await authApi.register({ ...values, date_of_birth: dateOfBirthValue })

      sessionStore.setUser(data.user_id)

      localStorage.setItem('token', data.token)

      await router.push({ name: 'private-channels' })
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          serverError.value = 'Неверные данные'
        } else {
          serverError.value = error.response?.data?.message || 'Ошибка регистрации'
        }
      } else {
        serverError.value = 'Ошибка регистрации'
      }
    }
  })

  return {
    // Поля
    username,
    usernameAttrs,
    globalName,
    globalNameAttrs,
    email,
    emailAttrs,
    password,
    passwordAttrs,
    consent,
    consentAttrs,
    promotionalEmailOptIn,
    promotionalEmailOptInAttrs,

    // Date of birth
    selectedDay,
    selectedMonth,
    selectedYear,
    days,
    months,
    years,

    // Состояние
    errors,
    serverError,
    isSubmitting,

    // Методы
    onSubmit,
  }
}
