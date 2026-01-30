import type { RouteLocation } from 'vue-router'

export default async (to: RouteLocation): Promise<boolean | { name: string }> => {
  const token = localStorage.getItem('token')

  if (!token && to.name !== 'login') {
    return { name: 'login' }
  }

  if (token && to.name === 'login') {
    return { name: 'private-channels' }
  }

  return true
}
