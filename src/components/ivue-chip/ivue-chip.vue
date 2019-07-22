<script>
import Colorable from '../../utils/mixins/colorable';

const prefixCls = 'ivue-chip';

export default {
    name: prefixCls,
    mixins: [Colorable],
    props: {
        /**
         * 字体颜色
         *
         * @type {String}
         */
        textColor: {
            type: String
        }
    },
    methods: {
        // 渲染内容
        getContent (h) {
            return h('span', {
                staticClass: `${prefixCls}-content`
            }, [this.$slots.default]);
        }
    },
    render (h) {
        const { setTextColor, color, textColor } = this;

        // 设置颜色
        // const setColor = (!this.outline) ? this.setBackgroundColor : setTextColor;

        const data = this.setBackgroundColor(color, {
            staticClass: prefixCls,
            attrs: {
                tabindex: 0
            },
            on: this.$listeners
        });

        const _color = textColor || color;

        return h('span', setTextColor(_color, data), [this.getContent(h)]);
    }
}
</script>
