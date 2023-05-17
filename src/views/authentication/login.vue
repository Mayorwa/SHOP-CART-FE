<template>
  <div class="flex flex-col min-h-full">
    <div>
      <img alt="Logo" src="~@/assets/logo.svg" class="h-10 mb-20" />
      <form @submit.prevent="''">
        <h1 class="text-4xl font-bold">Login</h1>
        <p class="my-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum
          dolor sit amet, consectetur adipiscing elit,
        </p>
        <Feedback
          :showIcon="true"
          v-on:close-feedback="removeError()"
          v-if="error"
          type="error"
        >
          <p class="text-xs font-medium text-red-500">
            {{ error }}
          </p>
        </Feedback>
        <div class="my-10">
          <div class="field__wrap mb-4">
            <label for="email-phone">EMAIL</label>
            <TextInput id="email-phone" type="email" v-model="email" />
          </div>
          <div class="field__wrap">
            <label for="password">PASSWORD</label>
            <PasswordInput id="password" v-model="password" />
          </div>
        </div>
      </form>
    </div>
    <div class="mt-7 text-center">
      <Button
        :loading="loading"
        :inactive="!allFilled"
        :variant="'primary'"
        :size="'md'"
        type="submit"
        btnClass="w-full"
        name="requestDemo"
        @click="handleLogin"
      >
        <span class="my-2">Sign in</span></Button
      >
      <p class="mt-3">
        Don't have an account?
        <router-link
          :to="{ name: 'Register' }"
          class="text-blue-400 hover:underline"
          >Create An Account</router-link
        >
        in Less than a minute
      </p>
    </div>
  </div>
</template>
<script>
import { useAuth } from '@/store/auth/useAuth'
import { useRouter } from 'vue-router'
import Button from '@/components/ui/Button'
import PasswordInput from '@/components/ui/Inputs/PasswordInput'
import TextInput from '@/components/ui/Inputs/TextInput'
import Feedback from '@/components/ui/Feedback'
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    Button,
    PasswordInput,
    Feedback,
    TextInput,
  },
  setup() {
    //data
    const auth = useAuth()
    const router = useRouter()

    const loading = ref(false)
    const password = ref('')
    const email = ref('')
    const error = ref('')
    const removeError = () => {
      error.value = ''
    }

    //methods
    const handleLogin = () => {
      loading.value = true
      error.value = ''
      auth
        .handleLogin({ email: email.value, password: password.value })
        .then(() => {
          router.push('/products')
        })
        .catch(errorResponse => {
          const { message } = errorResponse.response.data
          error.value = message
        })
        .finally(() => {
          loading.value = false
        })
    }

    //computed
    const validateEmail = computed(() => {
      return (
        email.value.length &&
        email.value.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      )
    })

    const allFilled = computed(() => {
      return password.value !== '' && validateEmail
    })

    return {
      loading,
      password,
      email,
      error,
      removeError,
      handleLogin,
      allFilled,
    }
  },
})
</script>
