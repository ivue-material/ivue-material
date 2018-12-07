<template>
  <div>
    <h1>日历变为横向 设置为多选 宽度百分百</h1>
    <IVueDatePicker v-model="dates" reactive headerColor="red" landscape fullWidth multiple></IVueDatePicker>

    <h1>一开始显示为月份</h1>
    <IVueDatePicker v-model="picker" locale="zh-CH" type="month"></IVueDatePicker>

    <h1>语言</h1>
    <IVueDatePicker v-model="picker" locale="zh-CH"></IVueDatePicker>

    <h1>设置允许选择日期</h1>
    <IVueDatePicker v-model="picker" locale="zh-CH" :allowedDates="allowedDates"></IVueDatePicker>

    <h1>便签</h1>
    <IVueDatePicker
      v-model="picker"
      :note="arrayEvents"
      :noteColor="date => date[9] % 2 ? 'red' : 'yellow'"
    ></IVueDatePicker>

    <h1>一周的第一天</h1>
    <IVueDatePicker :value="picker" firstDayOfWeek="0"></IVueDatePicker>
    <IVueDatePicker :value="picker" firstDayOfWeek="1"></IVueDatePicker>
    <h1>图标设置</h1>
    <IVueDatePicker :value="picker" nextIcon="arrow_right" prevIcon="arrow_left" yearIcon="event_note"></IVueDatePicker>
    <h1>只读</h1>
    <IVueDatePicker v-model="picker" readonly></IVueDatePicker>
    <IVueDatePicker v-model="picker" type="month" readonly></IVueDatePicker>
  </div>
</template>

<script>
export default {
  data () {
    return {
      picker: new Date().toISOString().substr(0, 7),
      dates: ['2018-09-15', '2018-09-20'],
      arrayEvents: null
    }
  },
  mounted () {
    this.arrayEvents = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30)
      const d = new Date()
      d.setDate(day)
      return d.toISOString().substr(0, 10)
    })
  },
  methods: {
    allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0
  }
}
</script>

<style scoped>
</style>