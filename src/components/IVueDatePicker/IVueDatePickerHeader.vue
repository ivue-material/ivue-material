<script>
import Colorable from '../../utils/mixins/Colorable';
import CreateNativeLocaleFormatter from '../../utils/CreateNativeLocaleFormatter';

const prefixCls = 'ivue-date-picker-header';

export default {
      name: 'ivue-date-picker-header',
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
                  default: 'zh-CN'
            }
      },
      computed: {
            formatter () {
                  if (String(this.value).split('-')[1]) {
                        return CreateNativeLocaleFormatter(this.locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }, { length: 7 })
                  } else {
                        return CreateNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 })
                  }
            }
      },
      methods: {
            genHeader () {
                  const color = this.color || 'accent--text';

                  const header = this.$createElement('strong', this.setTextColor(color, {
                        key: String(this.value),
                        on: {
                              click: () => this.$emit('toggle')
                        }
                  }), [this.$slots.default || this.formatter(String(this.value))]);

                  return this.$createElement('div', {
                        staticClass: `${prefixCls}--value`
                  }, [header])
            }
      },
      render () {
            return this.$createElement('div', {
                  staticClass: prefixCls
            }, [
                        this.genHeader()
                  ]);
      }
}
</script>