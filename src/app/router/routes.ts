import type { RouteRecordRaw } from 'vue-router'
import { authMiddleware } from './middleware'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'auth',
    redirect: { name: 'login' },
    component: () => import('@/widgets/auth-layout'),
    meta: {
      middleware: [authMiddleware],
    },
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
    meta: {
      middleware: [authMiddleware],
    },
    children: [
      {
        path: 'channels',
        children: [
          {
            path: '@me',
            name: 'private-channels',
            components: {
              sidebar: () => import('@/pages/server-sidebar'),
              content: () => import('@/pages/server-content'),
            },
            meta: { title: 'Друзья', icon: 'misc.greeting' },
            children: [
              {
                path: ':dmId',
                name: 'dm-chat',
                component: () => import('@/pages/channel'),
              },
            ],
          },
          {
            path: ':serverId',
            name: 'server',
            components: {
              sidebar: () => import('@/pages/server-sidebar'),
              content: () => import('@/pages/server-content'),
            },
            meta: { title: 'Каналы' },
            children: [
              {
                path: ':channelId',
                name: 'channel',
                component: () => import('@/pages/channel'),
              },
            ],
          },
        ],
      },
      {
        path: 'discovery',
        name: 'discovery',
        redirect: { name: 'discovery-applications' },
        meta: { title: 'Путешествие', icon: 'misc.compass-circle' },
        children: [
          {
            path: 'applications',
            name: 'discovery-applications',
            components: {
              sidebar: () => import('@/pages/server-sidebar'),
              content: () => import('@/pages/server-content'),
            },
          },
          {
            path: 'servers',
            name: 'discovery-servers',
            components: {
              sidebar: () => import('@/pages/server-sidebar'),
              content: () => import('@/pages/server-content'),
            },
          },
        ],
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
