import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          redirect: '/projects',
        },
        {
          path: 'projects',
          name: 'Projects',
          component: () => import('@/views/projects/index.vue'),
          meta: { title: 'Projects', activePath: '/projects' },
        },
        {
          path: 'initiatives',
          name: 'Initiatives',
          component: () => import('@/views/initiatives/index.vue'),
          meta: { title: 'Initiatives', activePath: '/initiatives' },
        },
        {
          path: 'views',
          name: 'Views',
          component: () => import('@/views/views/index.vue'),
          meta: { title: 'Views', activePath: '/views' },
        },
        {
          path: 'teams',
          name: 'Teams',
          component: () => import('@/views/teams/index.vue'),
          meta: { title: 'Teams', activePath: '/teams' },
        },
        {
          path: 'pulse',
          name: 'Pulse',
          component: () => import('@/views/pulse/index.vue'),
          meta: { title: 'Pulse', activePath: '/pulse' },
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('@/views/settings/index.vue'),
          meta: { title: 'Settings', activePath: '/settings' },
        },
      ],
    },
  ],
})

export default router
