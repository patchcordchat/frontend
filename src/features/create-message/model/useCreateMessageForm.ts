import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { AxiosError } from 'axios'
import { createMessageSchema, type createMessageFormData } from './schema'
import { useMessageStore } from '@/entities/message'

export const useCreateMessageForm = () => {
  const { createMessage } = useMessageStore()
  const serverError = ref<string | undefined>(undefined)
  const channelId = ref<string>('')
  const isSubmitting = ref(false)

  const { errors, defineField, values } = useForm<createMessageFormData>({
    validationSchema: toTypedSchema(createMessageSchema),
  })

  const [content, contentAttrs] = defineField('content')

  const onSubmit = async (content: string) => {
    if (isSubmitting.value) return
    isSubmitting.value = true
    serverError.value = undefined

    try {
      await createMessage(channelId.value, { content })
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        serverError.value = error.response?.data?.message || 'Ошибка создания сообщения'
      } else {
        serverError.value = 'Произошла непредвиденная ошибка'
      }
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    // Поля
    content,
    contentAttrs,

    // Состояние формы
    values,
    errors,
    serverError,
    isSubmitting,
    channelId,

    // Методы
    onSubmit,
  }
}
