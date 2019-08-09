
<script>
import Colorable from '../../utils/mixins/colorable';
import { findComponentUpward } from '../../utils/assist.js';

const prefixCls = 'ivue-radio';

export default {
    name: prefixCls,
    mixins: [Colorable],
    props: {
        /**
         * value (v-model)
         *
         * @type {String, Number, Boolean}
         */
        value: {
            type: [String, Number, Boolean],
            default: false
        },
        /**
         * 激活的值
         *
         * @type {String, Number, Boolean}
         */
        trueValue: {
            type: [String, Number, Boolean],
            default: true
        },
        /**
         * 未激活的值
         *
         * @type {String, Number, Boolean}
         */
        falseValue: {
            type: [String, Number, Boolean],
            default: false
        },
        /**
         * 文字颜色
         *
         * @type {String}
         */
        textColor: {
            type: String,
            default: ''
        },
        /**
         * 文字
         *
         * @type {String,Number}
         */
        label: {
            type: [String, Number]
        },
        /**
         * 是否禁用
         *
         * @type {Boolean}
         */
        disabled: {
            type: Boolean
        },
        /**
         * name 属性
         *
         * @type {String}
         */
        name: {
            type: String
        }
    },
    data () {
        return {
            /**
             * 当前的值
             *
             * @type {String, Number, Boolean}
             */
            currentValue: this.value,
            /**
             * 查找父节点
             *
             * @type {Array}
             */
            parent: findComponentUpward(this, 'ivue-radio-group'),
            /**
             * 是否是组合
             *
             * @type {Boolean}
             */
            isGroup: false,
            /**
             * 组件名称
             *
             * @type {String}
             */
            groupName: this.name,
            /**
             * input 焦点
             *
             * @type {Boolean}
             */
            focusInner: false
        }
    },
    mounted () {
        if (this.parent) {
            this.isGroup = true;

            if (this.name && this.name !== this.parent.name) {
                /* eslint-disable no-console */
                if (console.warn) {
                    console.warn('Name does not match Radio Group name.');
                }
            }
            else {
                this.groupName = this.parent.name
            }
        }

        // 是否是一个组合
        if (this.isGroup) {
            this.parent.updateValue();
        }
        else {
            this.updateValue();
        }
    },
    computed: {
        // 外层
        wrapperClass () {
            return [
                `${prefixCls}-wrapper`,
                {
                    [`${prefixCls}-wrapper-disabled`]: this.disabled
                }
            ]
        },
        // 圆点外层
        radioClass () {
            return {
                [`${prefixCls}`]: true,
                [`${prefixCls}-checked`]: this.currentValue,
                [`${prefixCls}-disabled`]: this.disabled
            }
        },
        // 圆点
        innerClass () {
            return [
                `${prefixCls}-inner`,
                {
                    [`${prefixCls}-focus`]: this.focusInner
                }
            ]
        },
        // 输入框
        inputClass () {
            return `${prefixCls}-input`;
        }
    },
    methods: {
        genRadio (h) {
            const {
                radioClass,
                innerClass,
                inputClass,
                currentValue,
                handleChange,
                groupName,
                handleFocus,
                handleBlur
            } = this;

            return h('span', this.setTextColor(this.color, {
                class: radioClass
            }), [
                    h('span', {
                        class: innerClass
                    }),
                    h('input', {
                        class: inputClass,
                        attrs: {
                            type: 'radio',
                            checked: currentValue,
                            name: groupName
                        },
                        on: {
                            change: handleChange,
                            focus: handleFocus,
                            blur: handleBlur
                        },
                    }),

                ])
        },
        // 获取焦点
        handleFocus () {
            this.focusInner = true;
        },
        // 失去焦点
        handleBlur () {
            this.focusInner = false;
        },
        // 改变
        handleChange (event) {
            if (this.disabled) {
                return false
            }

            // radio 改变
            const checked = event.target.checked;

            this.currentValue = checked;

            const value = checked ? this.trueValue : this.falseValue;
            this.$emit('input', value);

            if (this.isGroup) {
                if (this.label !== undefined) {
                    this.parent.handleChange({
                        value: this.label,
                        checked: this.value
                    })
                }
            }
            else {
                this.$emit('on-change', value);
            }
        },
        // 更新 value
        updateValue () {
            this.currentValue = this.value === this.trueValue;
        }
    },
    watch: {
        // 监听 value
        value (value) {
            if (value === this.trueValue || value === this.falseValue) {
                this.updateValue();
            } else {
                throw 'Value should be trueValue or falseValue.';
            }
        }
    },
    render (h) {
        return h('label', {
            class: this.wrapperClass,
        }, [
                this.genRadio(h),
                h('span', this.setTextColor(this.textColor, {}), [this.$slots.default || this.label])
            ])
    }
}
</script>
