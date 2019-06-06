<script>
import Colorable from '../../utils/mixins/colorable';
import { getFirstComponentChild } from '../../utils/helpers';
import { oneOf } from '../../utils/assist';
import Popper from './popper';

const prefixCls = 'ivue-tooltip';

export default {
    name: prefixCls,
    mixins: [Colorable, Popper],
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
        },
        /**
         * 提示显示延迟时间
         *
         * @type {Number}
         */
        delay: {
            type: Number,
            default: 100
        },
    },
    data () {
        return {
            prefixCls: prefixCls
        }
    },
    mounted () {
        requestAnimationFrame(() => {
            this.updatePopper();
        })
    },
    methods: {
        // 渲染箭头
        genPopperArrow () {
            return this.$createElement('div', this.setTextColor(this.color, {
                staticClass: `${prefixCls}-popper--arrow`,
            }))
        },
        // 渲染内容
        genReference () {
            return this.$createElement('div',
                {
                    staticClass: `${prefixCls}-reference`,
                    ref: 'reference'
                }, [getFirstComponentChild(this.$slots.default)])
        },
        // 渲染提示
        genPopper () {
            const { rounded, color, content, direction, arrow, setBackgroundColor, genPopperArrow } = this;

            let tooltipAttrs = {
                staticClass: `${prefixCls}-popper`,
                class: {
                    [`${prefixCls}-rounded`]: rounded
                },
                // 普通的 HTML 特性
                attrs: {
                    'x-direction': direction
                },
                ref: 'popper',
                directives: [{
                    name: 'show',
                    value: this.visible
                }]
            }

            return this.$createElement('div',
                setBackgroundColor(color, tooltipAttrs),
                [this.$slots.content || content, arrow ? genPopperArrow() : null]
            )
        },
        // 显示提示
        handleShowPopper () {
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.visible = true;
            }, this.delay);
        },
        // 隐藏提示
        handleClosePopper () {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.visible = false;
                }, 100);
            }
        }
    },
    render () {
        return this.$createElement('div', {
            staticClass: prefixCls,
            on: {
                mouseenter: () => {
                    this.handleShowPopper()
                },
                mouseleave: () => {
                   this.handleClosePopper()
                }
            },
        }, [
                this.genReference(),
                this.genPopper()
            ]);
    }
}
</script>

<style scoped>
</style>
