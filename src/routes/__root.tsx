import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import Header from '../components/Header'
import type { AuthContextType } from '@/lib/auth'
import { Toaster } from '@/components/ui/sonner'

export type MyRouterContext = {
  auth: AuthContextType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  ),
})
