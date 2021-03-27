<template>
    <div :class="wrapperClass" @click="handleInputClick">
        <span :class="`${prefixCls}-prefix`" v-if="$slots.prefix || prefix">
            <slot name="prefix">
                <ivue-icon v-if="prefix">{{ prefix }}</ivue-icon>
            </slot>
        </span>

        <!-- 过滤输入框 -->

        <!-- 普通渲染 -->
        <transition name="ivue-select-fade">
            <span :class="defaultDisplayClasses" v-show="defaultDisplayValue">
                {{ defaultDisplayValue }}
            </span>
        </transition>
        <!-- 过滤输入框 -->
        <input
            type="text"
            autocomplete="off"
            spellcheck="false"
            :disabled="disabled"
            :placeholder="showPlaceholder ? placeholder : ''"
            :class="inputClass"
            :style="inputStyle"
            v-model="data.filterQuery"
            v-if="filterable"
            ref="input"
        />

        <!-- 下拉图标 -->
        <ivue-icon :class="[`${prefixCls}-arrow`]" v-if="!resetSelect">
            {{ arrowDownIcon }}
        </ivue-icon>

        <!-- 重置选择 -->
        <ivue-icon
            :class="[`${prefixCls}-arrow`, `${prefixCls}-clear`]"
            v-if="resetSelect"
            @click.stop="handleClear"
            @mousedown.stop="handleClear"
        >
            {{ resetSelectIcon }}
        </ivue-icon>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    ref,
    getCurrentInstance,
    watch,
    computed
} from 'vue';

import { IvueIcon } from '../ivue-icon';

const prefixCls = 'ivue-select';

export default defineComponent({
    props: {
        /**
         * 最终渲染的数据
         *
         * @type {Array}
         */
        values: {
            type: Array,
            default: () => []
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
            default: ''
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
         * 是否禁用
         *
         * @type {Boolean}
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * 是否可以清楚选择
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
         * @type {Boolean}
         */
        arrowDownIcon: {
            type: String
        },
        /**
         * 外部输入框输入数据
         *
         * @type {String}
         */
        filterQueryProp: {
            type: String,
            default: ''
        },
        /**
         * 重置选择图标
         *
         * @type {Boolean}
         */
        resetSelectIcon: {
            type: String
        },
    },
    setup(props, { slots, emit }) {
        // vm
        const vm: any = getCurrentInstance();

        // ref
        const input = ref(null);

        const data = reactive<{
            filterQuery: string,
            inputLength: number
        }>({
            /**
             * 输入框输入数据
             *
             * @type { String}
             */
            filterQuery: '',
            /**
             * 输入框长度
             *
             * @type { Number}
             */
            inputLength: 20,
        })

        // computed

        // 使用 prefix 时，在 filterable
        const wrapperClass = computed(() => {
            return {
                [`${prefixCls}-head-flex`]: props.filterable && (slots.prefix || props.prefix)
            };
        });

        // 普通显示的class
        const defaultDisplayClasses = computed(() => {
            return [
                {
                    [`${prefixCls}-head-with-prefix`]: slots.prefix || props.prefix,
                    [`${prefixCls}-selection-value`]: !showPlaceholder.value && !props.multiple && !props.filterable,
                    [`${prefixCls}-placeholder`]: showPlaceholder.value && !props.filterable
                }
            ]
        });

        // 输入框样式
        const inputClass = computed(() => {
            return [
                `${prefixCls}-input-filter`,
                { [`${prefixCls}-input-filter-placeholder`]: showPlaceholder.value },
            ]
        });


        // 输入框样式
        const inputStyle = computed(() => {
            let style: any = {};

            if (props.multiple) {
                if (showPlaceholder.value) {
                    style.width = "100%";
                }
                else {
                    style.width = `${data.inputLength}px`;
                }
            }

            return style;
        })

        // 是否显示占位符
        const showPlaceholder = computed(() => {
            let status = false;
            if (!props.multiple) {
                const value = props.values[0];

                // 判断 undefined 和清除空格
                if (typeof value === 'undefined' || String(value).trim() === '') {
                    status = true;
                }
            }
            else {
                if (!(props.values.length > 0)) {
                    status = true;
                }
            }

            return status;
        });

        // 普通显示的值
        const defaultDisplayValue = computed(() => {
            // 判断是否是多选 或者 是否开启了输入框过滤
            if ((props.multiple && props.values.length > 0) || props.filterable) {
                return '';
            }

            return `${selectedSingle.value}` || props.placeholder;
        });

        // 选择单个选项
        const selectedSingle = computed(() => {
            const selected: any = props.values[0];

            return selected ? selected.label : '';
        });

        // 重置选择
        const resetSelect = computed(() => {
            return !showPlaceholder.value && props.clearable;
        });

        // methods

        // 输入框点击
        const handleInputClick = (e) => {
            if (props.filterable && e.target === vm.ctx.$el) {
                input.value.focus();
            }
        }

        // 清除选择
        const handleClear = () => {
            emit('on-clear');
        }

        watch(() => props.filterQueryProp, (value) => {
            if (value !== data.filterQuery && props.filterable) {
                data.filterQuery = value;
            }
        });

        return {
            prefixCls,
            // ref
            input,

            // data
            data,

            // computed
            wrapperClass,
            inputClass,
            inputStyle,
            defaultDisplayClasses,
            defaultDisplayValue,
            showPlaceholder,
            resetSelect,

            // methods
            handleInputClick,
            handleClear
        }
    },
    components: {
        IvueIcon
    }
})
</script>
