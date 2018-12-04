import isDateAllowed from '../IsDateAllowed';

const prefixCls = 'ivue-date-picker-date';

export default {
      props: {
            /*
            * 日期 时间
            *
            * @type{String,Array}
            */
            value: [String, Array],
            /*
            * 年月
            *
            * @type{String}
            */
            tableDate: {
                  type: String,
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
            * 设置允许选择日期函数
            *
            * @type{Function}
            */
            allowedDates: Function,
            /*
            * 当前日期
            *
            * @type{String}
            */
            current: String
      },
      data () {
            return {
                  isReversing: false
            }
      },
      computed: {
            // 显示月份
            displayedMonth () {
                  return this.tableDate.split('-')[1] - 1;
            },
            // 显示的年份
            displayedYear () {
                  return this.tableDate.split('-')[0] * 1;
            }
      },
      methods: {
            genButtonClasses (isSelected, isCurrent) {
                  return {
                        'ivue-button--selected': isSelected,
                        'ivue-button--current': isCurrent,
                  }
            },
            genTable (staticClass, children) {
                  const transition = this.$createElement('transition', {
                        props: {
                              name: this.isReversing ? `tab-reverse-transition` : `tab-transition`
                        }
                  }, [this.$createElement('table', {
                        key: this.tableDate
                  }, [children])])

                  return this.$createElement('div', {
                        staticClass
                  }, [transition])
            },
            // 按钮
            genButton (value, staticClass) {
                  // 是否选中
                  const isSelected = value === this.value || (Array.isArray(this.value) && this.value.indexOf(value) !== -1);
                  // 是否允许选择
                  const isAllowed = isDateAllowed(value, this.min, this.max, this.allowedDates);
                  // 是否有显示当前日期
                  const isCurrent = value === this.current;

                  const setColor = isSelected ? this.setBackgroundColor : this.setTextColor

                  const color = (isSelected || isCurrent) && (this.color || 'primary');

                  return this.$createElement('button', setColor(color, {
                        staticClass: `ivue-button ${staticClass}`,
                        class: this.genButtonClasses(isSelected, isCurrent),
                        domProps: {
                              disabled: !isAllowed
                        },
                        on: {
                              click: () => this.$emit('input', value)
                        }
                  }), this.formatter(value));
            }
      },
      watch: {
            tableDate (newVal, oldVal) {
                  this.isReversing = newVal < oldVal;
            }
      }
}