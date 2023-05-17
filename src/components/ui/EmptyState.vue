<template>
  <div class="empty">
    <div class="empty__icon" :class="customClasses">
      <img src="@/assets/img/empty.svg" alt="empty" />
    </div>
    <h2 class="empty__heading">{{ heading }}</h2>
    <p class="empty__sub-heading" v-if="showInfo">{{ subHeading }}</p>
    <div class="empty__cta">
      <slot name="cta" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    info: { type: String },
    subInfo: { type: String },
    showInfo: { type: Boolean, default: true },
    customClasses: { type: String },
  },
  setup(props) {
    const heading = computed(() => {
      return props.info ? props.info : 'No result'
    })

    const subHeading = computed(() => {
      return props.subInfo
        ? props.subInfo
        : 'Your records will be displayed here once you have them.'
    })

    return { heading, subHeading }
  },
})
</script>

<style scoped lang="scss">
.empty {
  align-items: center;
  border-radius: 2px;
  border: 1px dashed var(--bs-gray-400);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  text-align: center;

  &__icon {
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    height: 200px;
    justify-content: center;
    margin-bottom: 24px;
    width: 200px;

    & > * {
      display: block;
      flex: 0 0 auto;
      height: 100%;
      max-width: 100%;
      width: auto;
    }
  }

  &__heading {
    color: var(--text-90);
    font-size: 22px;
    font-weight: 600;
    line-height: 30px;
    margin-bottom: 10px;
  }

  &__sub-heading {
    color: var(--text-95);
    font-size: 16px;
    line-height: 24px;
  }

  &__cta {
    margin-top: 20px;
  }
}
</style>
