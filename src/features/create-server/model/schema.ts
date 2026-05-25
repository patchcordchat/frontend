import { z } from 'zod'

const base64ImageRegex =
  /^data:image\/(png|jpg|jpeg|gif|webp);base64,([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/

export const createServerSchema = z.object({
  name: z
    .string({ required_error: 'Введите название сервера' })
    .min(2, 'Минимум 2 символа')
    .max(100, 'Максимум 100 символов'),
  icon: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true
      return base64ImageRegex.test(val)
    }, 'Некорректный формат изображения')
    .refine((val) => {
      if (!val) return true
      const sizeInBytes = (val.length * 3) / 4
      return sizeInBytes <= 5 * 1024 * 1024
    }, 'Изображение слишком большое (макс. 5МБ)'),
})

export type CreateServerFormData = z.infer<typeof createServerSchema>
