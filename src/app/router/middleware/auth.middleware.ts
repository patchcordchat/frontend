import type { RouteLocation } from 'vue-router'

const AUTH_PAGES = ['login', 'register', 'reset']

export default async (to: RouteLocation): Promise<boolean | { name: string }> => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  const isAuthPage = AUTH_PAGES.includes(String(to.name))

  // 1. Если нет токена и пытается зайти на закрытую страницу -> на логин
  if (!isAuthenticated && !isAuthPage) {
    return { name: 'login' }
  }

  // 2. Если есть токен и пытается зайти на страницу логина -> в приватные каналы
  if (isAuthenticated && isAuthPage) {
    return { name: 'friends' }
  }

  return true
}
