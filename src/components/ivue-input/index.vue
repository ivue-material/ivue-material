<template>
    <div :class="wrapClasses">
        <template v-if="type !== 'textarea'">
            <!-- 前置内容，仅在 text 类型下有效 -->
            <div
                :class="[`${prefixCls}-group-prepend`, ...prependColor]"
                :style="prependStyle"
                v-if="prepend"
            >
                <slot name="prepend"></slot>
            </div>
            <!-- 输入框 -->
            <div :class="contentClass">
                <!-- 首部图标 -->
                <span :class="[`${prefixCls}-prefix`]" v-show="showPrefix">
                    <slot name="prefix">
                        <i class="ivue-icon">{{ prefix }}</i>
                    </slot>
                </span>

                <input
                    :class="inputClass"
                    :placeholder="placeholder"
                    :spellcheck="spellcheck"
                    :type="currentType"
                    :disabled="disabled"
                    :autocomplete="autocomplete"
                    :readonly="readonly"
                    :name="name"
                    :value="currentValue"
                    :autofocus="autofocus"
                    :number="number"
                    :id="id"
                    :maxlength="maxlength"
                    @keyup.enter="handleEnter"
                    @keyup="handleKeyup"
                    @keypress="handleKeypress"
                    @keydown="handleKeydown"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    ref="input"
                />

                <!-- 重置选择 -->
                <div
                    :class="[`${prefixCls}-icon`, `${prefixCls}-clear`]"
                    v-if="clearable && currentValue && !disabled"
                    @click.stop="handleClear"
                >
                    <ivue-icon
                        :class="[
                            `${prefixCls}-icon-clear`,
                            showSuffix ? 'is-suffix' : '',
                        ]"
                    >
                        {{ clearIcon }}
                    </ivue-icon>
                </div>
                <!-- 字数统计 -->
                <span :class="`${prefixCls}-word-count`" v-if="showWordLimit"
                    >{{ textLength }}/{{ upperLimit }}</span
                >
                <!-- 是否显示密码 -->
                <div
                    :class="[`${prefixCls}-suffix`, `${prefixCls}-password`]"
                    v-if="password"
                    @click="handleShowPassword"
                >
                    <i class="ivue-icon" v-if="showPassword">
                        {{ passwordIcon.on }}
                    </i>
                    <i class="ivue-icon" v-else>{{ passwordIcon.off }}</i>
                </div>
                <!-- 尾部图标 -->
                <span
                    :class="[`${prefixCls}-suffix`]"
                    v-if="showSuffix"
                    @click.stop="handleSuffix"
                >
                    <slot name="suffix">
                        <i class="ivue-icon">{{ suffix }}</i>
                    </slot>
                </span>
                <!-- 搜索型输入框 -->
                <template v-if="search && enterButton === false">
                    <i
                        :class="[`${prefixCls}-icon`, 'ivue-icon']"
                        @click="handleSearch"
                    >
                        search
                    </i>
                </template>
                <template v-else-if="search && enterButton">
                    <div
                        :class="[
                            `${prefixCls}-group-append`,
                            `${prefixCls}-search`,
                        ]"
                        @click="handleSearch"
                    >
                        <i :class="['ivue-icon']" v-if="enterButton === true">
                            search
                        </i>
                        <template v-else>{{ enterButton }}</template>
                    </div>
                </template>
            </div>
            <!-- 后置内容，仅在 text 类型下有效 -->
            <div
                :class="[`${prefixCls}-group-append`, ...appendColor]"
                :style="appendStyle"
                v-if="append"
            >
                <slot name="append"></slot>
            </div>
        </template>
        <template v-else>
            <textarea
                :id="id"
                :name="name"
                :disabled="disabled"
                :class="textareaClasses"
                :style="textareaStyles"
                :value="currentValue"
                :placeholder="placeholder"
                :autofocus="autofocus"
                :readonly="readonly"
                :rows="rows"
                :maxlength="maxlength"
                :spellcheck="spellcheck"
                @keyup.enter="handleEnter"
                @keyup="handleKeyup"
                @keypress="handleKeypress"
                @keydown="handleKeydown"
                @focus="handleFocus"
                @blur="handleBlur"
                @input="handleInput"
                ref="textarea"
            ></textarea>
        </template>
    </div>
</template>

<script lang='ts'>
import {
    PropType,
    ref,
    computed,
    defineComponent,
    nextTick,
    watch,
    onMounted
} from 'vue'

import { calcTextareaHeight } from '../../utils/calc-textarea-height';
import { oneOf } from '../../utils/assist';


function isCssColor(color) {
    return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
}

const prefixCls = 'ivue-input';

type Type = 'text' | 'textarea' | 'password' | 'url' | 'email' | 'date' | 'hidden';

type AutoComplete = 'on' | 'off';

type Size = 'small' | 'large' | 'default';

export default defineComponent({
    name: prefixCls,
    // 声明事件
    props: {
        /**
         * 绑定的值，可使用 v-model 双向绑定
         *
         * @type {String, Number}
         */
        modelValue: {
            type: [String, Number],
            default: ''
        },
        /**
         * 绑定的值，可使用 v-model 双向绑定
         *
         * @type {String, Number}
         */
        value: {
            type: [String, Number],
            default: ''
        },
        /*
        * 输入框类型，可选值为 text、password、textarea、url、email、date
        *
        * @type {String}
        */
        type: {
            type: String as PropType<Type>,
            validator(value: string) {
                return oneOf(value, ['text', 'textarea', 'password', 'url', 'email', 'date', 'hidden']);
            },
            default: 'text'
        },
        /**
         * 占位文本
         *
         * @type {String}
         */
        placeholder: {
            type: String,
            default: ''
        },
        /**
         * 原生的 spellcheck 属性
         *
         * @type {Boolean}
         */
        spellcheck: {
            type: Boolean,
            default: false
        },
        /**
         * 设置输入框为禁用状态
         *
         * @type {Boolean}
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * 原生的自动完成功能
         *
         * @type {String}
         */
        autocomplete: {
            type: String as PropType<AutoComplete>,
            validator(value: string) {
                return oneOf(value, ['on', 'off']);
            },
            default: 'off'
        },
        /**
         * 设置输入框为只读
         *
         * @type {Boolean}
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * 输入框name
         *
         * @type {String}
         */
        name: {
            type: String
        },
        /**
         * 最大输入长度
         *
         * @type {Number}
         */
        maxlength: {
            type: Number
        },
        /**
         * id
         *
         * @type {String}
         */
        id: {
            type: String
        },
        /**
         * 自动获取焦点
         *
         * @type {Boolean}
         */
        autofocus: {
            type: Boolean,
            default: false
        },
        /**
         * 将用户的输入转换为 Number 类型
         *
         * @type {Boolean}
         */
        number: {
            type: Boolean,
            default: false
        },
        /**
         * prepend前置内容背景颜色
         *
         * @type {String}
         */
        prependBgColor: {
            type: String,
            default: '#f8f8f9'
        },
        /**
        * append前后置内容背景颜色
        *
        * @type {String}
        */
        appendBgColor: {
            type: String,
            default: '#f8f8f9'
        },
        /**
         * 输入框头部图标
         *
         * @type {String}
         */
        prefix: {
            type: String,
            default: ''
        },
        /**
         * 输入框尾部图标
         *
         * @type {String}
         */
        suffix: {
            type: String,
            default: ''
        },
        /**
         * 输入框尺寸，可选值为large、small、default或者不设置
         *
         *
         * @type {String}
         */
        size: {
            type: String as PropType<Size>,
            validator(value: string) {
                return oneOf(value, ['small', 'large', 'default']);
            },
            default() {
                return 'default';
            }
        },
        /**
         * 是否显示清除按钮
         *
         * @type {Boolean}
         */
        clearable: {
            type: Boolean,
            default: false
        },
        /**
         * 输入框清除图标
         *
         * @type {String}
         */
        clearIcon: {
            type: String,
            default: 'cancel'
        },
        /**
         * 是否显示输入字数统计，可以配合 maxlength 使用
         *
         * @type {Boolean}
         */
        showWordLimit: {
            type: Boolean,
            default: false
        },
        /**
         * 是否显示切换密码图标
         *
         * @type {Boolean}
         */
        password: {
            type: Boolean,
            default: false
        },
        /**
         * 密码图标
         *
         * @type {Object}
         */
        passwordIcon: {
            type: Object,
            default: {
                on: 'visibility',
                off: 'visibility_off'
            }
        },
        /**
         * 是否显示为搜索型输入框
         *
         * @type {Boolean}
         */
        search: {
            type: Boolean,
            default: false
        },
        /**
         * 开启 search 时可用，是否有确认按钮，可设为按钮文字
         *
         * @type {Boolean, String}
         */
        enterButton: {
            type: [Boolean, String],
            default: false
        },
        /**
         * 文本域默认行数，仅在 textarea 类型下有效
         *
         * @type {Number}
         */
        rows: {
            type: Number,
            default: 2
        },
        /**
        * 自适应内容高度，仅在 textarea 类型下有效
        *  指定最小行数和最大行数
        *
        * @type {String}
        */
        autoHeight: {
            type: [Boolean, Object],
            default: false
        },
        /**
         * 是否显示边框
         *
         * @type {Boolean}
         */
        border: {
            type: Boolean,
            default: true
        }
    },
    // 组合式 API
    setup(props: any, { emit }) {
        // 当前输入值
        const currentValue = ref(props.modelValue || props.value);

        // 文本框样式
        const textareaStyles = ref({});

        // 显示密码
        const showPassword = ref(false);

        // ref = textarea
        const textarea = ref(null);
        // ref = input
        const input = ref(null);

        // computed

        // 输入的内容
        const nativeInputValue = computed(() => {
            return props.modelValue || props.value
        });

        // 输入上限
        const upperLimit = computed(() => {
            return props.maxlength;
        });

        // 监听输入的长度
        const textLength = computed(() => {
            if (typeof currentValue.value === 'number') {
                return String(currentValue.value).length;
            }

            return (currentValue.value || '').length;
        });

        // 获取当前输入框type
        const currentType = computed(() => {
            let type = props.type;

            if (type === 'password' && props.password && showPassword.value) {
                type = 'text';
            }

            return type;
        });

        // methods
        // 按下回车键时触发
        const handleEnter = (event) => {
            emit('on-enter', event);
        }

        // 原生的 keyup 事件
        const handleKeyup = (event) => {
            emit('on-keyup', event);
        }

        // 原生的 keypress 事件
        const handleKeypress = (event) => {
            emit('on-keypress', event);
        }

        // 原生的 keydown 事件
        const handleKeydown = (event) => {
            emit('on-keydown', event);
        }

        // 尾部图标点击事件
        const handleSuffix = (event) => {
            emit('on-suffix', event);
        }

        // 更新value
        const setNativeInputValue = () => {
            if (props.modelValue === currentValue.value) {
                return;
            }

            currentValue.value = nativeInputValue.value
        }

        // 设置当前值
        const setCurrentValue = (value) => {
            if (value === currentValue.value) {
                return;
            }

            nextTick(() => {
                resizeTextarea();
            });

            currentValue.value = value;

            // ensure native input value is controlled
            // see: https://github.com/ElemeFE/element/issues/12850
            nextTick(() => {
                setNativeInputValue();
            });
        }

        // 自适应内容高度，仅在 textarea 类型下有效，可传入对象，
        // 如 { minRows: 2, maxRows: 6 }
        const resizeTextarea = () => {
            const autoHeight = props.autoHeight;

            // 是否是 textarea 是否开启了自适应高度
            if (!autoHeight || props.type !== 'textarea') {
                return;
            }

            const minRows = autoHeight.minRows;
            const maxRows = autoHeight.maxRows;

            // 文本框样式
            textareaStyles.value = calcTextareaHeight(textarea.value, minRows, maxRows);
        }


        // 输入事件
        const handleInput = (event) => {
            let value = event.target.value;

            // 是否开启了 Number 类型
            if (props.number && value !== '') {
                value = Number.isNaN(Number(value)) ? value : Number(value);
            }

            // updated v-model
            emit('update:modelValue', value);
            emit('input', value);

            setCurrentValue(value);

            emit('on-change', event.target.value);
        }

        // 输入框聚焦时触发
        const handleFocus = (event) => {
            emit('on-focus', event);
        }

        // 输入框失去焦点时触发
        const handleBlur = (event) => {
            emit('on-blur', event);
        }

        // 清除数据
        const handleClear = () => {
            emit('input', '');
            emit('update:modelValue', '');

            setCurrentValue('');

            emit('on-change', { target: { value: '' } });
        }

        // 获取焦点
        const focus = (option) => {
            const $el = props.type === 'textarea' ? textarea.value : input.value;
            $el.focus(option);

            // 选择内容
            const { cursor } = option || {};
            if (cursor) {
                const len = $el.value.length;

                switch (cursor) {
                    case 'start':
                        $el.setSelectionRange(0, 0);
                        break;
                    case 'end':
                        $el.setSelectionRange(len, len);
                        break;
                    default:
                        $el.setSelectionRange(0, len);
                }
            }
        }

        // 是否显示密码
        const handleShowPassword = () => {
            if (props.disabled) {
                return false;
            }

            showPassword.value = !showPassword.value;

            focus(null);

            const len = currentValue.value.length;
            setTimeout(() => {
                input.value.setSelectionRange(len, len);
            }, 0);
        }

        // 点击搜索
        const handleSearch = () => {
            if (props.disabled) {
                return false;
            }

            input.value.focus();

            emit('on-search', currentValue.value);
        }

        // 监听value
        watch(() => props.modelValue, (value) => {
            setCurrentValue(value);
        });

        // native input value is set explicitly
        // do not use v-model / :value in template
        // see: https://github.com/ElemeFE/element/issues/14521
        watch(nativeInputValue, () => {
            setNativeInputValue();
        });

        // when change between <input> and <textarea>,
        // update DOM dependent value and styles
        // https://github.com/ElemeFE/element/issues/14857
        watch(() => props.type, () => {
            nextTick(() => {
                setNativeInputValue()
                resizeTextarea()
            })
        });


        onMounted(() => {
            resizeTextarea();
        })

        return {
            prefixCls,
            // computed
            // prepend,
            // class | style
            // wrapClasses,
            // inputClass,
            textareaStyles,
            upperLimit,
            textLength,
            currentType,
            // methods
            handleEnter,
            handleKeyup,
            handleKeypress,
            handleKeydown,
            handleFocus,
            handleBlur,
            handleInput,
            handleClear,
            setCurrentValue,
            handleShowPassword,
            handleSuffix,
            handleSearch,
            focus,
            // data
            showPassword,
            currentValue,
            textarea,
            input
        }
    },
    computed: {
        // 是否有前置内容
        prepend() {
            let state = false;

            if (this.type !== 'textarea') {
                state = this.$slots.prepend !== undefined;
            }

            return state;
        },
        // 是否有后置内容
        append() {
            let state = false;

            if (this.type !== 'textarea') {
                state = this.$slots.append !== undefined;
            }

            return state;
        },
        // 是否显示输入框头部图标
        showPrefix() {
            let state = false;

            if (this.type !== 'textarea') {
                state = this.prefix !== '' || this.$slots.prefix !== undefined;
            }

            return state;
        },
        // 是否显示输入框尾部图标
        showSuffix() {
            let state = false;

            if (this.type !== 'textarea') {
                state = this.suffix !== '' || this.$slots.suffix !== undefined;
            }

            return state;
        },
        // 外层样式
        wrapClasses() {
            return [
                `${prefixCls}-wrapper`,
                {
                    [`${prefixCls}-wrapper-${this.size}`]: !!this.size,
                    [`${prefixCls}-group`]: this.prepend || this.append || (this.search && this.enterButton),
                    [`${prefixCls}-group-${this.size}`]: (this.prepend || this.append || (this.search && this.enterButton)) && !!this.size,
                    [`${prefixCls}-group-with-prepend`]: this.prepend,
                    [`${prefixCls}-group-with-append`]: this.append || (this.search && this.enterButton)
                }
            ]
        },
        // 输入框外层样式
        contentClass() {
            return [
                `${prefixCls}-content`,
                {
                    [`${prefixCls}-group`]: this.prepend || this.append || (this.search && this.enterButton),
                    [`${prefixCls}-no-border`]: !this.border,
                    [`${prefixCls}-content--prepend`]: this.prepend,
                    [`${prefixCls}-content--append`]: this.append || (this.search && this.enterButton)
                }
            ]
        },
        // 输入框样式
        inputClass() {
            return [
                prefixCls,
                {
                    [`${prefixCls}-${this.size}`]: !!this.size,
                    [`${prefixCls}-with-prefix`]: this.showPrefix,
                    [`${prefixCls}-with-suffix`]: this.showSuffix || (this.search && this.enterButton === false),
                    [`${prefixCls}-disabled`]: this.disabled,
                    [`${prefixCls}-no-border`]: !this.border,
                }
            ]
        },
        // 文本框样式
        textareaClasses() {
            return [
                prefixCls,
                `${prefixCls}-textarea`,
                {
                    [`${prefixCls}-disabled`]: this.disabled,
                    [`${prefixCls}-no-border`]: !this.border,
                }

            ]
        },
        // 前置内容背景
        prependColor() {
            let _color = {};

            if (this.prependBgColor) {
                _color = { [this.prependBgColor]: true }
            }

            return [
                _color
            ]
        },
        prependStyle() {
            let _color = {};

            if (isCssColor(this.prependBgColor)) {
                _color = { 'background-color': `${this.prependBgColor}` };
            }

            return _color
        },
        // 后置内容背景
        appendColor() {
            let _color = {};

            if (this.appendBgColor) {
                _color = { [this.appendBgColor]: true }
            }

            return [
                _color
            ]
        },
        appendStyle() {
            let _color = {};

            if (isCssColor(this.appendBgColor)) {
                _color = { 'background-color': `${this.appendBgColor}` };
            }

            return _color
        }
    },
})
</script>
