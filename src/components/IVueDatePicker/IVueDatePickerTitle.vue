<script>
import PickerButton from '../../utils/mixins/PickerButton';

const prefixCls = 'ivue-date-picker-title';

export default {
  name: 'IVueDatePickerTitle',
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
  data () {
    return {
      isReversing: false
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
      return this.$createElement('transition', {
        props: {
          name: this.isReversing ? 'picker-reverse-transition' : 'picker-transition'
        }
      }, [
          this.$createElement('div', {
            domProps: { innerHTML: this.date || '&nbsp;' },
            key: this.value
          })
        ])
    },
    // 渲染日期
    genTitleDate () {
      return this.genPickerButton('selectingYear', false, this.genTitleText(), false, `${prefixCls}--date`);
    }
  },
  watch: {
    value (val, prev) {
      this.isReversing = val < prev;
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
