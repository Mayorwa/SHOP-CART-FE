import { logoutOnAll } from '@/utils/logout'
import router from '@/router'

export const formatError = error => {
  if (error.response) {
    const { data, status } = error.response

    //check if the user is not authenticated and call the logout on all function
    if (status === 401) {
      logoutOnAll()
    }
    if (status === 404) {
      router.push('/page-not-found')
    }
    const { errors, message } = data
    let errorMessages = ''

    if (errors) {
      for (const prop in errors) {
        errorMessages +=
          `${errors[prop].message}\n` || `${errors[prop].errors.toString()}\n`
      }
      return errorMessages
    }

    return message
  }
  return error
}
