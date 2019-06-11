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
        /*
        * 指定当前是否开启，可以使用 v-model 双向绑定数据
        *
        * @type {String,Number,Boolean}
        */
        value: {
            type: [String, Number, Boolean],
            default: null
        },
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
        placement: {
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
        /**
         * 一直显示
         *
         * @type {Boolean}
         */
        always: {
            type: Boolean,
            default: false
        },
        /**
         * 内容最大宽度
         *
         * @type {String, Number}
         */
        maxWidth: {
            type: [String, Number]
        }
    },
    data () {
        return {
            prefixCls: prefixCls,
            /*
            * 当前状态
            *
            * @type {String,Number,Boolean}
            */
            currentValue: this.value
        }
    },
    mounted () {
        if (this.always) {
            this.updatePopper();
        }
    },
    computed: {
        innerStyles () {
            const styles = {};
            if (this.maxWidth) {
                styles['max-width'] = `${this.maxWidth}px`;
            }

            return styles;
        },
        // 修改v-model
        inputValue: {
            get () {
                return this.currentValue
            },
            set (val) {
                this.currentValue = val;

                this.$emit('input', val);
            }
        }
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
            const { rounded, color, content, arrow, setBackgroundColor, genPopperArrow, visible, always, innerStyles, maxWidth, currentValue } = this;

            let tooltipAttrs = {
                staticClass: `${prefixCls}-popper`,
                ref: 'popper',
                directives: [{
                    name: 'show',
                    value: currentValue !== null ? currentValue : (visible || always)
                }]
            }

            const slotsContent = this.$createElement('div', setBackgroundColor(color, {
                staticClass: `${prefixCls}-inner`,
                class: {
                    [`${prefixCls}-rounded`]: rounded,
                    [`${prefixCls}-inner-width`]: !!this.maxWidth
                },
                style: innerStyles
            }), [
                    this.$slots.content || content
                ]);

            return this.$createElement('transition', {
                props: {
                    name: 'fade-tooltip',
                    appear: true
                }
            }, [
                    this.$createElement('div',
                        tooltipAttrs,
                        [
                            arrow ? genPopperArrow() : null,
                            slotsContent
                        ]
                    )
                ]
            );
        },
        // 显示提示
        handleShowPopper () {
            if(this.currentValue !== null){
                return;
            }

            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.visible = true;
            }, this.delay);
        },
        // 隐藏提示
        handleClosePopper () {
            if(this.currentValue !== null){
                return;
            }

            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.visible = false;
                }, this.delay);
            }
        }
    },
    watch: {
        value (value) {
            this.currentValue = value;
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
