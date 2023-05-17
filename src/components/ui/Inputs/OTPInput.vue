<template>
  <div ref="otpInput">
    <div class="text-center">
      <div id="otp" class="d-flex align-items-center" :class="otpClass">
        <input
          v-for="index in inputSize"
          class="m-2 text-center form-control field__input"
          type="number"
          :ref="`${this.id}otpBox${index - 1}`"
          :id="`${this.id}otpBox${index - 1}`"
          maxlength="1"
          :key="index"
          autofocus
          v-on:keydown="handleInput($event, index - 1)"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OTP',
  data() {
    return {
      otpCode: [],
    }
  },
  props: {
    inputSize: {
      type: Number,
      default: 4,
    },
    isClear: {
      type: Boolean,
    },
    otpClass: {
      type: String,
    },
    id: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.otpCode = Array(this.inputSize).fill(null)
  },
  methods: {
    allFilled() {
      for (let i in this.otpCode) {
        if (this.otpCode[i] === null) {
          return this.$emit('allFilled', { isFilled: false, otp: [] })
        }
      }
      return this.$emit('allFilled', {
        isFilled: true,
        otp: this.otpCode.join(''),
      })
    },
    handleInput(event, i) {
      let ele = this.getElementById(`${this.id}otpBox${i}`)
      if (event.key === 'Backspace') {
        ele.value = ''
        this.otpCode[i] = null
        if (i !== 0) this.getElementById(`${this.id}otpBox${i - 1}`).focus()
      } else {
        if (i === this.otpCode.length - 1 && ele.value !== '') {
          event.preventDefault()
          return true
        }
        if (!isNaN(parseInt(event.key))) {
          ele.value = event.key
          /*setTimeout(function () {
            ele.value = '*'
          }, 200)*/
          this.otpCode[i] = event.key
          if (i !== this.otpCode.length - 1) {
            this.getElementById(`${this.id}otpBox${i + 1}`).focus()
          }
          event.preventDefault()
        } else {
          this.$refs[`${this.id}otpBox${i}`].value = ''
          event.preventDefault()
        }
      }
      this.allFilled()
    },
    getElementById(id) {
      return document.getElementById(id)
    },
  },
  watch: {
    isClear: {
      handler(value) {
        if (value === true) {
          for (let i = 0; i < 6; i++) {
            let ele = this.getElementById(`${this.id}otpBox${i}`)
            ele.value = ''
          }
        }
      },
    },
  },
}
</script>
<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
.form-control {
  -webkit-transition: none;
  width: 52px;
  height: 52px;
  border-radius: 8px;
  font-size: 24px;
  font-weight: bold;
  transition: color 0.15s ease, background-color 0.15s ease,
    border-color 0.15s ease, box-shadow 0.15s ease;
}
</style>
