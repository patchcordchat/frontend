import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { AxiosError } from 'axios'
import { createServerSchema, type CreateServerFormData } from './shema'
import { serverApi } from '@/entities/server'
import { useRouter } from 'vue-router'

enum Step {
  INFO = 0,
  TEMPLATE = 1,
}

export const useCreateServerForm = (onSuccess?: () => void) => {
  const router = useRouter()
  const currentStep = ref<Step>(Step.INFO)
  const serverError = ref<string | undefined>(undefined)

  const { handleSubmit, errors, isSubmitting, defineField, validateField, values } =
    useForm<CreateServerFormData>({
      validationSchema: toTypedSchema(createServerSchema),
      initialValues: {
        is_public: false,
      },
    })

  const [name, nameAttrs] = defineField('name')
  const [templateId, templateIdAttrs] = defineField('template_id')
  const [isPublic, isPublicAttrs] = defineField('is_public')

  const isLastStep = computed(() => currentStep.value === Step.TEMPLATE)
  const isFirstStep = computed(() => currentStep.value === Step.INFO)

  const nextStep = async () => {
    // Валидируем только поля текущего шага перед переходом
    let isValid = false

    if (currentStep.value === Step.INFO) {
      const { valid } = await validateField('name')
      isValid = valid
    }

    if (isValid) {
      currentStep.value++
    }
  }

  const prevStep = () => {
    if (!isFirstStep.value) {
      currentStep.value--
    }
  }

  const onSubmit = handleSubmit(async (values) => {
    serverError.value = undefined

    try {
      const { data } = await serverApi.createServer(values)

      // Логика после успеха: навигация или закрытие модалки
      if (onSuccess) onSuccess()

      // Например, переходим на страницу нового сервера
      await router.push({ name: 'server', params: { id: data.id } })
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
    templateId,
    templateIdAttrs,
    isPublic,
    isPublicAttrs,

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
