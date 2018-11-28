<script>
import DatePickerTable from '../../utils/mixins/DatePickerTable';
import CreateNativeLocaleFormatter from '../../utils/CreateNativeLocaleFormatter';
import Pad from '../../utils/Pad';
import { createRange } from '../../utils/Helpers';

const prefixCls = 'ivue-date-picker-date';

export default {
  mixins: [DatePickerTable],
  props: {
    /*
    * 一周的第一天
    *
    * @type{String,Number}
    */
    firstDayOfWeek: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    // 格式化每周日期
    weekDayFormatter () {
      return CreateNativeLocaleFormatter(this.locale, { weekday: 'narrow', timeZone: 'UTC' });
    },
    //  每周日期
    weekDays () {
      const first = parseInt(this.firstDayOfWeek, 10);

      return this.weekDayFormatter ?
        // 2017-01-15 is Sunday
        createRange(7).map((i) => this.weekDayFormatter(`2017-01-${first + i + 15}`)) :
        createRange(7).map((i) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(i + first) % 7]);
    },
    // 日期格式
    formatter () {
      return CreateNativeLocaleFormatter(this.locale, { day: 'numeric', timeZone: 'UTC' }, { start: 0, length: 2 });
    }
  },
  methods: {
    // 日期头部
    genTHead () {
      const days = this.weekDays.map((day) => this.$createElement('th', day));


      return this.$createElement('thead', this.genTR(days));
    },
    // 日期
    genTBody () {
      // 节点
      const children = [];
      // 获取当前月份天数
      const daysInMonth = new Date(this.displayedYear, this.displayedMonth + 1, 0).getDate();

      // 第一行日期数
      let day = this.weekDaysBeforeFirstDayOfTheMonth();
      // 行数
      let rows = [];

      while (day--) {
        rows.push(this.$createElement('td'));
      }

      for (day = 1; day <= daysInMonth; day++) {
        const date = `${this.displayedYear}-${Pad(this.displayedMonth + 1)}-${Pad(day)}`;

        rows.push(this.$createElement('td', [
          this.genButton(date)
        ]));

        // 一行7个      
        if (rows.length % 7 === 0) {
          children.push(this.genTR(rows));

          rows = [];
        }
      }

      if (rows.length) {
        children.push(this.genTR(rows));
      }

      return this.$createElement('tbody', children);
    },
    genTR (children) {
      return [this.$createElement('tr', children)];
    },
    // 返回从firstDayOfWeek到当月第一天的天数
    weekDaysBeforeFirstDayOfTheMonth () {
      // 本月的第一天
      const firstDayOfTheMonth = new Date(`${this.displayedYear}-${this.displayedMonth + 1}-01T00:00:00+00:00`);

      const weekDay = firstDayOfTheMonth.getUTCDay();

      return (weekDay - parseInt(this.firstDayOfWeek) + 7) % 7;
    }
  },
  render () {
    return this.genTable(`${prefixCls} ${prefixCls}-table`, [
      this.genTHead(),
      this.genTBody()
    ])
  }
}     
</script>
