import { defineStore } from 'pinia'
import { getLoggedInUser, login, register } from '@/services/authentication'
import { formatError } from '@/utils/helpers/errors.helper'
import Authorization from '@/utils/authorization'

export const useAuth = defineStore({
  id: 'auth',
  state: () => ({
    isAuthenticated: false,
    userInfo: {
      created_at: '',
      email: '',
      name: '',
    },
    isUserError: false,
    isUserLoading: false,
  }),
  actions: {
    handleLogin(payload) {
      return new Promise((resolve, reject) => {
        login(payload)
          .then(response => {
            this.isUserError = false
            const authorization = new Authorization()
            const { data } = response.data
            authorization.setToken(data.token)
            resolve(data)
          })
          .catch(error => {
            this.isUserError = true
            reject(error)
          })
      })
    },
    handleRegister(payload) {
      return new Promise((resolve, reject) => {
        register(payload)
          .then(response => {
            this.isUserError = false
            const { message } = response.data
            resolve(message)
          })
          .catch(error => {
            this.isUserError = true
            reject(formatError(error))
          })
      })
    },
    handleGetLoggedInUser() {
      return new Promise((resolve, reject) => {
        this.isUserLoading = true
        getLoggedInUser()
          .then(response => {
            const { data } = response.data
            this.isUserError = false
            this.userInfo = data.user
            resolve(data)
          })
          .catch(error => {
            this.isUserError = true
            reject(formatError(error))
          })
          .finally(() => {
            this.isUserLoading = false
          })
      })
    },
  },
})
