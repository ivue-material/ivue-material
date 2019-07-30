
<script>
import Colorable from '../../utils/mixins/colorable';

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
        }
    },
    data () {
        return {
            currentValue: this.value
        }
    },
    mounted () {
        this.updateValue();
    },
    computed: {
        // 外层
        wrapperClass () {
            return [
                `${prefixCls}-wrapper`
            ]
        },
        // 圆点外层
        radioClass () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-checked`]: this.currentValue
                }
            ]
        },
        // 圆点
        innerClass () {
            return [
                `${prefixCls}-inner`
            ]
        },
        // 输入框
        inputClass () {
            return `${prefixCls}-input`;
        }
    },
    methods: {
        genRadio (h) {
            const { radioClass, innerClass, inputClass, currentValue, handleChange } = this;

            return h('span', {
                class: radioClass
            }, [
                    h('span', { class: innerClass }),
                    h('input', {
                        class: inputClass,
                        attrs: {
                            type: 'radio',
                            checked: currentValue
                        },
                        on: {
                            change: handleChange
                        },
                    }),

                ])
        },
        // 改变
        handleChange (event) {
            // radio 改变
            const checked = event.target.checked;

            this.currentValue = checked;

            const value = checked ? this.trueValue : this.falseValue;
            this.$emit('input', value);

            this.$emit('on-change', value);
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
                h('span', this.setTextColor(this.textColor, {}), [this.$slots.default])
            ])
    }
}
</script>
