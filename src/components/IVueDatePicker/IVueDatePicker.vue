<script>
import Picker from '../../utils/mixins/Picker';
import IVueDatePickerTitle from './IVueDatePickerTitle';
import IVueDatePickerHeader from './IVueDatePickerHeader';
import IVueDatePickerDate from './IVueDatePickerDate';
import IVueDatePickerMonth from './IVueDatePickerMonth';

import CreateNativeLocaleFormatter from '../../utils/CreateNativeLocaleFormatter';
import Pad from '../../utils/Pad';

export default {
  name: 'IVueDatePicker',
  mixins: [Picker],
  props: {
    // Function formatting the year in table header and pickup title
    yearFormat: {
      type: Function,
      default: null
    },
    // Function formatting currently selected date in the picker title
    titleDateFormat: {
      type: Function,
      default: null
    },
    /*
    * 语言
    *
    * @type{String}
    */
    locale: {
      type: String,
      default: 'en-us'
    },
    /*
    * 日期 时间
    *
    * @type{String,Array}
    */
    value: [Array, String],
    /*
    * 日历显示的类型 默认显示为日期
    *
    * @type{String}
    */
    type: {
      type: String,
      default: 'date',
      validator: type => ['date', 'month'].includes(type)
    },
    /*
    * 一周的第一天
    *
    * @type{String,Number}
    */
    firstDayOfWeek: {
      type: [String, Number],
      default: 0
    }
  },
  data () {
    const now = new Date();

    return {
      // 日期
      inputDay: null,
      // 输入年份
      inputYear: null,
      // 输入月份
      inputMonth: null,
      // 当前激活的type
      activeType: this.type.toUpperCase(),
      // tableDate is a string in 'YYYY' / 'YYYY-M' format (leading zero for month is not required)
      tableDate: null
    }
  },
  created () {
    this.setInputDate();

    this.tableDate = (() => {
      const date = this.value || `${now.getFullYear}-${now.getMonth() + 1}`

      const type = this.type === 'date' ? 'month' : 'year';

      return this.sanitizeDateString(date, type)
    })()
  },
  computed: {
    computedValue () {
      return this.value;
    },
    // 格式化日期
    formatters () {
      return {
        // UTC时区
        year: this.yearFormat || CreateNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 }),
        titleDate: this.titleDateFormat || this.defaultTitleDateFormatter

      }
    },
    // 年份
    tableYear () {
      return this.tableDate.split('-')[0] * 1;
    },
    // 月份
    tableMonth () {
      return this.tableDate.split('-')[1] - 1;
    },
    // 选择的日期
    inputDate () {
      return this.type === 'date' ?
        `${this.inputYear}-${Pad(this.inputMonth + 1)}-${Pad(this.inputDay)}` :
        `${this.inputYear}-${Pad(this.inputMonth + 1)}`
    },
    // 默认日期格式
    defaultTitleDateFormatter () {
      // 标题格式
      const titleFormats = {
        year: { year: 'numeric', timeZone: 'UTC' },
        month: { month: 'long', timeZone: 'UTC' },
        date: { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }
      }

      // 格式化
      const titleDateFormatter = CreateNativeLocaleFormatter(this.locale, titleFormats[this.type], {
        start: 0,
        length: { date: 10, month: 7, year: 4 }[this.type]
      });

      // 日期换行
      const landscapeFormatter = (date) => titleDateFormatter(date)
        .replace(/([^\d\s])([\d])/g, (match, nonDigit, digit) => `${nonDigit} ${digit}`)
        .replace(', ', ',<br>');

      return this.landscape ? landscapeFormatter : titleDateFormatter;
    },
    // 选择的日期
    selectedMonths () {
      if (!this.value || !this.value.length || this.type === 'month') {
        return this.value;
      }
      else {
        return this.value.substr(0, 7);
      }
    }
  },
  methods: {
    // 点击日期事件
    emitInput (newInput) {
      this.$emit('input', newInput)
    },
    // 渲染标题内容
    genPickerTitle () {
      return this.$createElement(IVueDatePickerTitle, {
        props: {
          date: this.value ? this.formatters.titleDate(this.value) : '',
          year: this.formatters.year(`${this.inputYear}`),
          value: this.value
        },
        slot: 'title'
      });
    },
    // 渲染内容头部
    genTableHeader () {
      return this.$createElement(IVueDatePickerHeader, {
        props: {
          locale: this.locale,
          value: this.activeType === 'DATE' ? `${this.tableYear}-${Pad(this.tableMonth + 1)}` : `${this.tableYear}`
        },
        on: {
          input: value => this.tableDate = value,
          toggle: () => this.activeType = (this.activeType === 'DATE' ? 'MONTH' : 'YEAR')
        }
      });
    },
    // 渲染内容
    genPickerBody () {
      const children = this.activeType === 'YEAR' ? [] :
        [
          this.genTableHeader(),
          this.activeType === 'DATE' ? this.genDateTable() : this.genMonthTable()
        ];

      return this.$createElement('div', {
        key: this.activeType
      }, children);
    },
    // 渲染日期
    genDateTable () {
      return this.$createElement(IVueDatePickerDate, {
        props: {
          tableDate: `${this.tableYear}-${Pad(this.tableMonth + 1)}`,
          value: this.value,
          locale: this.locale,
          firstDayOfWeek: this.firstDayOfWeek
        },
        on: {
          input: this.dateClick
        }
      });
    },
    // 渲染月
    genMonthTable () {
      return this.$createElement(IVueDatePickerMonth, {
        props: {
          tableDate: `${this.tableYear}`,
          locale: this.locale,
          value: this.selectedMonths
        },
        on: {
          input: this.monthClick
        }
      });
    },
    // 设置input值
    setInputDate () {
      if (this.computedValue) {
        const computedValue = this.computedValue.split('-')
        this.inputYear = parseInt(computedValue[0], 10);
      }
    },
    // Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
    // 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
    sanitizeDateString (dateString, type) {
      const [year, month = 1, date = 1] = dateString.split('-');

      return `${year}-${Pad(month)}-${Pad(date)}`.substr(0, { date: 10, month: 7, year: 4 }[type]);
    },
    // 日期点击事件
    dateClick (value) {
      this.inputYear = parseInt(value.split('-')[0], 10);
      this.inputMonth = parseInt(value.split('-')[1], 10) - 1;
      this.inputDay = parseInt(value.split('-')[2], 10);

      this.emitInput(this.inputDate);
    },
    // 月期点击事件
    monthClick (value) {
      this.inputYear = parseInt(value.split('-')[0], 10);
      this.inputMonth = parseInt(value.split('-')[1], 10) - 1;

      if (this.type === 'date') {
        this.tableDate = value;
        this.activeType = 'DATE';


        // this.$emit('input', this.inputDate);

      }
      else {
        this.emitInput(this.inputDate);
      }

    }
  },
  render () {
    return this.genPicker();
  }
}
</script>
