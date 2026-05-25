import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { AxiosError } from 'axios'
import { createChannelSchema, type CreateChannelFormData } from './schema'
import { useChannelStore } from '@/entities/channel'

export const useCreateChannelForm = (onSuccess?: () => void) => {
  const serverError = ref<string | undefined>(undefined)
  const serverId = ref<string>('')

  const { handleSubmit, errors, isSubmitting, defineField, values, meta } =
    useForm<CreateChannelFormData>({
      validationSchema: toTypedSchema(createChannelSchema),
      initialValues: {
        type: 0,
      },
    })

  const isValid = computed<boolean>(() => meta.value.valid)

  const [name, nameAttrs] = defineField('name')
  const [type, typeAttrs] = defineField('type')

  const onSubmit = handleSubmit(async (values) => {
    try {
      await useChannelStore().createChannel(serverId.value, values)

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
    // Fields
    name,
    nameAttrs,
    type,
    typeAttrs,

    // State
    values,
    errors,
    serverError,
    isSubmitting,
    serverId,
    isValid,

    // Actions
    onSubmit,
  }
}
