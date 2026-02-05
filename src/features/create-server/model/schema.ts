import { z } from 'zod'

export const createServerSchema = z.object({
  name: z
    .string({ required_error: 'Введите название сервера' })
    .min(2, 'Минимум 2 символа')
    .max(100, 'Максимум 100 символов'),
})

export type CreateServerFormData = z.infer<typeof createServerSchema>
