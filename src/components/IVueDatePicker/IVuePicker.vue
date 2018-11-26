<script>
import Colorable from '../../utils/mixins/Colorable';

const prefixCls = 'ivue-picker';

export default {
      name: 'IVuePicker',
      mixins: [Colorable],
      props: {
            /*
            * 强制100％宽度
            * 
            * @type {Boolean}
            */
            fullWidth: Boolean,
            /*
            * 选择框宽度
            * 
            * @type {Boolean}
            */
            width: {
                  type: [Number, String],
                  default: 290,
                  validator: value => parseInt(value, 10) > 0
            }
      },
      methods: {
            // 渲染标题
            genTitle () {
                  return this.$createElement('div', this.setBackgroundColor(this.color || 'primary', {
                        staticClass: `${prefixCls}-title`
                  }), this.$slots.title);
            },
            // 渲染日期选择body
            genBody () {
                  return this.$createElement('div', {
                        staticClass: 'ivue-picker-body',
                        style: this.fullWidth ? undefined : {
                              width: `${this.width}px`
                        }
                  }, this.$slots.default);
            },
      },
      render (h) {
            return h('div', {
                  staticClass: `${prefixCls} ivue-card`,
                  style: this.fullWidth ? { display: 'block' } : { display: 'inline-flex' }

            }, [
                        this.$slots.title ? this.genTitle() : null,
                        this.genBody()
                  ]);
      }
}     
</script>
