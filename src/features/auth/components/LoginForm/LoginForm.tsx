import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useAuthStore } from '../../stores/authStore'
import { useApi } from '../../../../hooks/useApi'
import { Button } from '../../../../components/common/Button/Button'
import { Input } from '../../../../components/common/Input/Input'
import { useToast } from '../../../../hooks/useToast'
import { ToastContainer } from '@/components/ui/Toast'

interface LoginResponse {
  user: {
    id: string
    email: string
    name: string
  }
  accessToken: string
}

interface LoginData {
  email: string
  password: string
}

interface ApiError {
  message: string
}

const LoginForm = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const { addToast } = useToast()
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  })

  const { mutate, isPending } = useApi<LoginResponse, LoginData>({
    url: '/v1/auth/signin',
    method: 'post',
    mutationOptions: {
      onSuccess: (data) => {
        login(data.user, data.accessToken)
        addToast('Successfully logged in!', 'success')
        navigate('/')
      },
      onError: (error: AxiosError<{ message: string }>) => {
        addToast(
          error.response?.data?.message || 'Failed to login',
          'error'
        )
      },
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Sign in</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            isLoading={isPending}
            className="w-full"
          >
            Sign in
          </Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default LoginForm
