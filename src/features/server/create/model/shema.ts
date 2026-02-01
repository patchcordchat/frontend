import { z } from 'zod'

export const serverInfoSchema = z.object({
  name: z
    .string({ required_error: 'Введите название сервера' })
    .min(2, 'Минимум 2 символа')
    .max(100, 'Максимум 100 символов'),
})

export const serverTemplateSchema = z.object({
  template_id: z.string({ required_error: 'Выберите шаблон' }).uuid(),
  is_public: z.boolean().default(false),
})

export const createServerSchema = serverInfoSchema.merge(serverTemplateSchema)

export type CreateServerFormData = z.infer<typeof createServerSchema>
