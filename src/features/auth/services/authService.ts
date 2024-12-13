import { axiosInstance } from '../../../lib/axios'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData extends LoginCredentials {
  name: string
}

interface AuthResponse {
  user: {
    id: string
    email: string
    name: string
  }
  token: string
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await axiosInstance.post<AuthResponse>(
      '/auth/login',
      credentials
    )
    return response.data
  },

  register: async (data: RegisterData) => {
    const response = await axiosInstance.post<AuthResponse>(
      '/auth/register',
      data
    )
    return response.data
  },

  logout: async () => {
    await axiosInstance.post('/auth/logout')
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get<AuthResponse>('/auth/me')
    return response.data
  },
}
