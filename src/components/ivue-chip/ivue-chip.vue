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
        },
        /**
         * 显示轮廓
         *
         * @type {Boolean}
         */
        outline: {
            type: Boolean
        }
    },
    computed: {
        classes () {
            return {
                [`${prefixCls}--outline`]: this.outline
            }
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
        const { setTextColor, color, textColor, outline, classes } = this;

        const data = this.setBackgroundColor(color, {
            staticClass: prefixCls,
            class: classes,
            attrs: {
                tabindex: 0
            },
            on: this.$listeners
        });

        const _color = textColor || (outline && color);

        return h('span', setTextColor(_color, data), [this.getContent(h)]);
    }
}
</script>
