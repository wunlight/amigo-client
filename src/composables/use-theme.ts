import { ref } from 'vue'

const DARK_MODE_KEY = 'dark-mode'

const isDark = ref<boolean>(localStorage.getItem(DARK_MODE_KEY) === 'true')

export const useTheme = () => {
  function applyTheme(value: boolean) {
    isDark.value = value
    document.documentElement.classList.toggle('dark', value)
    localStorage.setItem(DARK_MODE_KEY, String(value))
  }

  function toggleTheme() {
    applyTheme(!isDark.value)
  }

  return { isDark: isDark.value, applyTheme, toggleTheme }
}
