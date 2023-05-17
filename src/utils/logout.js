import Authorization from './authorization'
import router from '@/router'

export function logoutOnAll() {
  const authorization = new Authorization()
  authorization.deleteToken()
  router.push('/login')
}
