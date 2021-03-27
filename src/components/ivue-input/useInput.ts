import {
    nextTick,
    computed,
    ref,
    reactive,
    watch
} from 'vue';

import { calcTextareaHeight } from '../../utils/calc-textarea-height';

// 状态
export function useInputStates(props) {
    return reactive<{
        currentValue: any,
        textareaStyles: object,
        showPassword: boolean
    }>({
        /**
         * 是否显示菜单
         *
         * @type {String | Number}
         */
        currentValue: props.modelValue,
        /**
         * 文本框样式
         *
         * @type {Object}
         */
        textareaStyles: {},
        /**
         * 显示密码
         *
         * @type {Boolean}
         */
        showPassword: false
    });
}

type States = ReturnType<typeof useInputStates>

export const useInput = (props, states: States, { emit }) => {
    // ref = textarea
    const textarea = ref(null);
    // ref = input
    const input = ref(null);

    // computed
    // 输入的内容
    const nativeInputValue = computed(() => {
        return props.modelValue
    });

    // 输入上限
    const upperLimit = computed(() => {
        return props.maxlength;
    });

    // 监听输入的长度
    const textLength = computed(() => {
        if (typeof states.currentValue === 'number') {
            return String(states.currentValue).length;
        }

        return (states.currentValue || '').length;
    });

    // 获取当前输入框type
    const currentType = computed(() => {
        let type = props.type;

        if (type === 'password' && props.password && states.showPassword) {
            type = 'text';
        }

        return type;
    });

    // methods

    // 更新value
    const setNativeInputValue = () => {
        if (props.modelValue === states.currentValue) {
            return;
        }

        states.currentValue = nativeInputValue.value
    }

    // 设置当前值
    const setCurrentValue = (value) => {
        if (value === states.currentValue) {
            return;
        }

        nextTick(() => {
            resizeTextarea();
        });

        states.currentValue = value;

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
        states.textareaStyles = calcTextareaHeight(textarea.value, minRows, maxRows);
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

        states.showPassword = !states.showPassword;

        focus(null);

        const len = states.currentValue.length;

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

        emit('on-search', states.currentValue);
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
            setNativeInputValue();
            resizeTextarea();
        })
    });

    return {
        // computed
        upperLimit,
        textLength,
        currentType,

        // methods
        ...handleEvent(props, emit, setCurrentValue),
        setCurrentValue,
        resizeTextarea,
        handleShowPassword,
        handleSearch,

        // dom ref
        textarea,
        input
    }
}


// 事件
function handleEvent(props, emit, setCurrentValue) {
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

    // 输入框聚焦时触发
    const handleFocus = (event) => {
        emit('on-focus', event);
    }

    // 输入框失去焦点时触发
    const handleBlur = (event) => {
        emit('on-blur', event);
    }

    const handleClear = () => {
        emit('input', '');
        emit('update:modelValue', '');

        setCurrentValue('');

        emit('on-change', { target: { value: '' } });
    }

    return {
        handleInput,
        handleEnter,
        handleKeyup,
        handleKeydown,
        handleKeypress,
        handleSuffix,
        handleFocus,
        handleBlur,
        handleClear
    }
}
