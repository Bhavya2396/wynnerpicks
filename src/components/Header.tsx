import { Link, useRouterState } from '@tanstack/react-router'
import { ArrowLeft, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Login from './Login'
import { useAuth } from '@/lib/auth'

export default function Header() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouterState()
  const isOnLanding = router.location.pathname === '/'
  const isOnDashboard = router.location.pathname === '/dashboard'

  return (
    <header className="glass-nav p-4 flex items-center justify-between text-white shadow-lg sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {!isOnLanding && !isOnDashboard && (
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="hover:bg-white/10">
              <ArrowLeft size={16} className="mr-2" />
              Dashboard
            </Button>
          </Link>
        )}
        {isOnDashboard && (
          <Link to="/">
            <Button variant="ghost" size="sm" className="hover:bg-white/10">
              <ArrowLeft size={16} className="mr-2" />
              Home
            </Button>
          </Link>
        )}
        <Link to={isOnLanding ? "/dashboard" : "/"} className="flex items-center gap-3">
          <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white text-sm">W</span>
          </div>
          <h1 className="text-xl font-bold">WynnerPicks</h1>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        {!isOnLanding && (
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="hover:bg-white/10">
              Dashboard
            </Button>
          </Link>
        )}
        {isAuthenticated && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10">
            <User size={16} />
            <span className="text-sm">{user?.displayName || 'User'}</span>
          </div>
        )}
        <Login />
      </div>
    </header>
  )
}
