import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/_admin')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated || !context.auth.isAdmin) {
      toast.error('You do not have permission to access this page.')

      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      })
    }

    console.log('User authenticated, proceeding...')
  },
  component: AuthLayout,
})

function AuthLayout() {
  return <Outlet />
}
