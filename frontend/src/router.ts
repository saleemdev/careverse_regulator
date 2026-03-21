import { createRouter, createHashHistory } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  history: createHashHistory(),
  defaultPreload: 'intent',
})

// Type augmentation for router
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
