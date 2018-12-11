<template>
  <div>
    <h1>日历变为横向 设置为多选 宽度百分百</h1>
    <IVueDatePicker v-model="dates" headerColor="red" color="blue" landscape fullWidth multiple></IVueDatePicker>

    <h1>一开始显示为月份</h1>
    <IVueDatePicker v-model="picker" type="month" ></IVueDatePicker>

    <h1>语言</h1>
    <IVueDatePicker v-model="picker" locale="zh-CH" :showCurrent="false"></IVueDatePicker>

    <h1>设置允许选择日期</h1>
    <IVueDatePicker v-model="picker" locale="zh-CH" :allowedDates="allowedDates"></IVueDatePicker>

    <h1>便签</h1>
    <p>function</p>
    <IVueDatePicker
      v-model="picker"
      :note="arrayEvents"
      :noteColor="date => date[9] % 2 ? 'red' : 'yellow'"
    ></IVueDatePicker>
    <p>array</p>
    <IVueDatePicker v-model="picker" :note="['2018-12-10']" :noteColor="'red'"></IVueDatePicker>

    <h1>一周的第一天</h1>
    <IVueDatePicker :value="picker" firstDayOfWeek="0"></IVueDatePicker>
    <IVueDatePicker :value="picker" firstDayOfWeek="1"></IVueDatePicker>

    <h1>图标设置</h1>
    <IVueDatePicker
      :value="picker"
      nextIcon="arrow_right"
      prevIcon="arrow_left"
      yearIcon="event_note"
    ></IVueDatePicker>
    
    <h1>只读</h1>
    <IVueDatePicker v-model="picker" readonly></IVueDatePicker>
    <IVueDatePicker v-model="picker" type="month" readonly></IVueDatePicker>

    <h1>noTitle</h1>
    <IVueDatePicker v-model="picker" noTitle @input="handleInput"></IVueDatePicker>

    <h1>width</h1>
    <IVueDatePicker v-model="picker" width="500"></IVueDatePicker>

    <h1>multiple</h1>
    <IVueDatePicker v-model="months" type="month" multiple></IVueDatePicker>

    <h1>max min</h1>
    <IVueDatePicker v-model="picker" min="2016-06-15" max="2018-03-20"></IVueDatePicker>

    <h1>reactive</h1>
    <IVueDatePicker v-model="picker" reactive></IVueDatePicker>
    <IVueDatePicker v-model="picker"  locale="zh-CH"  reactive :showCurrent="false"></IVueDatePicker>

    <h1>pickerDate</h1>
    <IVueDatePicker v-model="picker" :pickerDate.sync="pickerDate"></IVueDatePicker>

    <h1>titleDateFormat<h1>
    <IVueDatePicker v-model="picker" ></IVueDatePicker>

  </div>
</template>

<script>
export default {
  data () {
    return {
      picker: new Date().toISOString().substr(0, 10),
      dates: ['2018-09-15', '2018-09-20'],
      arrayEvents: null,
      months: ['2018-09', '2018-10'],
      pickerDate: null
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
    allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
    handleInput (value) {
      console.log(value)
    },
    titleDateFormat (locale, options, { start, length } = { start: 0, length: 0 }) {
      // 适配IOS
      const makeIsoString = (dateString) => {
            const [year, month, date] = dateString.trim().split(' ')[0].split('-');

            return [year, 1, 1].join('-');
      }
      try {
            // 初始化 根据语言来格式化日期和时间的对象
            const intlFormatter = new Intl.DateTimeFormat(locale || undefined, options);

            return (dateString) =>{
                 return intlFormatter.format(new Date(`${makeIsoString(dateString)}T00:00:00+00:00`))
            }
      }
      catch (e) {
            return (start || length) ? dateString => makeIsoString(dateString).substr(start, length) : null;
      }
    }
  },
  watch:{
    pickerDate(val){
    }
  }
}
</script>

<style scoped>
</style>