<template>
  <div class="flex items-stretch bg-white shadow-brand-primary-dull h-16">
    <div class="container flex items-stretch justify-between mx-auto">
      <div class="flex items-center lg:mr-9">
        <a href="#">
          <img alt="Logo" src="~@/assets/logo.svg" class="h-10" />
        </a>
      </div>
      <div class="flex items-stretch justify-between lg:flex-grow">
        <div class="flex mx-auto items-stretch">
          <div
            class="flex flex-row items-stretch p-0 m-0 list-none w-full my-5 px-2 lg:my-0 lg:px-0"
          >
            <router-link
              v-for="(item, index) in navItems"
              :key="index"
              class="mr-2 flex items-center menu-here-bg"
              :to="item.routeLink"
            >
              <span
                :class="
                  routeLink === item.routeLink ? 'bg-brand-primary-dull' : ''
                "
                class="hover:bg-gray-50 cursor-pointer flex items-center p-0 flex-0 flex-shrink-0 w-full px-4 py-2 transition-colors duration-200 ease-in-out focus:outline-none rounded-md font-medium"
              >
                <Icon :name="item.icon" width="18px" height="18px" />
                <span class="flex items-center flex-grow mx-3">{{
                  item.name
                }}</span>
              </span>
            </router-link>
          </div>
        </div>
        <ProfileNav />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import ProfileNav from '@/components/dashboard/ProfileNav.vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'DashboardHeader',
  components: { Icon, ProfileNav },
  setup() {
    const navItems = ref([
      { name: 'Store', routeLink: '/products', icon: 'shop' },
      { name: 'Cart', routeLink: '/cart', icon: 'home-3' },
    ])
    const routeLink = computed(() => {
      return useRoute().path
    })

    return {
      navItems,
      routeLink,
    }
  },
})
</script>
<style lang="scss"></style>
