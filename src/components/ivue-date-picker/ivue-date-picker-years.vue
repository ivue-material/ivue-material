<script>
import Colorable from '../../utils/mixins/colorable';
import DatePickerTable from '../../utils/mixins/date-picker-table';
import CreateNativeLocaleFormatter from '../../utils/create-native-locale-formatter';

const prefixCls = 'ivue-date-picker-years';

export default {
  name: prefixCls,
  mixins: [DatePickerTable, Colorable],
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
    },
    // 当前年份
    year: {
      type: [Number, String],
      default: ''
    }
  },
  computed: {
    formatter () {
      return CreateNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 });
    }
  },
  mounted () {
    // const activeItem = this.$el.getElementsByClassName('active')[0];

    // if (activeItem) {
    //   this.$el.scrollTop = activeItem.offsetTop - this.$el.offsetHeight / 2 + activeItem.offsetHeight / 2
    // } else {
    //   this.$el.scrollTop = this.$el.scrollHeight / 2 - this.$el.offsetHeight / 2
    // }

  },
  methods: {
    // genYearItem (year) {
    //   const formatter = this.formatter(`${year}`);
    //   // 是否选择当前项
    //   const active = parseInt(this.value, 10) === year;
    //   const color = active && (this.color || 'primary');

    //   return this.$createElement('li', this.setTextColor(color, {
    //     key: year,
    //     'class': { active },
    //     on: {
    //       click: () => this.$emit('input', year)
    //     }
    //   }), formatter);
    // },
    // // 年份选项
    // genYearItems () {
    //   const children = [];
    //   const selectYear = this.value ? parseInt(this.value, 10) : new Date().getFullYear();
    //   const maxYear = this.max ? parseInt(this.max, 10) : (selectYear + 100);
    //   const minYear = Math.min(maxYear, this.min ? parseInt(this.min, 10) : (selectYear - 100));

    //   for (let year = maxYear; year >= minYear; year--) {
    //     children.push(this.genYearItem(year));
    //   }

    //   return children;
    // },
    // 计算表日期
    calculateTableDate (value) {
      let _value = value;
      if (value > 0) {
        _value = value + 9
      }
      else {
        _value = value - 9
      }

      return `${parseInt(this.tableDate) + parseInt(_value)}`;
    },
    genTBody () {
      let children = [];
      // 一行3个
      const cols = Array(3).fill(null);
      // 4 行
      const rows = 12 / cols.length;

      // 开始年份
      let startYear = Math.floor(this.displayedYear / 10) * 10;

      for (let row = 0; row < rows; row++) {
        const tds = cols.map((_, col) => {
          const _number = row * cols.length + col;

          return this.$createElement('td', {
            key: this.formatter(`${startYear + _number}`)
          }, [
              this.genButton(`${startYear + _number}`)
            ]);
        });

        // 删除多余年份
        if (row === 3) {
          tds.splice(1);
        }

        children.push(this.$createElement('tr', {
          key: row
        }, tds));
      }

      return this.$createElement('tbody', children);

    }
  },
  render () {

    return this.genTable(`${prefixCls} ${prefixCls}--table`, [
      this.genTBody()
    ])
    // return this.$createElement('ul', {
    //   staticClass: prefixCls
    // }, this.genYearItems());
  }
}
</script>