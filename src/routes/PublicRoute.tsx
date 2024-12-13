import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../features/auth/stores/authStore'

const PublicRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}

export default PublicRoute
