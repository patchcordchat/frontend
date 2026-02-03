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
              content: () => import('@/pages/channels/ui/ChannelPage.vue'),
              sidebar: () => import('@/pages/channels/ui/ChannelList.vue'),
            },
            meta: { title: 'Друзья', icon: 'misc.greeting' },
            children: [
              {
                path: ':dmId',
                name: 'dm-chat',
                components: {
                  content: () => import('@/pages/channels/ui/ChannelPage.vue'),
                  sidebar: () => import('@/pages/channels/ui/ChannelList.vue'),
                },
              },
            ],
          },
          {
            path: ':serverId',
            name: 'server',
            components: {
              sidebar: () => import('@/widgets/server-sidebar'),
              content: () => import('@/pages/server-chat/ui/NoChannel.vue'),
            },
            meta: { title: 'Каналы' },
            children: [
              {
                path: ':channelId',
                name: 'channel',
                components: {
                  content: () => import('@/pages/channels/ui/ChannelPage.vue'),
                  sidebar: () => import('@/pages/channels/ui/ChannelList.vue'),
                },
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
              content: () => import('@/pages/channels/ui/ChannelPage.vue'),
              sidebar: () => import('@/pages/channels/ui/ChannelList.vue'),
            },
          },
          {
            path: 'servers',
            name: 'discovery-servers',
            components: {
              content: () => import('@/pages/channels/ui/ChannelPage.vue'),
              sidebar: () => import('@/pages/channels/ui/ChannelList.vue'),
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
