import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerSchema } from './schema'
import { AxiosError } from 'axios'
import { useSessionStore } from '@/entities/session'

interface MonthItem {
  title: string
  value: number
}

export const useRegisterForm = () => {
  const router = useRouter()
  const { register } = useSessionStore()
  const serverError = ref<string | undefined>(undefined)

  const { handleSubmit, errors, isSubmitting, defineField } = useForm({
    validationSchema: toTypedSchema(registerSchema),
  })

  const fieldOptions = {
    validateOnInput: false,
    validateOnModelUpdate: false,
    validateOnBlur: false,
    validateOnChange: false,
  }

  const [username, usernameAttrs] = defineField('username', fieldOptions)
  const [globalName, globalNameAttrs] = defineField('global_name', fieldOptions)
  const [email, emailAttrs] = defineField('email', fieldOptions)
  const [password, passwordAttrs] = defineField('password', fieldOptions)
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

      await register({ ...values, date_of_birth: dateOfBirthValue })

      await router.push({ name: 'friends' })
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          serverError.value = 'Неверные данные'
        } else if (error.response?.status === 409) {
          serverError.value = 'Адрес электронной почты уже зарегистрирован'
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
