import isDateAllowed from '../is-date-allowed';
import Touch from '../directives/touch';

const prefixCls = 'ivue-date-picker-date';

export default {
      directives: { Touch },
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
            current: String,
            readonly: Boolean,
            /*
            * 当前激活的type
            *
            * @type{String}
            */
            activeType: String,
            /*
            * 格式化函数
            *
            * @type{String}
            */
            format: {
                  type: Function,
                  default: null
            }
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
            },
            computedTransition () {
                  return this.isReversing ? `tab-reverse-transition` : `tab-transition`;
            }
      },
      methods: {
            touch (value) {
                  this.$emit('tableDate', this.calculateTableDate(value));
            },
            genButtonClasses (isSelected, isCurrent, isAllowed) {
                  return {
                        'ivue-button--selected': isSelected,
                        'ivue-button--current': isCurrent,
                        'ivue-button--readonly': (this.readonly && isSelected)
                  }
            },
            genTable (staticClass, children) {
                  const transition = this.$createElement('transition', {
                        props: {
                              name: this.computedTransition
                        }
                  }, [this.$createElement('table', {
                        key: this.tableDate
                  }, [children])])

                  return this.$createElement('div', {
                        staticClass,
                        directives: [
                              {
                                    name: 'touch',
                                    value: {
                                          left: e => (e.offsetX < -15) && this.touch(1),
                                          right: e => (e.offsetX > 15) && this.touch(-1)
                                    }
                              }
                        ]
                  }, [transition])
            },
            // 按钮
            genButton (value, staticClass) {
                  // 是否选中
                  const isSelected = this.activeType === 'YEAR' ? this.year === value : value === this.value || (Array.isArray(this.value) && this.value.indexOf(value) !== -1)
                  // 是否允许选择
                  const isAllowed = isDateAllowed(value, this.min, this.max, this.allowedDates);

                  // 是否有显示当前日期
                  let isCurrent;
                  if (this.activeType && this.current) {
                        isCurrent = this.activeType === 'YEAR' ? `${new Date().getFullYear()}` === value : null ||
                              this.activeType === 'MONTH' ? `${new Date().getFullYear()}-${new Date().getMonth() + 1}` === value : null;
                  }
                  else {
                        isCurrent = value === this.current;
                  }


                  const setColor = isSelected ? this.setBackgroundColor : this.setTextColor

                  const color = (isSelected || isCurrent) && (this.color || 'primary');

                  const _staticClass = staticClass ? staticClass : '';

                  return this.$createElement('button', setColor(color, {
                        staticClass: `ivue-button ${_staticClass}`,
                        class: this.genButtonClasses(isSelected, isCurrent, isAllowed),
                        domProps: {
                              disabled: !isAllowed
                        },
                        on: (this.disabled || !isAllowed) ? {} : {
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