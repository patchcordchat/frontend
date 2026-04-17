import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { AxiosError } from 'axios'
import { toTypedSchema } from '@vee-validate/zod'
import { addFriendSchema, type AddFriendFormData } from './schema'
import { useRelationshipStore } from '@/entities/relationship'

export const useAddFriendForm = () => {
  const serverError = ref<string | undefined>(undefined)

  const { handleSubmit, errors, isSubmitting, defineField, values, meta } =
    useForm<AddFriendFormData>({
      validationSchema: toTypedSchema(addFriendSchema),
    })

  const isValid = computed<boolean>(() => meta.value.valid)

  const [username, usernameAttrs] = defineField('username')

  const onSubmit = handleSubmit(async (values) => {
    serverError.value = undefined

    try {
      await useRelationshipStore().sendFriendRequest(values)
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
    username,
    usernameAttrs,

    // State
    values,
    errors,
    serverError,
    isSubmitting,
    isValid,

    // Actions
    onSubmit,
  }
}
