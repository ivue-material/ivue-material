<script>
import { oneOf } from '../../utils/assist';
import Colorable from '../../utils/mixins/colorable';
import ripple from '../../utils/directives/ripple';
import touch from '../../utils/directives/touch';

const prefixCls = 'ivue-switch';

function isCssColor (color) {
    return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
}

export default {
    name: prefixCls,
    mixins: [Colorable],
    directives: {
        ripple
    },
    props: {
        /**
         * 浮雕按钮
         *
         * @type {Boolean}
         */
        emboss: {
            type: Boolean,
            default: false
        },
        /**
         * 按钮颜色
         *
         * @type {String}
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * 是否禁用开关
         *
         * @type {Boolean}
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * 加载中的开关
         *
         * @type {Boolean}
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * 进度条颜色
         *
         * @type {String}
         */
        loadingColor: {
            type: String,
            default: ''
        },
        /**
         * 选中时的值
         *
         * @type {String,Number,Boolean}
         */
        trueValue: {
            type: [String, Number, Boolean],
            default: true
        },
        /**
         * 没有选中时的值
         *
         * @type {String,Number,Boolean}
         */
        falseValue: {
            type: [String, Number, Boolean],
            default: false
        },
        /**
         * 指定当前是否开启，可以使用 v-model 双向绑定数据
         *
         * @type {String,Number,Boolean}
         */
        value: {
            type: [String, Number, Boolean],
            default: false
        },
        /**
         * 开关的尺寸，可选值为large、small、default或者不写。建议如果使用了2个汉字的文字，使用 large
         *
         * @type {String,Number,Boolean}
         */
        size: {
            type: String,
            validator (value) {
                return oneOf(value, ['large', 'small', 'default'])
            },
            default () {
                return !this.$Ivue || this.$Ivue.size === '' ? 'default' : this.$Ivue.size
            }
        }
    },
    data () {
        return {
            /**
             * 当前选择状态
             *
             * @type {String,Number,Boolean}
             */
            currentValue: this.value
        }
    },
    computed: {
        // 浮雕样式
        embossClass () {
            return {
                [`${prefixCls}-emboss`]: true,
                [`${prefixCls}-emboss--disabled`]: this.disabled,
                [`${prefixCls}-emboss--${this.size}`]: this.size
            }
        },

        // 浮雕进度条
        embossTrackClass () {
            return [
                `${prefixCls}-emboss--track`,
                {
                    [`${prefixCls}-emboss--track__checked`]: this.currentValue === this.trueValue
                }
            ]
        },
        // 浮雕指示器
        embossThumbClass () {
            return [
                `${prefixCls}-emboss--thumb`,
                {
                    [`${prefixCls}-emboss--thumb__checked`]: this.currentValue === this.trueValue
                }
            ]
        },
        // 进度条样式
        embossLodingClass () {
            return {
                [`${prefixCls}-emboss--loading`]: this.loading

            }
        },
        // 浮雕ripple
        embossRippleClass () {
            return [
                `${prefixCls}-emboss--ripple`,
                {
                    [`${prefixCls}-emboss--ripple__checked`]: this.currentValue === this.trueValue
                }
            ]
        },
        // 外部样式
        wrapClasses () {
            // 是否开启浮雕
            if (this.emboss) {
                return {
                    [`${prefixCls}-emboss--wrapper`]: true,
                    [`${prefixCls}-emboss--disabled`]: this.disabled
                }
            }

            return {
                [`${prefixCls}`]: true,
                [`${prefixCls}-checked`]: this.currentValue === this.trueValue,
                [`${prefixCls}-disabled`]: this.disabled,
                [`${prefixCls}-loading`]: this.loading,
                [`${prefixCls}-${this.size}`]: this.size
            }
        },
        // 内部文字样式
        innerClasses () {
            return `${prefixCls}-inner`;
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
        },
        // 更新 ripple
        computedRipple () {
            if (this.rippleDisabled || this.disabled) {
                return false;
            }

            return {
                center: true
            };
        }
    },
    methods: {
        // 切换状态
        toggle (event) {
            if (event) {
                event.preventDefault();
            }

            if (this.disabled || this.loading) {
                return false;
            }

            const checked = this.currentValue === this.trueValue ? this.falseValue : this.trueValue;

            // 修改 v-modul
            this.inputValue = checked

            this.$emit('on-change', checked);
        },
        // 渲染内容
        genInner (h) {
            const {
                currentValue,
                trueValue,
                falseValue,
                innerClasses
            } = this;

            const name = currentValue === trueValue;
            const close = currentValue === falseValue;

            return h('span', {
                class: innerClasses,
            }, [
                    name ? this.$slots.open : close ? this.$slots.close : ''
                ]);
        },
        // 渲染浮雕
        genEmboss (h) {
            const {
                setTextColor,
                embossClass,
                color,
                currentValue,
                trueValue,
                embossTrackClass,
                embossThumbClass,
                embossRippleClass,
                computedRipple,
                embossLodingClass,
                loadingColor
            } = this;

            // 是否开启颜色
            const _color = currentValue === trueValue ? color : '';

            return h('div', setTextColor(_color, {
                class: embossClass
            }), [
                    h('span', { class: embossTrackClass }),
                    h('span', { class: embossThumbClass }, [
                        h('span', setTextColor(loadingColor, { class: embossLodingClass })),
                    ]),
                    h('span', {
                        class: embossRippleClass,
                        directives: [
                            {
                                name: 'ripple',
                                value: computedRipple
                            }
                        ]
                    })
                ]);
        }
    },
    watch: {
        value (value) {
            if (value !== this.trueValue && value !== this.falseValue) {
                throw 'Value should be trueValue or falseValue.';
            }

            this.currentValue = value;
        }
    },
    render (h) {
        const {
            setBackgroundColor,
            genInner,
            wrapClasses,
            currentValue,
            trueValue,
            color,
            toggle,
            emboss,
            genEmboss
        } = this;

        // 是否开启颜色
        const _color = currentValue === trueValue ? color : '';

        return h('div', setBackgroundColor(!emboss && _color, {
            class: wrapClasses,
            attrs: {
                tabindex: '0'
            },
            directives: [{
                name: 'touch',
                value: {
                    left: () => toggle(),
                    right: () => toggle()
                }
            }],
            on: {
                click: toggle

            }
        }), [
                emboss && genEmboss(h),
                genInner(h)
            ]);
    }
}
</script>
