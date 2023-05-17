<template>
  <div class="flex flex-col min-h-full">
    <div>
      <img alt="Logo" src="~@/assets/logo.svg" class="h-10 mb-20" />
      <form @submit.prevent="''">
        <h1 class="text-4xl font-bold">Sign Up</h1>
        <p class="my-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum
          dolor sit amet, consectetur adipiscing elit,
        </p>
        <Feedback
          :showIcon="true"
          v-on:close-feedback="removeError()"
          v-if="feedbackMessage"
          :type="feedbackType"
        >
          {{ feedbackMessage }}
        </Feedback>
        <div class="my-10">
          <div class="field__wrap mb-4 col-md-12">
            <label for="first_name">Name</label>
            <TextInput
              id="first_name"
              type="text"
              v-model="registerData.name"
            />
          </div>
          <div class="field__wrap mb-4 col-md-12">
            <label for="email">Email Address *</label>
            <TextInput id="email" type="email" v-model="registerData.email" />
          </div>
          <div class="flex items-center space-x-5">
            <div class="field__wrap mb-4 w-1/2">
              <label for="password">Password*</label>
              <PasswordInput id="password" v-model="registerData.password" />
            </div>
            <div class="field__wrap mb-4 w-1/2">
              <label for="password_confirmation">Password Confirmation *</label>
              <PasswordInput
                id="password_confirmation"
                v-model="registerData.password_confirmation"
              />
            </div>
          </div>
          <div class="mt-4">
            <p class="font-xxs text-gray-600">
              Already have an account?
              <router-link
                :to="{ name: 'Login' }"
                class="text-blue-400 hover:underline"
                >Sign in</router-link
              >
            </p>
          </div>
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
            @click="handleRegister"
          >
            <span class="my-2">Sign Up</span></Button
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { useAuth } from '@/store/auth/useAuth'
import Button from '@/components/ui/Button'
import PasswordInput from '@/components/ui/Inputs/PasswordInput'
import TextInput from '@/components/ui/Inputs/TextInput'
import Feedback from '@/components/ui/Feedback'
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'RegisterPage',
  components: {
    Button,
    Feedback,
    PasswordInput,
    TextInput,
  },
  setup() {
    //data
    const auth = useAuth()
    const loading = ref(false)
    const feedbackMessage = ref('')
    const feedbackType = ref('error')
    const registerData = ref({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    })

    //methods
    const removeError = () => {
      feedbackMessage.value = ''
    }

    const handleRegister = () => {
      loading.value = true
      feedbackMessage.value = ''
      auth
        .handleRegister(registerData.value)
        .then(responseMessage => {
          feedbackType.value = 'success'
          feedbackMessage.value = responseMessage
        })
        .catch(errorMessage => {
          feedbackType.value = 'error'
          feedbackMessage.value = errorMessage
        })
        .finally(() => {
          loading.value = false
        })
    }

    //computed

    const validateEmail = computed(() => {
      const { email } = registerData.value
      return (
        email.value.length &&
        email.value.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      )
    })

    const allFilled = computed(() => {
      const { name, password, password_confirmation } = registerData.value
      return (
        name !== '' &&
        validateEmail &&
        password !== '' &&
        password_confirmation === password
      )
    })

    return {
      loading,
      allFilled,
      removeError,
      feedbackType,
      registerData,
      handleRegister,
      feedbackMessage,
    }
  },
})
</script>
