<template>
  <div
    class="position-relative"
    v-click-outside="closeDropdown"
    @keyup.esc="closeDropdown"
  >
    <Button :variant="'outline-gray'" @click="toggleDropdown()">
      <Icon name="filter" width="18px" height="18px" />
      <span class="ms-3">Filter</span>
    </Button>
    <div
      class="tabs w-275px border border-gray-100 position-absolute z-50 right-0"
      v-show="show"
      :class="[animation, filterClass]"
    >
      <div class="tab" v-show="filterByDate">
        <input type="radio" id="filter1" name="filter" />
        <label class="tab-label fs-8 fw-semibold" for="filter1">Date</label>

        <div class="tab-content">
          <div
            class="d-flex flex-column flex-sm-row justify-content-start align-items-center"
          >
            <Datepicker
              v-model="dateStart"
              :clearable="false"
              :autoPosition="false"
              :format="format"
              mode="date"
              autoApply
              :max-date="new Date()"
            >
              <template #dp-input="{ value }">
                <div class="position-relative flex-grow-1">
                  <p class="fs-8">From</p>
                  <input
                    type="text"
                    class="flex-grow-1 px-2 py-1 text-gray-900 fs-8 bg-white border border-gray-100 rounded-sm w-100"
                    :value="value"
                  />
                  <svg
                    class="text-gray-600 w-15px h-100 mx-2 position-absolute right-0 top-2 no-pointer-events"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
              </template>
            </Datepicker>
            <span class="flex-shrink-0 text-gray-10 mt-4 mx-1"> &#8722; </span>
            <Datepicker
              v-model="dateEnd"
              mode="date"
              :format="format"
              autoApply
              :autoPosition="false"
              :clearable="false"
              :max-date="new Date()"
            >
              <template #dp-input="{ value, onInput }">
                <div class="position-relative flex-grow-1">
                  <p class="fs-7">To</p>
                  <input
                    type="text"
                    class="flex-grow-1 px-2 py-1 text-gray-900 fs-7 bg-white border border-gray-50 rounded-sm w-100"
                    :value="value"
                    @input="onInput"
                  />
                  <svg
                    class="text-gray-600 w-15px h-100 mx-2 position-absolute right-0 top-2 no-pointer-events"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
              </template>
            </Datepicker>
          </div>
        </div>
      </div>

      <div
        v-show="filterOptionsArray"
        v-for="(filter, index) in filterTitleArray"
        :key="index"
        class="tab border-t border-gray-30"
      >
        <input type="radio" :id="filter + (index + 2)" name="filter" />
        <label class="tab-label fs-8 fw-semibold" :for="filter + (index + 2)">{{
          filter
        }}</label>
        <div class="tab-content d-flex flex-column space-y-3">
          <div
            v-for="(option, i) in filterOptionsArray[index]"
            :key="i"
            role="checkbox"
            class="d-flex align-items-center mb-2"
          >
            <input
              :id="option"
              type="checkbox"
              :value="option"
              :checked="selectedFilterArray[index][i] === option"
              v-model="selectedFilterArray[index][i]"
            />
            <label class="fs-8 ms-2" :for="option">{{ option }}</label>
          </div>
        </div>
      </div>
      <div
        v-show="filterTextOptionsArray"
        v-for="(filter, index) in filterTextOptionsArray"
        :key="filter + index"
        class="tab border-t border-gray-30"
      >
        <input type="radio" :id="filter + (index + 7)" name="filter" />
        <label class="tab-label capitalize" :for="filter + (index + 7)">{{
          filter
        }}</label>
        <div class="tab-content flex flex-col space-y-3">
          <input
            type="text"
            name=""
            class="w-full text-xs py-3 px-3"
            :id="filter"
            v-model="textFilterData[filter]"
            :placeholder="filter"
          />
        </div>
      </div>

      <div class="tab border-t border-gray-30 bg-white text-center py-4">
        <Button variant="primary" @click="applyTableFilters()">
          <span class="ms-3">Apply Filters</span>
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, watch } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import '@vuepic/vue-datepicker/dist/main.css'

export default defineComponent({
  components: { Datepicker, Button, Icon },
  name: 'FilterTable',
  props: {
    clearState: String,
    /**
     * Array of title for checkbox fields filter option
     */
    filterTitleArray: {
      type: Array,
    },
    /**
     * Array of arrays for text fields filter option
     */
    filterOptionsArray: {
      type: Array,
    },
    /**
     * Array of title for text fields filter option
     */
    filterTextOptionsArray: {
      type: Array,
    },
    /**
     * External function that handles data from
     * filter options selected
     */
    filterAction: {
      type: Function,
      default: () => {},
    },
    /*
     * Allows filter by date?
     * */
    filterByDate: {
      type: Boolean,
      default: true,
    },

    /*
     * External class names for the filter
     * */
    filterClass: {
      type: String,
    },
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
  setup(props, { emit }) {
    let show = ref(false)
    let animation = ref('')
    const filterData = reactive({
      selectedFilterArray: [[], [], [], [], []],
      textFilterData: {},
      dateStart: '',
      dateEnd: new Date(),
    })

    const clearInput = (type, index) => {
      switch (type) {
        case 'checkbox':
          filterData.selectedFilterArray[index].length = 0
          break
        case 'text':
          filterData.textFilterData = ''
          break
        default:
          filterData.dateStart = ''
          break
      }
    }

    const masks = ref({
      input: 'YYYY-MM-DD',
    })
    function getCheckedValue(e) {
      emit('checked', e)
    }
    function applyTableFilters() {
      let trigger = {
        ...filterData.textFilterData,
        selectedCheckboxes: filterData.selectedFilterArray,
      }
      if (props.filterByDate) {
        trigger.start = filterData.dateStart
        trigger.end = filterData.dateEnd
      }
      props.filterAction(trigger)
      closeDropdown()
    }
    function toggleDropdown() {
      show.value === false
        ? ((animation.value = 'open'), (show.value = true))
        : closeDropdown()
    }
    function close() {
      setTimeout(() => {
        return show.value === true ? (show.value = false) : null
      }, 500)
    }

    function closeDropdown() {
      animation.value = 'close'
      close()
    }

    function applyFilters() {
      closeDropdown()
    }
    watch(
      () => props.clearState,
      newValue => {
        if (newValue === 'name') {
          filterData.textFilterData = ''
        }
        if (newValue === 'date') {
          filterData.dateStart = ''
        }
        if (newValue === 'status') {
          filterData.selectedFilterArray = [[], [], [], [], []]
        }
      }
    )

    const format = date => {
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      return `${month}/${day}/${year}`
    }

    return {
      masks,
      show,
      animation,
      ...toRefs(filterData),
      getCheckedValue,
      applyTableFilters,
      toggleDropdown,
      closeDropdown,
      applyFilters,
      close,
      format,
      clearInput,
    }
  },
})
</script>

<style lang="scss" scoped>
$midnight: #eff2f7;
$clouds: #ecf0f1;
// General
input[type='radio'] {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
.z-50 {
  z-index: 20;
}
/* Accordion styles */
.tabs {
  border-radius: 4px;
  box-shadow: 0px 2px 3px rgba(67, 67, 67, 0.19);
}
.tab {
  width: 100%;
  background: white;
  overflow: hidden;
  &:not(:last-child) {
    border-bottom: 1px dashed var(--bs-gray-300);
  }
  &-label {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    font-size: 12px;
    background: white;
    cursor: pointer;
    &:first-of-type {
      padding-top: 1.2em;
    }
    /* Icon */
    &:hover {
      background: $midnight;
    }
    &::after {
      content: '\002B';
      width: 1em;
      height: 1em;
      text-align: center;
      transition: all 0.35s;
    }
  }
  &-content {
    max-height: 0;
    padding: 0 1em;
    background: white;
    transition: all 0.35s;
  }
}

// :checked
input:checked {
  + .tab-label {
    background: $midnight;
    &::after {
      content: '\2212';
    }
  }
  ~ .tab-content {
    background: #eff2f7;
    max-height: 100vh;
    padding: 0.1em 1em 1em;
  }
}

.open {
  animation: dropIn 0.5s cubic-bezier(0, 0, 0.21, 1) forwards;
}
.close {
  animation: dropOut 0.5s cubic-bezier(0, 0, 0.21, 1) forwards;
}
@keyframes dropIn {
  0% {
    transform: scale(0.98);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes dropOut {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.98);
    opacity: 0;
  }
}
</style>
