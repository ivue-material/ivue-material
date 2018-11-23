<script>
import Picker from '../../utils/mixins/Picker';
import IVueDatePickerTitle from './IVueDatePickerTitle';
import CreateNativeLocaleFormatter from '../../utils/CreateNativeLocaleFormatter';

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
            locale: {
                  type: String,
                  default: 'zh-CN'
            },
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
            return {
                  // 输入年份
                  inputYear: '2018'
            }
      },
      computed: {
            // 格式化日期
            formatters () {
                  return {
                        // UTC时区
                        year: this.yearFormat || CreateNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 }),
                        titleDate: this.titleDateFormat || this.defaultTitleDateFormatter

                  }
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
            }
      },
      render () {
            return this.genPicker();
      }
}
</script>
