import { date, string } from 'zod'

export const emailRule = string({ required_error: 'Обязательное поле' }).email('Некорректный email')

export const passwordRule = string({ required_error: 'Обязательное поле' })
  .min(8, 'Минимум 8 символов')
  .max(72, 'Максимум 72 символов')

export const usernameRule = string()
  .min(2, 'Минимум 2 символа')
  .max(32, 'Максимум 32 символов')
  .optional()

export const globalNameRule = string()
  .min(1, 'Минимум 1 символ')
  .max(32, 'Максимум 32 символов')
  .optional()

export const dateOfBirthRule = date()
  .min(new Date('1873-01-01'))
  .max(new Date('2022-01-01'))
  .optional()
