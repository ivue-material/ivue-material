import { default } from '../../../examples/components/select.vue';
<template>
    <li
        :class="classes"
        @touchend.stop="selectOption"
        @click.stop="handleClick"
        @mousedown.prevent
        @touchstart="handleTouchstart"
        @touchmove="handleTouchmove"
        @touchend="handleTouchend"
    >
        <slot>{{ showLabel }}</slot>
    </li>
</template>


<script lang='ts'>
import {
    defineComponent,
    reactive,
    getCurrentInstance,
    computed,
    inject,
    toRefs
} from 'vue';

const prefixCls = 'ivue-select-item';

export default defineComponent({
    name: "ivue-option",
    props: {
        /**
         * 渲染的 value
         *
         * @type {String, Number}
         */
        value: {
            type: [String, Number],
            required: true
        },
        /**
         * 渲染的 label
         *
         * @type {String, Number}
         */
        label: {
            type: [String, Number]
        },
        /**
         * key
         *
         * @type {String, Number}
         */
        keys: {
            type: [String, Number]
        },
        /**
         * 是否禁用选项
         *
         * @type {Boolean}
         */
        disabled: {
            type: Boolean,
            default: false
        },
    },
    setup(props, { emit }) {
        // proxy
        const vm: any = getCurrentInstance();

        const select: any = inject('selectKey');

        const data = reactive<{
            touchesStart: Array<[any]>,
            touchesEnd: Array<[any]>,
            selected: Boolean,
            currentSelect: String | Number | Array<[any]>,
            isFocused: Boolean,
            labelSlots: string
        }>({
            // 触摸开始位置
            touchesStart: [],
            // 触摸结束位置
            touchesEnd: [],
            // 是否选择当前项
            selected: false,
            // 当前选择
            currentSelect: '',
            // 是否获取到焦点
            isFocused: false,
            /**
             * 插槽内容
             *
             * @type {String}
             */
            labelSlots: ''
        });

        // 将响应式对象转换为普通对象，
        const {
            selected,
            currentSelect,
            isFocused,
            labelSlots
        } = toRefs(data)

        // computed
        const classes = computed(() => {
            return [
                prefixCls,
                {
                    [`${prefixCls}-disabled`]: props.disabled,
                    [`${prefixCls}-selected`]: data.selected,
                    [`${prefixCls}-focus`]: data.isFocused
                }
            ]
        });
        // 是否显示label
        const showLabel = computed(() => {
            return props.label ? props.label : props.value;
        })

        // 获取label
        const getLabel = computed(() => {
            return props.label || (vm.ctx.$el && vm.ctx.$el.textContent);
        });

        // methods
        // 手指点击
        const handleTouchstart = (e) => {
            data.touchesStart.push(e.touches[0]);
        }

        // 手机滑动
        const handleTouchmove = (e) => {
            data.touchesEnd = e.touches[0];
        }

        // 手指离开
        const handleTouchend = () => {
            data.touchesEnd = []
        }

        // PC端点击
        const handleClick = () => {
            // 判断是否是移动端点击
            if (data.touchesStart.length !== 0) {
                return;
            }

            // 点击选择选项
            selectOption();
        }


        // 点击选择选项
        const selectOption = () => {
            // 判断移动端滑动
            if (((data.touchesStart.length > 0) && !(data.touchesEnd.length === 0))) {
                return;
            }

            if (props.disabled) {
                return;
            }

            let obj = {
                value: props.value,
                label: getLabel.value,
                keys: props.keys
            }

            // 把事件注册到 IvueSelect 组件
            select.handleOptionSelect(obj);

            // 注册事件
            emit('on-select-option', obj)
        }

        // 设置选项
        select.options.push(vm.proxy);

        return {
            // data
            data,
            // 是否选择当前项
            selected,
            // 当前选择
            currentSelect,
            // 是否获取到焦点
            isFocused,
            // 插槽内容
            labelSlots,
            // computed
            classes,
            showLabel,
            // methods
            selectOption,
            handleClick,
            handleTouchstart,
            handleTouchmove,
            handleTouchend
        }
    }
})
</script>
