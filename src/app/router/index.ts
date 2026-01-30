import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const middlewares = to.meta.middleware
  if (Array.isArray(middlewares)) {
    for (const middleware of middlewares) {
      const result = await middleware(to, from)
      if (result !== true) {
        return result
      }
    }
  }
  return true
})

export default router
