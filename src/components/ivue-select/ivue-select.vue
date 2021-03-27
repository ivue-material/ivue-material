<template>
    <div
        :class="wrapperClasses"
        v-click-outside:[capture]="handleClickOutside"
        v-click-outside:[capture].mousedown="handleClickOutside"
        v-click-outside:[capture].touchstart="handleClickOutside"
        ref="selectWrapper"
    >
        <div
            :class="selectionClasses"
            :tabindex="selectTabindex"
            @click="toggleMenu"
            @mouseenter="handleMouseenter"
            @mouseleave="handleMouseleave"
            @keydown.down.prevent="handldKeyDown"
            @keydown.up.prevent="handldKeyDown"
            @keydown.enter="handldKeyDown"
            @keydown.esc="handldKeyDown"
            @keydown.delete="handldKeyDown"
            @keydown.tab="handleKeydown"
        >
            <slot name="input">
                <input type="hidden" :value="selectValue" />

                <ivue-sleect-head
                    :values="data.values"
                    :placeholder="placeholder"
                    :filterable="filterable"
                    :multiple="multiple"
                    :clearable="canClearable"
                    :arrowDownIcon="arrowDownIcon"
                    :prefix="prefix"
                    :filterQueryProp="data.filterQuery"
                    :resetSelectIcon="resetSelectIcon"
                    @on-clear="clearSingleSelect"
                >
                    <template v-slot:prefix v-if="$slots.prefix || prefix">
                        <slot name="prefix"></slot>
                    </template>
                </ivue-sleect-head>
            </slot>
        </div>

        <transition name="transition-drop">
            <ivue-drop-down
                :class="dropdownClass"
                v-show="dropVisible"
                ref="dropdown"
            >
                <!-- 数据列表 -->
                <ul :class="`${prefixCls}-dropdown-list`">
                    <!-- 函数式组件用于提升渲染性能纯渲染组件 -->
                    <slot></slot>
                </ul>
            </ivue-drop-down>
        </transition>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    getCurrentInstance,
    provide,
    toRefs,
} from 'vue';

import { useSelect, useSelectStates } from './useSelect';

// 下拉菜单
import IvueDropDown from './ivue-drop-down.vue';
// 输入框
import IvueSleectHead from './ivue-select-head.vue';

const prefixCls = 'ivue-select';

export default defineComponent({
    name: prefixCls,
    props: {
        /**
        * 设置选择的值
        *
        * @type {String, Number, Array}
        */
        modelValue: {
            type: [String, Number, Array],
            default: ''
        },
        /*
        /**
         * 是否开启捕获事件
         *
         * @type {Boolean}
         */
        capture: {
            type: Boolean,
            default() {
                return 'capture'
            }
        },
        /**
         * 开启过滤筛选
         *
         * @type {Boolean}
         */
        filterable: {
            type: Boolean,
            default: false
        },
        /**
         * 自动完成
         *
         * @type {Boolean}
         */
        autocomplete: {
            type: Boolean,
            default: false
        },
        /**
         * 是否禁用选择组件
         *
         * @type {Boolean}
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * 是否开启多选
         *
         * @type {Boolean}
         */
        multiple: {
            type: Boolean,
            default: false
        },
        /**
         * 是否将label和value一起返回
         *
         * @type {Boolean}
         */
        labelAndValue: {
            type: Boolean,
            default: false
        },
        /**
         * 在 Select 内显示图标
         *
         * @type {String}
         */
        prefix: {
            type: String
        },
        /**
        * 输入提示
        *
        * @type {String}
        */
        placeholder: {
            type: String,
            default: '请选择'
        },
        /**
         * 是否可以清除选择, 只在单选时有效
         *
         * @type {Boolean}
         */
        clearable: {
            type: Boolean,
            default: false
        },
        /**
         * 下拉图标
         *
         * @type {String}
         */
        arrowDownIcon: {
            type: String,
            default: 'keyboard_arrow_down'
        },
        /**
         * 重置选择图标
         *
         * @type {String}
         */
        resetSelectIcon: {
            type: String,
            default: 'cancel'
        },
        /**
         * 搜索方法
         *
         * @type {Function}
         */
        searchMethod: {
            type: Function
        },
        /**
         * 使用key验证
         *
         * @type {Boolean}
         */
        useKeyCheck: {
            type: Boolean,
            default: false
        }
    },
    setup(props: any, ctx) {
        const vm: any = getCurrentInstance();

        const states = useSelectStates(ctx);

        const {
            dropdown,
            wrapperClasses,
            selectionClasses,
            selectTabindex,
            selectValue,
            handleClickOutside,
            handleMouseenter,
            handleMouseleave,
            handleOptionSelect,
            toggleMenu,
            canClearable,
            dropdownClass,
            dropVisible,
            selectWrapper,
            handldKeyDown,
            clearSingleSelect
        } = useSelect(prefixCls, props, states, ctx, vm)

        // data
        const data = states;

        const {
            options
        } = toRefs(states);

        provide('selectKey', reactive({
            selectWrapper,
            handleOptionSelect,
            options
        }));


        return {
            prefixCls,

            // ref
            dropdown,
            selectWrapper,

            // data
            data,

            // computed
            wrapperClasses,
            selectionClasses,
            dropdownClass,
            selectTabindex,
            selectValue,

            // methods
            handleClickOutside,
            handleMouseenter,
            handleMouseleave,
            handldKeyDown,
            toggleMenu,
            canClearable,
            dropVisible,
            clearSingleSelect
        }
    },
    components: {
        IvueDropDown,
        IvueSleectHead
    }
})
</script>
