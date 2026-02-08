import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { AxiosError } from 'axios'
import { createMessageSchema, type createMessageFormData } from './schema'
import { messageApi } from '@/entities/message'

export const useSendMessageForm = () => {
  const serverError = ref<string | undefined>(undefined)

  const { handleSubmit, errors, isSubmitting, defineField, values } =
    useForm<createMessageFormData>({
      validationSchema: toTypedSchema(createMessageSchema),
    })

  const [content, contentAttrs] = defineField('content')

  const onSubmit = handleSubmit(async (values) => {
    serverError.value = undefined

    try {
      // TODO Добавить channelId
      await messageApi.createMessage('asd', values)
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        serverError.value = error.response?.data?.message || 'Ошибка создания сообщения'
      } else {
        serverError.value = 'Произошла непредвиденная ошибка'
      }
    }
  })

  return {
    // Поля
    content,
    contentAttrs,

    // Состояние формы
    values,
    errors,
    serverError,
    isSubmitting,

    // Методы
    onSubmit,
  }
}
