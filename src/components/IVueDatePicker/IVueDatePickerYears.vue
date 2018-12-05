<script>
import CreateNativeLocaleFormatter from '../../utils/CreateNativeLocaleFormatter';
import Colorable from '../../utils/mixins/Colorable';

const prefixCls = 'ivue-date-picker-years';

export default {
  name: 'IVueDatePickerYears',
  mixins: [Colorable],
  props: {
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
    * 最小年份或月份
    *
    * @type{String}
    */
    min: String,
    /*
    * 最大年份或月份
    *
    * @type{String}
    */
    max: String,
    /*
    * 日期 时间
    *
    * @type{String}
    */
    value: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    formatter () {
      return CreateNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 });
    }
  },
  mounted () {
    const activeItem = this.$el.getElementsByClassName('active')[0];

    if (activeItem) {
      this.$el.scrollTop = activeItem.offsetTop - this.$el.offsetHeight / 2 + activeItem.offsetHeight / 2
    } else {
      this.$el.scrollTop = this.$el.scrollHeight / 2 - this.$el.offsetHeight / 2
    }

  },
  methods: {
    genYearItem (year) {
      const formatter = this.formatter(`${year}`);
      // 是否选择当前项
      const active = parseInt(this.value, 10) === year;
      const color = active && (this.color || 'primary');

      return this.$createElement('li', this.setTextColor(color, {
        key: year,
        'class': { active },
        on: {
          click: () => this.$emit('input', year)
        }
      }), formatter);
    },
    // 年份选项
    genYearItems () {
      const children = [];
      const selectYear = this.value ? parseInt(this.value, 10) : new Date().getFullYear();
      const maxYear = this.max ? parseInt(this.max, 10) : (selectYear + 100);
      const minYear = Math.min(maxYear, this.min ? parseInt(this.min, 10) : (selectYear - 100));

      for (let year = maxYear; year >= minYear; year--) {
        children.push(this.genYearItem(year));
      }

      return children;
    }
  },
  render () {
    return this.$createElement('ul', {
      staticClass: prefixCls
    }, this.genYearItems());
  }
}
</script>