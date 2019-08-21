<script>
import Colorable from '../../utils/mixins/colorable';
import { findComponentUpward } from '../../utils/assist.js';

const prefixCls = 'ivue-checkbox';

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
         * 不确定
         *
         * @type {Boolean}
         */
        indeterminate: {
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
             * input 焦点
             *
             * @type {Boolean}
             */
            focusInner: false,
            /**
             * 是否是组合
             *
             * @type {Boolean}
             */
            isGroup: false,
            /**
            * 查找父节点
            *
            * @type {Array}
            */
            parent: findComponentUpward(this, 'ivue-checkbox-group'),
            /**
             * 组合值列表
             *
             * @type {Array}
             */
            modelArray: [],
            checkedNames: ['123']
        }
    },
    mounted () {
        this.parent = findComponentUpward(this, 'ivue-checkbox-group');

        if (this.parent) {
            this.isGroup = true;
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
        // 外层样式
        wrapperClass () {
            return [
                `${prefixCls}-wrapper`,
                {
                    [`${prefixCls}-wrapper-checked`]: this.currentValue,
                    [`${prefixCls}-wrapper-disabled`]: this.disabled
                }
            ]
        },
        // 复选框外层
        checkBoxClass () {
            return {
                [`${prefixCls}`]: true,
                [`${prefixCls}-checked`]: this.currentValue,
                [`${prefixCls}-disabled`]: this.disabled,
                [`${prefixCls}-indeterminate`]: this.indeterminate
            }
        },
        // 复选框样式
        innerClass () {
            return [
                `${prefixCls}-inner`,
                {
                    [`${prefixCls}-focus`]: this.focusInner
                }
            ]
        },
        // input样式
        inputClass () {
            return [
                `${prefixCls}-input`,
            ]
        }
    },
    methods: {
        // 渲染 checkbox
        genCheckBox (h) {
            const { checkBoxClass, innerClass, setTextColor, genInput, genGroupInput, isGroup } = this;

            return h('span', setTextColor(this.color, {
                class: checkBoxClass
            }), [
                    h('span', {
                        class: innerClass
                    }),
                    // 是否开启了组合
                    isGroup ? genGroupInput(h) : genInput(h)
                ]);
        },
        // 渲染input
        genInput (h) {
            const {
                inputClass,
                name,
                disabled,
                currentValue,
                handleChange,
                handleFocus,
                handleBlur
            } = this;

            return h('input', {
                class: inputClass,
                attrs: {
                    type: 'checkbox',
                    name: name,
                    checked: currentValue,
                    disabled: disabled
                },
                on: {
                    change: handleChange,
                    focus: handleFocus,
                    blur: handleBlur
                }
            });
        },
        // 渲染组input
        genGroupInput (h) {
            const {
                inputClass,
                name,
                currentValue,
                handleChange,
                handleFocus,
                handleBlur,
                label
            } = this;

            return h('input', {
                class: inputClass,
                attrs: {
                    type: 'checkbox',
                    name: name,
                    checked: currentValue,
                },
                domProps: {
                    value: label
                },
                on: {
                    change: handleChange,
                    focus: handleFocus,
                    blur: handleBlur
                }
            });
        },
        // 获取焦点
        handleFocus () {
            this.focusInner = true;
        },
        // 失去焦点
        handleBlur () {
            this.focusInner = false;
        },
        // 更新 value
        updateValue () {
            this.currentValue = this.value === this.trueValue;
        },
        // 改变
        handleChange (event) {
            if (this.disabled) {
                return false;
            }

            // check 改变
            const checked = event.target.checked;

            this.currentValue = checked;

            const value = checked ? this.trueValue : this.falseValue;

            this.$emit('input', value);

            if (this.isGroup) {
                const value = event.target.value;
                const indexOf = this.modelArray.indexOf(value);

                if (indexOf > -1) {
                    this.modelArray.splice(indexOf, 1);

                }
                else {
                    this.modelArray.push(value);
                }

                this.parent.handleChange(this.modelArray);
            }
            else {
                this.$emit('on-change', value);
            }
        }
    },
    watch: {
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
                this.genCheckBox(h),
                h('span', this.setTextColor(this.textColor, {
                    class: `${prefixCls}-text`
                }), [this.$slots.default || this.label])
            ])
    }
}
</script>

<style lang="scss" scoped>
</style>
