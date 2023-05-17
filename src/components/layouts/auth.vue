<template>
  <div class="bg-white h-full min-h-full">
    <div class="flex h-full">
      <div class="w-1/2 h-full p-10">
        <router-view />
      </div>
      <div class="w-1/2 hidden md:block p-10">
        <div
          v-if="current"
          class="auth_bg"
          :style="{
            'background-image': 'url(' + current.bg + ')',
          }"
        >
          <div class="bg-overlay p-20 flex items-end justify-center">
            <div>
              <div class="flex items-center justify-center">
                <span
                  class="bg-transparent text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded border border-solid border-white mr-2"
                >
                  {{ current.name }}
                </span>
                <span
                  class="bg-transparent text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded border border-solid border-white ml-2"
                >
                  {{ current.role }}
                </span>
              </div>
              <p class="text-4xl text-center text-white my-4">
                “ {{ current.title }} “
              </p>
              <div class="w-full inline-flex justify-center mt-6">
                <div
                  v-for="(slide, index) in sliders"
                  class="rounded h-2 mx-1"
                  :class="
                    current.id === slide.id
                      ? 'w-32 bg-white'
                      : 'w-32 bg-gray-600'
                  "
                  :key="index"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'AuthLayout',
  setup() {
    const sliders = ref([
      {
        id: 1,
        bg: '/assets/img/customer/customer-1.jpg',
        title:
          'Photographer Based in Brighton, UK. I specialize in a variety of subjects, from lifestyle and events to food,',
        name: 'Anita Onyeka',
        role: 'photographer',
        next: 2,
      },
      {
        id: 2,
        bg: '/assets/img/customer/customer-2.jpg',
        title:
          "I'm an observer, I love to listen rather that openly express myself. This trait is something that I've retained over the years",
        name: 'Damilola Petry',
        role: 'Agent',
        next: 3,
      },
      {
        id: 3,
        bg: '/assets/img/customer/customer-3.jpg',
        title:
          'Shortcut To Success: Project Management In the Real World and Customer-Centric Project Management',
        name: 'Bukola Yaya',
        role: 'Banker',
        next: 1,
      },
    ])
    const current = ref(sliders.value[0])

    onMounted(() => {
      setInterval(() => {
        current.value = sliders.value[current.value.next - 1]
      }, 8000)
    })
    return { current, sliders }
  },
})
</script>
