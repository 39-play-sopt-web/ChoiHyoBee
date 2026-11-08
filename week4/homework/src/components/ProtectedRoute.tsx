import { useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const hasAuthorizationCode = Boolean(localStorage.getItem('authorizationCode'))

  useEffect(() => {
    if (hasAuthorizationCode) return

    const timer = window.setTimeout(() => {
      window.alert('회원 코드가 필요합니다.')
      navigate('/auth', { replace: true })
    }, 0)

    return () => window.clearTimeout(timer)
  }, [hasAuthorizationCode, navigate])

  if (!hasAuthorizationCode) return null

  return children
}

export default ProtectedRoute
