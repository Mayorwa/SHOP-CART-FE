export default class Authorization {
  isAuthenticated() {
    return !!this.token()
  }
  getValue(type) {
    const name = `${type}=`
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }
  setValue(valueName, value) {
    const d = new Date()
    d.setTime(d.getTime() + 99999999 * 24 * 60 * 60 * 1000)
    const expires = 'expires=' + d.toUTCString()
    document.cookie = `${valueName}=${value};${expires};path=/;secure=true`
  }
  token() {
    return this.getValue('token')
  }
  setToken(token) {
    this.setValue('token', token)
    this.token()
  }
  deleteValue(type) {
    document.cookie = `${type}=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
    return ''
  }
  deleteToken() {
    this.deleteValue('token')
  }
}
