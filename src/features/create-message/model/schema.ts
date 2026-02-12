import { z } from 'zod'

export const createMessageSchema = z.object({
  content: z.string().min(1).max(2000),
})

export type createMessageFormData = z.infer<typeof createMessageSchema>
