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
                    :value="data.currentValue"
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
                    v-if="clearable && data.currentValue && !disabled"
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
                    <i class="ivue-icon" v-if="data.showPassword">
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
                :style="data.textareaStyles"
                :value="data.currentValue"
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

import { oneOf } from '../../utils/assist';
import { useInputStates, useInput } from './useInput';


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
    setup(props: any, ctx) {

        // data
        const data = useInputStates(props);

        let useInputData = {};

        const {
            resizeTextarea,
        } = useInputData = useInput(props, data, ctx);

        onMounted(() => {
            resizeTextarea();
        });

        return {
            prefixCls,
            ...useInputData,
            // data
            data,
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
