<script>
import Colorable from '../../utils/mixins/colorable';
import IvueIcon from '../ivue-icon/ivue-icon';

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
        },
        /**
         * 正方形边框
         *
         * @type {Boolean}
         */
        square: {
            type: Boolean
        },
        /**
         * 是否可关闭
         *
         * @type {Boolean}
         */
        close: {
            type: Boolean
        },
        /**
         * v-modul
         *
         * @type {Boolean}
         */
        value: {
            type: Boolean,
            default: true
        },
        /**
         * 是否禁用
         *
         * @type {Boolean}
         */
        disabled: {
            type: Boolean,
        },
        /**
         * 关闭图标
         *
         * @type {String}
         */
        closeIcon: {
            type: String,
            default: 'cancel'
        }
    },
    computed: {
        classes () {
            return {
                [`${prefixCls}--disabled`]: this.disabled,
                [`${prefixCls}--outline`]: this.outline,
                [`${prefixCls}--square`]: this.square,
                [`${prefixCls}--close`]: this.close,
            }
        }
    },
    methods: {
        // 渲染内容
        getContent (h) {
            return h('span', {
                staticClass: `${prefixCls}-content`
            }, [
                    this.$slots.default,
                    this.close && this.getClose(h)
                ]);
        },
        // 渲染关闭按钮
        getClose (h) {
            const data = {
                staticClass: `${prefixCls}-close`,
                on: {
                    click: (event) => {
                        event.stopPropagation();

                        this.$emit('input', false)
                    }
                }
            }

            return h('div', data, [
                h(IvueIcon, [this.closeIcon])
            ])
        }
    },
    render (h) {
        const { setTextColor, color, textColor, outline, classes } = this;

        const data = this.setBackgroundColor(color, {
            staticClass: prefixCls,
            class: classes,
            attrs: {
                tabindex: this.disabled ? -1 : 0
            },
            directives: [{
                name: 'show',
                value: this.value
            }],
            on: this.$listeners
        });

        const _color = textColor || (outline && color);

        return h('span', setTextColor(_color, data), [this.getContent(h)]);
    }
}
</script>
