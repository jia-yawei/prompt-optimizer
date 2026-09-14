import type { NavigationGuard } from 'vue-router'
import type { SubModeKey } from '../stores/session/useSessionManager'

export const parseSubModeKey = (path: string): SubModeKey | null => {
  return path === '/basic/user' ? 'basic-user' : null
}

/** Keep the application on its only supported workspace. */
export const beforeRouteSwitch: NavigationGuard = (to) => {
  if (to.path === '/' || to.path === '/basic/user') return true
  return { path: '/basic/user', query: to.query, hash: to.hash }
}
