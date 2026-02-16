import { z } from 'zod'

export const createChannelSchema = z.object({
  name: z
    .string({ required_error: 'Введите название канала' })
    .min(1, 'Минимум 1 символ')
    .max(100, 'Максимум 100 символов'),
  type: z.number().int().min(0, 'Недопустимый тип канала').max(3, 'Недопустимый тип канала'),
})

export type CreateChannelFormData = z.infer<typeof createChannelSchema>
