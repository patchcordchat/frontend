import { string } from 'zod'

export const emailRule = string().min(1, 'Обязательное поле').email('Некорректный email')

export const passwordRule = string().min(8, 'Минимум 8 символов').max(128, 'Максимум 128 символов')
