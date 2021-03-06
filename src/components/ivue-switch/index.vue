<script lang="ts">
import {
    defineComponent,
    h,
    PropType,
    reactive,
    computed,
    watch,
    withDirectives,
    resolveDirective
} from 'vue';


import { oneOf } from '../../utils/assist';
import Colorable from '../../utils/mixins/colorable';
import ripple from '../../utils/directives/ripple';
import touch from '../../utils/directives/touch';

type Size = 'large' | 'small' | 'default';

const prefixCls = 'ivue-switch';

export default defineComponent({
    name: prefixCls,
    mixins: [Colorable],
    emits: ['on-change', 'update:modelValue'],
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
         * 按钮颜色
         *
         * @type {String}
         */
        falseColor: {
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
        modelValue: {
            type: [String, Number, Boolean],
            default: false
        },
        /**
         * 开关的尺寸，可选值为large、small、default或者不写。建议如果使用了2个汉字的文字，使用 large
         *
         * @type {String,Number,Boolean}
         */
        size: {
            type: String as PropType<Size>,
            validator(value: string) {
                return oneOf(value, ['large', 'small', 'default'])
            },
            default() {
                return 'default'
            }
        },
        /**
         * 返回 Promise 可以阻止切换
         *
         * @type {Function}
         */
        beforeChange: Function
    },
    setup(props: any, { emit }) {

        // data
        const data = reactive({
            /**
             * 当前选择状态
             *
             * @type {String,Number,Boolean}
             */
            currentValue: props.modelValue,
        });

        // computed

        // 外部样式
        const wrapClasses = computed(() => {
            // 是否开启浮雕
            if (props.emboss) {
                return {
                    [`${prefixCls}-emboss--wrapper`]: true,
                    [`${prefixCls}-emboss--disabled`]: props.disabled
                }
            }

            return {
                [`${prefixCls}`]: true,
                [`${prefixCls}-false`]: props.falseColor !== '',
                [`${prefixCls}-checked`]: data.currentValue === props.trueValue,
                [`${prefixCls}-disabled`]: props.disabled,
                [`${prefixCls}-loading`]: props.loading,
                [`${prefixCls}-${props.size}`]: props.size
            }
        });

        // 浮雕样式
        const embossClass = computed(() => {
            return {
                [`${prefixCls}-emboss`]: true,
                [`${prefixCls}-emboss--disabled`]: props.disabled,
                [`${prefixCls}-emboss--${props.size}`]: props.size
            }
        });

        // 浮雕进度条
        const embossTrackClass = computed(() => {
            return [
                `${prefixCls}-emboss--track`,
                {
                    [`${prefixCls}-emboss--track__checked`]: data.currentValue === props.trueValue
                }
            ]
        });

        // 浮雕指示器
        const embossThumbClass = computed(() => {
            return [
                `${prefixCls}-emboss--thumb`,
                {
                    [`${prefixCls}-emboss--thumb__checked`]: data.currentValue === props.trueValue
                }
            ]
        });

        // 进度条样式
        const embossLodingClass = computed(() => {
            return {
                [`${prefixCls}-emboss--loading`]: props.loading
            }
        });

        // 浮雕ripple
        const embossRippleClass = computed(() => {
            return [
                `${prefixCls}-emboss--ripple`,
                {
                    [`${prefixCls}-emboss--ripple__checked`]: data.currentValue === props.trueValue
                }
            ]
        });

        // 设置背景颜色
        const setColor = computed(() => {
            let color = '';

            // 激活
            if (data.currentValue === props.trueValue) {
                color = props.color
            }

            if (data.currentValue === props.falseValue) {
                color = props.falseColor
            }

            return color
        });

        // 内部文字样式
        const innerClasses = computed(() => {
            return `${prefixCls}-inner`;
        });

        // 更新 ripple
        const computedRipple = computed(() => {
            if (props.rippleDisabled || props.disabled) {
                return false;
            }

            return {
                center: true
            };
        })

        // methods

        // 切换状态
        const toggle = (event) => {
            if (event) {
                event.preventDefault();
            }

            if (props.disabled || props.loading) {
                return false;
            }


            // 是否有 Promise
            if (!props.beforeChange) {
                return handleToggle();
            }

            const before = props.beforeChange();

            if (before && before.then) {
                before.then(() => {
                    handleToggle();
                });
            } else {
                handleToggle();
            }
        }

        const handleToggle = () => {
            const checked = data.currentValue === props.trueValue ? props.falseValue : props.trueValue;

            // 修改 v-modul
            data.currentValue = checked
            emit('update:modelValue', checked);

            emit('on-change', checked);
        }

        // 监听value
        watch(() => props.modelValue, (value) => {
            if (value !== props.trueValue && value !== props.falseValue) {
                throw 'Value should be trueValue or falseValue.';
            }

            data.currentValue = value;
        });

        return {
            // data
            data,

            // computed
            wrapClasses,
            embossClass,
            embossTrackClass,
            embossThumbClass,
            embossLodingClass,
            embossRippleClass,
            innerClasses,
            computedRipple,
            setColor,

            // methods
            toggle,
        }
    },
    render() {
        // 解析指令
        const rippleDirective = resolveDirective('ripple');
        const touchDirective = resolveDirective('touch');

        // 渲染浮雕
        const genEmboss = () => {
            return h('div', this.setTextColor(this.setColor, {
                class: this.embossClass
            }), [
                h('span', { class: this.embossTrackClass }),
                h('span', { class: this.embossThumbClass }, [
                    h('span', this.setTextColor(this.loadingColor, { class: this.embossLodingClass })),
                ]),
                withDirectives(h('span', {
                    class: this.embossRippleClass,
                }), [[rippleDirective, this.computedRipple]])
            ]);
        };

        // 渲染内容
        const genInner = () => {
            const name = this.data.currentValue === this.trueValue;
            const close = this.data.currentValue === this.falseValue;

            return h('span', {
                class: this.innerClasses,
            }, [
                name ? this.$slots.open && this.$slots.open() :
                    close ? this.$slots.close && this.$slots.close() : ''
            ]);
        }

        return withDirectives(h('div', this.setTextColor(!this.emboss && this.setColor, {
            class: this.wrapClasses,
            tabindex: '0',
            onClick: this.toggle
        }), [
            this.emboss && genEmboss(),
            genInner()
        ]), [[touchDirective, {
            left: () => this.toggle(),
            right: () => this.toggle()
        }]]);
    }
})
</script>
