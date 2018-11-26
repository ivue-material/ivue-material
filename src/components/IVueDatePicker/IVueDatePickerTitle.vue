<script>
import PickerButton from '../../utils/mixins/PickerButton';

const prefixCls = 'ivue-date-picker-title';

export default {
      name: 'ivue-date-picker-title',
      mixins: [PickerButton],
      props: {
            // 选择年份
            selectingYear: Boolean,
            // 当前年份
            year: {
                  type: [Number, String],
                  default: ''
            },
            date: {
                  type: String,
                  default: ''
            },
            value: {
                  type: String
            }
      },
      methods: {
            // 渲染年份
            genYearBtn () {
                  return this.genPickerButton('selectingYear', true, [
                        this.year
                  ], false, `${prefixCls}--year`);
            },
            genTitleText () {
                  return this.$createElement('div', {
                        domProps: { innerHTML: this.date || '&nbsp;' },
                        key: this.value
                  })
            },
            // 渲染日期
            genTitleDate () {
                  return this.genPickerButton('selectingYear', false, this.genTitleText(), false, `${prefixCls}--date`);
            }
      },
      render (h) {
            return h('div', {
                  staticClass: prefixCls
            }, [
                        this.genYearBtn(),
                        this.genTitleDate()
                  ])
      }
}
</script>
