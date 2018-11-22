<script>
import PickerButton from '../../utils/mixins/PickerButton';

const prefixCls = 'ivue-date-picker-title';

export default {
      mixins: [PickerButton],
      props: {
            // 选择年份
            selectingYear: Boolean,
            // 当前年份
            year: {
                  type: [Number, String],
                  default: ''
            }
      },
      methods: {
            // 获取年份
            getYearBtn () {
                  return this.genPickerButton('selectingYear', true, [
                        this.year
                  ],false, `${prefixCls}--year`);
            }
      },
      render (h) {
            return h('div', {
                  staticClass: prefixCls
            },[
                  this.getYearBtn()
            ])
      }
}
</script>
