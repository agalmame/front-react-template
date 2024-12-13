import { Outlet, Link } from 'react-router-dom'
import { useAuthStore } from '../../features/auth/stores/authStore'

const MainLayout = () => {
  const { isAuthenticated, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center text-gray-900">
                Stock Management
              </Link>
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="ml-4 px-4 py-2 text-sm text-red-600 hover:text-red-900"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="ml-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-900"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
