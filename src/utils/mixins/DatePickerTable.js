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
            }
      },
      methods: {
            genButtonClasses (isSelected) {
                  return {
                        'ivue-button--selected': isSelected,
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
                  const isSelected = value === this.value || (Array.isArray(this.value) && this.value.indexOf(value) !== -1);

                  return this.$createElement('button', {
                        staticClass: `ivue-button ${staticClass}`,
                        class: this.genButtonClasses(isSelected),
                        on: {
                              click: () => this.$emit('input', value)
                        }
                  }, this.formatter(value));
            }
      },
      watch: {
            tableDate (newVal, oldVal) {
                  this.isReversing = newVal < oldVal;
            }
      }
}