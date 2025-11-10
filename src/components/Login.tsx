import { GoogleAuthProvider } from 'firebase/auth'
import { toast } from 'sonner'

import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'

export default function Login() {
  const { isAuthenticated, login, logout } = useAuth()

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await login(provider)
    } catch (error) {
      console.error('Login failed:', error)
      toast.error('Failed to sign in!')
    }
  }

  return (
    <div>
      {isAuthenticated ? (
        <Button
          variant="secondary"
          onClick={logout}
          size="lg"
          className="w-full"
        >
          Sign Out
        </Button>
      ) : (
        <Button
          variant="secondary"
          onClick={handleLogin}
          size="lg"
          className="w-full"
        >
          Sign In with Google
        </Button>
      )}
    </div>
  )
}
