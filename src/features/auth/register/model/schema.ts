import { z } from 'zod'
import {
  usernameRule,
  globalNameRule,
  dateOfBirthRule,
  emailRule,
  passwordRule,
} from '../../lib/validation'

export const registerSchema = z.object({
  username: usernameRule,
  global_name: globalNameRule,
  email: emailRule,
  password: passwordRule,
  date_of_birth: dateOfBirthRule,
  consent: z.boolean().optional(),
  promotional_email_opt_in: z.boolean().optional(),
})

export type RegisterFormData = z.infer<typeof registerSchema>
