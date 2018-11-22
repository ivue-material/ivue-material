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
            locale: {
                  type: String,
                  default: 'en-us'
            }
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
                        year: this.yearFormat || CreateNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 })
                  }
            }
      },
      methods: {
            // 渲染标题内容
            genPickerTitle () {
                  return this.$createElement(IVueDatePickerTitle, {
                        props: {
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
