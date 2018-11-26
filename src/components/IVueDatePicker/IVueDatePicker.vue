<script>
import Picker from '../../utils/mixins/Picker';
import IVueDatePickerTitle from './IVueDatePickerTitle';
import IVueDatePickerHeader from './IVueDatePickerHeader';

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
                  default: 'zh-CN'
            },
            /*
            * 日期 时间
            *
            * @type{String}
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
      },
      data () {
            const now = new Date();

            return {
                  // 输入年份
                  inputYear: null,
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
            tableMonth(){
                  return this.tableDate.split('-')[1] - 1;
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
            }
      },
      methods: {
            // 渲染标题内容
            genPickerTitle () {
                  return this.$createElement(IVueDatePickerTitle, {
                        props: {
                              date: this.value ? this.formatters.titleDate(this.value) : '',
                              year: this.formatters.year(`${this.inputYear}`)
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
                        }
                  });
            },
            // 渲染内容
            genPickerBody () {
                  const children = [this.genTableHeader()];

                  return this.$createElement('div', {
                        key: this.activeType
                  }, children);
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
            }
      },
      render () {
            return this.genPicker();
      }
}
</script>
