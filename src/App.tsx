import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import LoginForm from './features/auth/components/LoginForm/LoginForm'
import RegisterForm from './features/auth/components/RegisterForm/RegisterForm'
import Dashboard from './features/dashboard/components/Dashboard/Dashboard'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
