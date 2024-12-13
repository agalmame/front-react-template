import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

interface UIState {
  isSidebarOpen: boolean
  isLoading: boolean
  toasts: Toast[]
  theme: 'light' | 'dark'
  toggleSidebar: () => void
  setLoading: (isLoading: boolean) => void
  addToast: (message: string, type: Toast['type']) => void
  removeToast: (id: string) => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      isSidebarOpen: true,
      isLoading: false,
      toasts: [],
      theme: 'light',

      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      setLoading: (isLoading) => set({ isLoading }),

      addToast: (message, type) =>
        set((state) => ({
          toasts: [
            ...state.toasts,
            { id: Date.now().toString(), message, type },
          ],
        })),

      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        })),

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-store',
    }
  )
)
