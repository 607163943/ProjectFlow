import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'pf-theme'

const getPreferredTheme = () => {
  if (typeof window === 'undefined') {
    return 'light'
  }
  return window.localStorage.getItem(STORAGE_KEY) || 'light'
}

const applyThemeClass = (theme) => {
  if (typeof document === 'undefined') {
    return
  }
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(getPreferredTheme())

  const isDark = computed(() => theme.value === 'dark')

  const setTheme = (nextTheme) => {
    theme.value = nextTheme
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextTheme)
    }
    applyThemeClass(nextTheme)
  }

  const toggleTheme = () => {
    setTheme(isDark.value ? 'light' : 'dark')
  }

  applyThemeClass(theme.value)

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  }
})
