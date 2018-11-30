<script>
import Colorable from '../../utils/mixins/Colorable';
import CreateNativeLocaleFormatter from '../../utils/CreateNativeLocaleFormatter';
import IVueButton from '../IVueButton/IVueButton';
import IVueIcon from '../IVueIcon/IVueIcon';
import MonthChange from '../../utils/MonthChange';

const prefixCls = 'ivue-date-picker-header';

export default {
  name: 'IVueDatePickerHeader',
  mixins: [Colorable],
  props: {
    /*
    * 日期 时间
    *
    * @type{String}
    */
    value: {
      type: [Number, String],
      required: true
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
    nextIcon: {
      type: String,
      default: 'chevron_right'
    },
    prevIcon: {
      type: String,
      default: 'chevron_left'
    },
    // 最小年份
    min: String,
    // 最大年份
    max: String
  },
  data () {
    return {
      // 是否使用反向动画
      isReversing: false
    }
  },
  computed: {
    formatter () {
      // 日期
      if (String(this.value).split('-')[1]) {
        return CreateNativeLocaleFormatter(this.locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }, { length: 7 })
      }
      // 年份
      else {
        return CreateNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 })
      }
    }
  },
  methods: {
    genBtn (change) {

      const disabled = (change < 0 && this.min && this.calculateChange(change) < this.min) ||
        (change > 0 && this.max && this.calculateChange(change) > this.max)


      return this.$createElement(IVueButton, {
        staticClass: 'ivue-icon-button',
        props: {
          disabled
        },
        nativeOn: {
          click: e => {
            e.stopPropagation();

            this.$emit('input', this.calculateChange(change))
          }
        }
      }, [
          this.$createElement(IVueIcon, change < 0 ? this.prevIcon : this.nextIcon)
        ]);
    },
    // 设置value值
    calculateChange (sign) {
      const [year, month] = String(this.value).split('-').map(v => 1 * v);

      if (!month) {
        return `${year + sign}`;
      }
      else {
        return MonthChange(String(this.value), sign);
      }
    },
    genHeader () {
      const color = this.color || 'accent--text';

      const header = this.$createElement('strong', this.setTextColor(color, {
        key: String(this.value),
        on: {
          click: () => this.$emit('toggle')
        }
      }), [this.$slots.default || this.formatter(String(this.value))]);

      const transition = this.$createElement('transition', {
        props: {
          name: this.isReversing ? `tab-reverse-transition` : `tab-transition`
        }
      }, [header])

      return this.$createElement('div', {
        staticClass: `${prefixCls}--value`
      }, [transition])
    }
  },
  watch: {
    value (newVal, oldVal) {
      this.isReversing = newVal < oldVal;
    }
  },
  render () {
    return this.$createElement('div', {
      staticClass: prefixCls
    }, [
        this.genBtn(-1),
        this.genHeader(),
        this.genBtn(1)
      ]);
  }
}
</script>
