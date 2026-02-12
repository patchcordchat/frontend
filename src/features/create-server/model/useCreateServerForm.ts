import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { AxiosError } from 'axios'
import { createServerSchema, type CreateServerFormData } from './schema'
import { useServerStore } from '@/entities/server'
import { useRouter } from 'vue-router'

enum Step {
  TEMPLATE = 0,
  AUDIENCE = 1,
  CUSTOMIZE = 2,
}

export const useCreateServerForm = (onSuccess?: () => void) => {
  const router = useRouter()
  const currentStep = ref<Step>(Step.TEMPLATE)
  const serverError = ref<string | undefined>(undefined)

  const { handleSubmit, errors, isSubmitting, defineField, values } = useForm<CreateServerFormData>(
    {
      validationSchema: toTypedSchema(createServerSchema),
    },
  )

  const [name, nameAttrs] = defineField('name')
  const [icon, iconAttrs] = defineField('icon')

  const isLastStep = computed(() => currentStep.value === Step.CUSTOMIZE)
  const isFirstStep = computed(() => currentStep.value === Step.TEMPLATE)

  const nextStep: () => void = async () => {
    currentStep.value++
  }

  const prevStep: () => void = () => {
    if (!isFirstStep.value) {
      currentStep.value--
    }
  }

  const onSubmit = handleSubmit(async (values) => {
    serverError.value = undefined

    try {
      const newServer = await useServerStore().createServer(values)

      await router.push({ name: 'server', params: { id: newServer.id } })

      if (onSuccess) onSuccess()
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        serverError.value = error.response?.data?.message || 'Ошибка создания сервера'
      } else {
        serverError.value = 'Произошла непредвиденная ошибка'
      }
    }
  })

  return {
    // Поля
    name,
    nameAttrs,
    icon,
    iconAttrs,

    // Состояние формы
    values,
    errors,
    serverError,
    isSubmitting,

    // Состояние визарда
    currentStep,
    isLastStep,
    isFirstStep,
    Step,

    // Методы
    nextStep,
    prevStep,
    onSubmit,
  }
}
