<script>
import DatePickerTable from '../../utils/mixins/DatePickerTable';
import Colorable from '../../utils/mixins/Colorable';
import CreateNativeLocaleFormatter from '../../utils/CreateNativeLocaleFormatter';
import Pad from '../../utils/Pad';

const prefixCls = 'ivue-date-picker-month';

export default {
  name: 'IVueDatePickerMonth',
  mixins: [DatePickerTable, Colorable],
  computed: {
    formatter () {
      return CreateNativeLocaleFormatter(this.locale, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 });
    }
  },
  methods: {
    genTBody () {
      const children = [];
      // 一行3个
      const cols = Array(3).fill(null);
      // 4 行
      const rows = 12 / cols.length;

      for (let row = 0; row < rows; row++) {
        const tds = cols.map((_, col) => {

          // 月数
          const month = row * cols.length + col;

          return this.$createElement('td', {
            key: month
          }, [
              this.genButton(`${this.displayedYear}-${Pad(month + 1)}`)
            ]);
        });

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
  }
}
</script>
