import { z } from 'zod'
import { emailRule, passwordRule } from '../../lib/validation'

export const loginSchema = z.object({
  email: emailRule,
  password: passwordRule,
})

export type LoginFormData = z.infer<typeof loginSchema>
