<script>
import Colorable from '../../utils/mixins/Colorable';

const prefixCls = 'ivue-picker';

export default {
      name: 'IVuePicker',
      mixins: [Colorable],
      methods: {
            // 渲染标题
            genTitle () {
                  return this.$createElement('div', this.setBackgroundColor(this.color || 'primary', {
                        staticClass: `${prefixCls}-title`
                  }), this.$slots.title);
            }
      },
      render (h) {
            return h('div', {
                  staticClass: `${prefixCls} ivue-card`
            }, [
                        this.$slots.title ? this.genTitle() : null
                  ]);
      }
}     
</script>
