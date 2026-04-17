import { z } from 'zod'

export const addFriendSchema = z.object({
  username: z.string().min(2, 'Минимум 2 символа').max(32, 'Максимум 32 символов'),
})

export type AddFriendFormData = z.infer<typeof addFriendSchema>
