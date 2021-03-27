
import {
    nextTick,
    computed,
    ref,
    reactive,
    watch
} from 'vue';

import scrollIntoView from '../../utils/scroll-into-view';

// 状态
export function useSelectStates({ slots }) {
    return reactive<{
        visibleMenu: boolean,
        caretPosition: number,
        isFocused: boolean,
        hasMouseHover: boolean,
        values: any,
        slotOptions: any,
        focusIndex: number,
        filterQuery: string,
        lastSearchQuery: string,
        options: any
    }>({
        /**
         * 是否显示菜单
         *
         * @type {Boolean}
         */
        visibleMenu: false,
        /**
         * 过滤输入框焦点位置
         *
         * @type {Boolean}
         */
        caretPosition: -1,
        /**
         * 判断是否有焦点
         *
         * @type {Boolean}
         */
        isFocused: false,
        /**
         * 鼠标悬浮
         *
         * @type {Boolean}
         */
        hasMouseHover: false,
        /**
         * 最终渲染的数据
         *
         * @type {Array}
         */
        values: [],
        /**
         * 插槽数据
         *
         * @type {slots.default}
         */
        slotOptions: slots.default()[0].children,
        /**
         * 焦点项
         *
         * @type {Number}
         */
        focusIndex: -1,
        /**
         * 过滤输入框输入数据
         *
         * @type {String}
         */
        filterQuery: '',
        /**
         * 下一个搜索请求
         *
         * @type {String}
         */
        lastSearchQuery: '',
        /**
         * 选项数组
         *
         * @type {Array}
         */
        options: []
    });
}


type States = ReturnType<typeof useSelectStates>

export const useSelect = (prefixCls, props, states: States, ctx, vm) => {
    // ref
    const dropdown = ref(null);
    const selectWrapper = ref<HTMLElement | null>(null);

    // computed
    // 外部样式
    const wrapperClasses = computed(() => {
        return [
            `${prefixCls}`,
            {
                [`${prefixCls}-default`]: !props.multiple,
                [`${prefixCls}-multiple`]: props.multiple,
                [`${prefixCls}-visible`]: states.visibleMenu,
                [`${prefixCls}-disabled`]: props.disabled
            }
        ]
    });

    // 选择框样式
    const selectionClasses = computed(() => {
        return [
            `${prefixCls}-selection-default`,
            {
                [`${prefixCls}-selection`]: !props.autocomplete

            }
        ]
    });

    // 菜单样式
    const dropdownClass = computed(() => {
        return {
            [`ivue-auto-complete`]: props.autocomplete
        }
    });

    //  tab 键顺序
    const selectTabindex = computed(() => {
        return props.disabled || props.filterable ? -1 : 0
    });

    // 当前选择的值
    const selectValue = computed(() => {
        // 判断是否有开启返回label和value
        if (props.labelAndValue) {
            return props.multiple ? states.values : states.values[0];
        }
        else {
            return props.multiple ?
                states.values.map((option: any) => option.value) :
                (states.values && states.values[0] || {}).value;
        }
    });

    // 是否可以显示重置选择按钮
    const canClearable = computed(() => {
        const qualifiesForClear = !props.multiple && !props.disabled && props.clearable;

        // 多选模式下无效
        return (states.hasMouseHover && qualifiesForClear);
    });

    // 显示下拉菜单
    const dropVisible = computed(() => {
        let status = true;

        const noSelectOptions = selectOptions.value.length === 0;

        if (states.visibleMenu &&
            noSelectOptions &&
            isSearchMethod()
        ) {
            status = false;
        }

        if (props.autocomplete && noSelectOptions) {
            status = false;
        }

        return states.visibleMenu && status;
    });

    // 设置菜单选择列表
    const selectOptions = computed(() => {
        // 获取选项的列表
        const selectOptions = [];
        // 选项计数器，计算有多少个选项
        let optionCounter = -1;
        // 当前焦点项
        const currentIndex = states.focusIndex;

        // 选择的选项
        const selectedValues = states.values.filter(Boolean).map(({ value }) => value);
        const selectedKeys = states.values.filter(Boolean).map(({ keys }) => keys);

        for (let option of states.options) {
            // 选项计数器
            optionCounter = optionCounter + 1;

            selectOptions.push(handleOption(option, selectedValues, selectedKeys, optionCounter === currentIndex));
        }

        return selectOptions;
    });


    // methods

    // 提取选项数据
    const handleOption = (option, values, keys, isFocused) => {

        // 获取选项的值
        const optionValue = option.value;
        const optionKeys = option.keys;

        // 判断是否选中当前选项
        let isSelect = false;


        // 是否使用Key验证
        if (props.useKeyCheck) {
            isSelect = keys.includes(optionKeys);
        }
        else {
            isSelect = values.includes(optionValue);
        }

        // 当前选择
        const currentSelect = props.modelValue;

        // 设置选中
        option.selected = isSelect;
        option.currentSelect = currentSelect;
        option.isFocused = isFocused;

        if (option.$el && !option.label) {
            option.labelSlots = option.$el.textContent;
        }


        return option
    }

    // 隐藏菜单
    const hideMenu = () => {
        toggleMenu(null, false);
    }

    // 鼠标悬浮
    const handleMouseenter = () => {
        states.hasMouseHover = true
    }

    // 鼠标移除
    const handleMouseleave = () => {
        states.hasMouseHover = false
    }

    // 选项点击
    const handleOptionSelect = (option) => {
        if (props.multiple) {

        }
        else {
            ctx.emit('update:modelValue', option.label);

            // 过滤输入框数据
            states.filterQuery = String(option.label).trim();

            // 最终渲染的数据
            states.values = [option];
            // 隐藏菜单
            hideMenu();
        }

        // 获取焦点项
        states.focusIndex = setFocusIndex(option);

        ctx.emit('on-select', option);
    }

    // 点击外部
    const handleClickOutside = (event: any) => {
        // 判断是否显示了菜单
        if (states.visibleMenu) {
            if (event.type === 'mousedown') {
                event.preventDefault();
                return;
            }

            // 是否将弹层放置于 body 内
            if (props.transfer) {
                const { $el } = dropdown.value;
                if ($el === event.target || $el.contains(event.target)) {
                    return;
                }
            }

            if (props.filterable) {
                const input = vm.ctx.$el.querySelector('input[type="text"]');

                // 第一个选定字符的索引
                states.caretPosition = input.selectionStart;

                nextTick(() => {
                    const caretPosition = states.caretPosition === -1 ? input.value.length : states.caretPosition;

                    input.setSelectionRange(caretPosition, caretPosition);

                    input.blur();
                });
            }

            if (!props.autocomplete) {
                event.stopPropagation();
            }

            event.preventDefault();

            // 隐藏菜单
            hideMenu();

            states.isFocused = true;
        }
        else {
            states.caretPosition = -1;
            states.isFocused = false;
        }
    }

    // 按键
    const handldKeyDown = (event) => {
        const key = event.key || event.code;
        const keyCode = event.keyCode || event.which;

        if (key === 'Backspace' || keyCode === 8) {
            return; // so we don't call preventDefault
        }

        if (states.visibleMenu) {
            event.preventDefault();

            // Tab
            if (key === 'Tab') {
                event.stopPropagation();
            }

            // next
            if (key === 'ArrowUp') {
                navigateOptions('next');
            }

            // prev
            if (key === 'ArrowDown') {
                navigateOptions('prev');
            }

            // enter
            if (event.key === 'Enter') {
                if (states.focusIndex === -1) {
                    return hideMenu();
                }

                const optionComponent = selectOptions.value[states.focusIndex];

                if (optionComponent) {
                    const option = {
                        value: optionComponent.value,
                        label: optionComponent.label || optionComponent.labelSlots,
                        keys: optionComponent.keys,
                        disabled: optionComponent.disabled
                    };

                    handleOptionSelect(option);
                }
                else {
                    hideMenu();
                }
            }

            // esc
            if (event.key === 'Escape') {
                event.stopPropagation();
                hideMenu();
            }
        }
        else {
            const keysCanOpenMenu = ['ArrowDown', 'ArrowUp'];
            // 如果焦点在当前选择框的话按 next or prev 可以打开选项菜单
            if (keysCanOpenMenu.includes(event.key)) {
                toggleMenu(null, true);
            }
        }

    }

    // 设置选项焦点位置
    const setFocusIndex = (option) => {
        const _selectOptions = selectOptions.value;

        return _selectOptions.findIndex((opt) => {
            // 是否使用Key验证
            if (props.useKeyCheck) {
                return opt.keys === option.keys;
            }
            else {
                return opt.value === option.value;
            }
        });
    }

    // 点击菜单
    const toggleMenu = (event, force: boolean) => {
        // 选择组件是否禁用
        if (props.disabled) {
            return false;
        }

        // 设置菜单状态
        states.visibleMenu = typeof force !== 'undefined' ? force : !states.visibleMenu;

        // 菜单收起
        if (!states.visibleMenu) {
            // 取消焦点
            if (props.filterable) {
                const input = vm.ctx.$el.querySelector('input[type="text"]');
                input.blur();
            }
        }
    }

    // 判断是是否是一个方法
    const isSearchMethod = () => {
        return typeof props.searchMethod === 'function';
    }

    // 导航选项
    const navigateOptions = (direction) => {
        // const _selectOptions = selectOptions.value;
        // 选项长度
        // const optionLength = _selectOptions.length - 1;

        // let index = states.focusIndex + direction;

        // if (index < 0) {
        //     index = optionLength;
        // }

        // // 重置下标
        // if (index > optionLength) {
        //     index = 0;
        // }

        // prev
        if (direction === 'prev') {
            states.focusIndex++;

            if (states.focusIndex === states.options.length) {
                states.focusIndex = 0;
            }
        }
        // next
        else if (direction === 'next') {
            states.focusIndex--;

            if (states.focusIndex < 0) {
                states.focusIndex = states.options.length - 1;
            }
        }

        const option = states.options[states.focusIndex]

        if (option.disabled === true) {
            navigateOptions(direction)
        }
    };

    // 重置数据
    const resetData = () => {
        states.focusIndex = -1;
        states.values = [];
        states.hasMouseHover = false;
    };

    // 清楚单项选择数据
    const clearSingleSelect = () => {
        // API 点击清空按钮时触发
        ctx.emit('on-clear');

        // fix #446
        if (!props.multiple) {
            ctx.emit('update:modelValue', '');
        }

        // 隐藏菜单
        hideMenu();

        // 初始化数据
        if (props.clearable) {
            resetData();
        }
    }

    // 滚动到选项
    const scrollToOption = (option) => {
        const target = Array.isArray(option) ? option[0]?.$el : option.$el

        // 获取下拉菜单
        if (dropdown.value && target) {
            const menu = dropdown.value?.$el;

            if (menu) {
                scrollIntoView(menu, target);
            }
        }
    }



    // 监听菜单选择列表
    watch(() => selectOptions.value, (value) => {
        if (states.slotOptions.length === 0) {
            states.filterQuery = '';
        }
    });

    // 监听下标
    watch(() => states.focusIndex, (focusIndex) => {

        if (focusIndex < 0) {
            return;
        }

        // update scroll
        const option = selectOptions.value[focusIndex];

        scrollToOption(option)
    });

    return {
        // computed
        wrapperClasses,
        selectionClasses,
        dropdownClass,
        selectTabindex,
        selectValue,
        canClearable,
        dropVisible,
        // methods
        handleClickOutside,
        toggleMenu,
        hideMenu,
        handleMouseenter,
        handleMouseleave,
        handleOptionSelect,
        handldKeyDown,
        clearSingleSelect,

        // dom ref
        dropdown,
        selectWrapper
    }
}
