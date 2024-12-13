import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useApi } from '../../../../hooks/useApi'
import { Input } from '@components/common/Input/Input'
import { Button } from '@components/common/Button/Button'
import { useToast } from '../../../../hooks/useToast'

interface RegisterResponse {
  user: {
    id: string
    email: string
    name: string
  }
  message: string
}

interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const RegisterForm = () => {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { mutate, isPending } = useApi<RegisterResponse, Omit<RegisterData, 'confirmPassword'>>({
    url: '/v1/auth/register',
    method: 'post',
    mutationOptions: {
      onSuccess: (data) => {
        addToast(data.message || 'Successfully registered!', 'success')
        navigate('/login')
      },
      onError: (error: AxiosError<unknown, any>, variables, context) => {
        addToast(
          (error.response?.data as {message?: string})?.message || 'Failed to register',
          'error'
        )
      },
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      addToast('Passwords do not match', 'error')
      return
    }

    const registerData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }

    mutate(registerData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Register</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Name"
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
          />
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
          <Input
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            isLoading={isPending}
            className="w-full"
          >
            Registe
          </Button>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
