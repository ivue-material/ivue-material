<script>
import Colorable from '../../utils/mixins/colorable';

const prefixCls = 'ivue-chip';

export default {
    name: prefixCls,
    mixins: [Colorable],
    methods: {
        // 渲染内容
        getContent (h) {
            return h('span', {
                staticClass: `${prefixCls}-content`
            }, [this.$slots.default]);
        }
    },
    render (h) {
        // 设置颜色
        const setColor = (!this.outline) ? this.setBackgroundColor : this.setTextColor;

        const data = {
            staticClass: prefixCls
        };


        return h('span', setColor(this.color, data), [this.getContent(h)]);
    }
}
</script>
