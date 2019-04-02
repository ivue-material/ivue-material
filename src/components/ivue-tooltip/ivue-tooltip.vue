<script>
import Colorable from '../../utils/mixins/colorable';
import { oneOf } from '../../utils/assist';

const prefixCls = 'ivue-tooltip';

export default {
    name: prefixCls,
    mixins: [Colorable],
    props: {
        /**
         * 提示的文字内容
         *
         * @type {String}
         */
        content: {
            type: String,
            default: ''
        },
        /**
         * 对齐位置
         *
         * @type {String}
         */
        direction: {
            type: String,
            validator (value) {
                return oneOf(value, ['top', 'bottom', 'left', 'right']);
            },
            default: 'bottom'
        },
        /**
         * 是否显示提示箭头
         *
         * @type {Boolean}
         */
        arrow: {
            type: Boolean
        },
        /**
         * 开启提示圆角
         *
         * @type {Boolean}
         */
        rounded: {
            type: Boolean
        }
    },
    data () {
        return {
            prefixCls: prefixCls
        }
    },
    methods: {
        // 渲染箭头
        genPopperArrow () {
            return this.$createElement('div', this.setTextColor(this.color, {
                staticClass: `${prefixCls}-popper--arrow`,
            }))
        }
    },
    render () {
        const { rounded, color, content, direction, arrow, setBackgroundColor, genPopperArrow } = this;

        let tooltipAttrs = {
            staticClass: prefixCls,
            class: {
                [`${prefixCls}-rounded`]: rounded
            },
            // 普通的 HTML 特性
            attrs: {
                'x-direction': direction
            },
        }

        return this.$createElement('div', setBackgroundColor(color, tooltipAttrs), [this.$slots.content || content, arrow ? genPopperArrow() : null]);
    }
}
</script>

<style scoped>
</style>
