<template>
  <div>
    <IVueDatePicker
      v-model="dates"
      reactive
      headerColor="red"
      color="green"
      landscape
      fullWidth
      :allowedDates="allowedDates"
      multiple
    ></IVueDatePicker>

    <IVueDatePicker :value="picker" locale="zh-CH" type="month"></IVueDatePicker>
  </div>
</template>

<script>
export default {
  data () {
    return {
      picker: new Date().toISOString().substr(0, 10),
      dates: ['2018-09-15', '2018-09-20']
    }
  },
  methods: {
    allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0
  }
}
</script>

<style scoped>
</style>