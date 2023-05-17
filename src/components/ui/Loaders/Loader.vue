<template>
  <div class="text-center" style="padding-top: 20vh">
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
    <h5>Loading</h5>

    <p class="font-xs">This shouldn't take a while.</p>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoaderRipple',
})
</script>
<style>
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
