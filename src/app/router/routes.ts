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
        path: 'channels/',
        name: 'channels',
        children: [
          {
            path: ':serverId/:channelId',
            name: 'server-channels',
            components: {
              content: () => import('@/pages/channels'),
              sidebar: () => import('@/pages/channels/ChannelList.vue'),
            },
            meta: { title: 'Каналы' },
          },
          {
            path: '@me',
            name: 'private-channels',
            components: {
              content: () => import('@/pages/channels'),
              sidebar: () => import('@/pages/channels/ChannelList.vue'),
            },
            meta: { title: 'Приватные каналы' },
          },
        ],
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
    name: 'not-found',
    component: () => import('@/pages/not-found'),
  },
]

export default routes
