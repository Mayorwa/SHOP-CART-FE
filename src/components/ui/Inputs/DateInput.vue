<template>
  <div class="flex">
    <select
      name="month"
      id="month"
      class="field__input"
      v-model="date.month"
      @change="selectDate"
    >
      <option value="">Select Month</option>
      <option :value="index + 1" v-for="(month, index) in months" :key="index">
        {{ month.name }}
      </option>
    </select>
    <select
      name="day"
      id="day"
      class="field__input mx-3"
      v-model="date.day"
      @change="selectDate"
    >
      <option value="">Select Day</option>
      <option :value="day" v-for="day in noOfDays" :key="day">
        {{ day }}
      </option>
    </select>
    <select
      name="year"
      id="year"
      class="field__input"
      v-model="date.year"
      @change="selectDate"
    >
      <option value="">Select Year</option>
      <option :value="year" v-for="year in rangeOfYears" :key="year">
        {{ year }}
      </option>
    </select>
  </div>
  <a class="text-red-500 text-xs" v-if="!isValidDate">{{ error_message }}</a>
</template>
<script>
export default {
  name: 'DateInput',
  props: {
    id: {
      type: String,
    },
    error_message: {
      type: String,
    },
  },
  emits: ['updateDate'],
  data() {
    return {
      isValidDate: true,
      months: [
        { name: 'January', days: 31 },
        { name: 'February', days: 28 },
        { name: 'March', days: 31 },
        { name: 'April', days: 30 },
        { name: 'May', days: 31 },
        { name: 'June', days: 30 },
        { name: 'July', days: 31 },
        { name: 'August', days: 31 },
        { name: 'September', days: 30 },
        { name: 'October', days: 31 },
        { name: 'November', days: 30 },
        { name: 'December', days: 31 },
      ],
      noOfDays: 31,
      yearRange: [new Date().getFullYear() - 150, new Date().getFullYear() - 5],
      date: {
        month: '',
        year: '',
        day: '',
      },
    }
  },
  methods: {
    selectDate() {
      if (this.allFilledAndValid) {
        this.$emit('updateDate', this.formatDate)
      } else {
        this.$emit('updateDate', '')
      }
    },
    checkIfLeapYear(year) {
      return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0
    },
    addLeadingZero(value) {
      return value.toString().length > 1
        ? value.toString()
        : `0` + value.toString()
    },
    checkIfDateIsValid(day, month, year) {
      let actualDaysInMonth = this.months[month - 1].days
      if (this.checkIfLeapYear(year) && month.toString() === '2') {
        actualDaysInMonth = 29
      }
      this.isValidDate = actualDaysInMonth >= day
      return this.isValidDate
    },
  },
  computed: {
    formatDate() {
      const { day, month, year } = this.date
      let m = this.addLeadingZero(month)
      let d = this.addLeadingZero(day)
      return `${year}-${m}-${d}`
    },
    allFilledAndValid() {
      const { day, month, year } = this.date
      if (day !== '' && month !== '' && year !== '') {
        return this.checkIfDateIsValid(day, month, year)
      }
      return false
    },
    rangeOfYears() {
      let years = []
      for (let i = this.yearRange[0]; i < this.yearRange[1]; i++) {
        years.push(i)
      }
      return years
    },
  },
}
</script>
