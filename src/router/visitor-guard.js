import Authorization from '@/utils/authorization'

const VisitorGuard = (to, from, next) => {
  const authorization = new Authorization()

  if (!authorization.isAuthenticated()) {
    return next()
  }
  return next({ path: '/products' })
}

export default VisitorGuard
