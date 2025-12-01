import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'auth',
    redirect: { name: 'login' },
    component: () => import('@/widgets/auth-layout'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/login'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/pages/register'),
      },
      {
        path: 'reset',
        name: 'reset',
        component: () => import('@/pages/reset'),
      },
    ],
  },
  {
    path: '/',
    name: 'home',
    redirect: { name: 'channels' },
    component: () => import('@/widgets/main-layout'),
    children: [
      {
        path: 'channels/:serverId/:channelId',
        name: 'channels',
        components: {
          content: () => import('@/pages/channels'),
          // sidebar: () => import('@/widgets/channels-sidebar'),
        },
      },
      {
        path: 'discovery',
        name: 'discovery',
        components: {
          content: () => import('@/pages/discovery'),
          // sidebar: () => import('@/widgets/discovery-sidebar'),
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    redirect: () => {
      return '/'
    },
  },
]

export default routes
