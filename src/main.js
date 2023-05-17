import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'

import '@/assets/sass/main.scss'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia).use(router).mount('#app')
