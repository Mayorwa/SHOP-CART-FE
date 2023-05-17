import http from '@//config/axios'

export const authUrls = {
  LOGIN_URL: 'auth/login',
  REGISTER_URL: 'auth/register',
  LOGGED_IN_USER_URL: 'user/get-logged-in',
}

// login
const login = async payload => {
  return await http.post(authUrls.LOGIN_URL, payload)
}

// register
const register = async payload => {
  return await http.post(authUrls.REGISTER_URL, payload)
}

// get Logged in User
const getLoggedInUser = async () => {
  return await http.get(authUrls.LOGGED_IN_USER_URL)
}

export { login, getLoggedInUser, register }
