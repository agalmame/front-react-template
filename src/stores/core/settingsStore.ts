import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Settings {
  language: string
  currency: string
  dateFormat: string
  timezone: string
}

interface SettingsState {
  settings: Settings
  updateSettings: (settings: Partial<Settings>) => void
}

const defaultSettings: Settings = {
  language: 'en',
  currency: 'USD',
  dateFormat: 'MM/DD/YYYY',
  timezone: 'UTC',
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'settings-storage',
    }
  )
)
