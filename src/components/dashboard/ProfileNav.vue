<template>
  <div
    class="relative"
    v-click-outside="closeDropdown"
    @keyup.esc="closeDropdown"
  >
    <div
      class="flex items-stretch h-full cursor-pointer"
      @blur="hideTopNavBarPopUp()"
      @click="showProfile()"
    >
      <div class="flex items-center">🧔🏾‍♂️</div>
      <div class="flex items-center mx-2 text-capitalize">
        {{ userName }}
      </div>
      <div class="flex items-center">
        <Icon name="dropdown" width="16px" height="16px" />
      </div>
    </div>
    <div v-if="isShowProfile" class="profile-nav__child">
      <div
        class="z-10 bg-white divide-y divide-gray-100 rounded shadow w-48 right-0"
      >
        <ul class="py-2 text-sm text-gray-700">
          <li
            class="flex items-center px-4 py-2 drop-nav-item"
            @click="$router.push('/logout')"
          >
            <Icon name="logout" width="16px" height="16px" />
            <a href="#" class="block ml-2 text-black">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, defineComponent, ref } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import { useAuth } from '@/store/auth/useAuth'
export default defineComponent({
  name: 'ProfileNav',
  components: { Icon },
  setup() {
    const auth = useAuth()

    const { userInfo } = auth

    const hideTopNavBarPopUp = () => {
      setTimeout(() => {
        isShowProfile.value = false
      }, 200)
    }
    const showProfile = () => {
      isShowProfile.value = !isShowProfile.value
    }

    const closeDropdown = () => {
      isShowProfile.value = false
    }
    const isShowProfile = ref(false)

    const userName = computed(() => {
      return userInfo.name.split(' ')[0]
    })

    return {
      userName,
      isShowProfile,
      hideTopNavBarPopUp,
      showProfile,
      closeDropdown,
    }
  },
  directives: {
    'click-outside': {
      beforeMount(el, binding) {
        el.clickOutsideEvent = function (event) {
          // here I check that click was outside the el and his children
          if (!(el === event.target || el.contains(event.target))) {
            // and if it did, call method provided in attribute value
            binding.value(event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      },
    },
  },
})
</script>
