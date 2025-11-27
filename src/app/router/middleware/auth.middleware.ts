import type { RouteLocation } from 'vue-router'

export default async (to: RouteLocation): Promise<boolean | { name: string }> => {
  if (to.name !== 'login') {
    return { name: 'login' }
  }
  return true
}
