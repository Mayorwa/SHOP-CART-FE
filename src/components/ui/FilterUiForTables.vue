<template>
  <span
    class="flex items-center space-x-2 pl-2 pr-4 py-1 text-sm text-brand-primary-dark bg-brand-primary-dull rounded border border-brand-primary-sharp"
  >
    <svg
      @click="close"
      class="cursor-pointer"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 0.5C3.416 0.5 0.5 3.416 0.5 7C0.5 10.584 3.416 13.5 7 13.5C10.584 13.5 13.5 10.584 13.5 7C13.5 3.416 10.584 0.5 7 0.5ZM7 1.5C10.0435 1.5 12.5 3.9565 12.5 7C12.5 10.0435 10.0435 12.5 7 12.5C3.9565 12.5 1.5 10.0435 1.5 7C1.5 3.9565 3.9565 1.5 7 1.5ZM5.11 4.39L4.39 5.11L6.282 7L4.391 8.89L5.111 9.61L7 7.7185L8.89 9.6085L9.61 8.89L7.7185 7L9.6085 5.11L8.89 4.39L7 6.282L5.11 4.391V4.39Z"
        fill="#A86700"
      />
    </svg>
    <span class="capitalize">
      <slot />
    </span>
  </span>
</template>
<script>
export default {
  name: 'FilterUiForTables',
  props: {
    filterAction: {
      type: Function,
    },
  },
  data() {
    return {}
  },
  methods: {
    close() {
      this.filterAction()
    },
  },
}
</script>
