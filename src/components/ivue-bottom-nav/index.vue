<script lang="ts">
import {
    defineComponent,
    h,
    reactive,
    computed,
    provide,
    watch,
    onMounted,
} from 'vue';

import Colorable from '../../utils/mixins/colorable';
import { oneOf } from '../../utils/assist';

const prefixCls = 'ivue-bottom-nav';

export default defineComponent({
    name: prefixCls,
    mixins: [
        Colorable,
    ],
    emits: ['update:active', 'on-change'],
    props: {
        /**
         * 当前激活的导航
         *
         * @type {Number, String}
         */
        active: {
            type: [Number, String],
            default: null
        },
        /**
         * 设置组件高度
         *
         * @type {Number, String}
         */
        height: {
            type: [Number, String],
            default: 56,
            validator: (value: any) => {
                return !isNaN(parseInt(value))
            }
        },
        /**
         * 隐藏方式
         *
         * @type {Boolean}
         */
        hiddenType: {
            type: String,
            validator(value: string) {
                return oneOf(value, ['', 'bottom', 'hidden']);
            },
            default: ''
        },
        /**
         * 导航栏 position
         *
         * @type {String}
         */
        position: {
            type: String,
            validator(value: string) {
                return oneOf(value, ['absolute', 'fixed']);
            },
            default: null
        },
        /**
         * 不是激活状态时隐藏按钮上的文字
         *
         * @type {Boolean}
         */
        shift: {
            type: Boolean,
            default: false
        }
    },
    setup(props: any, { emit }) {
        // data
        const data = reactive<{
            bottom_nav: any
        }>({
            bottom_nav: {
                activeItem: null,
                items: {},
            }
        });

        // provide
        provide('bottom_nav', data.bottom_nav);

        // class
        const classes = computed(() => {
            return {
                [`${prefixCls}--absolute`]: props.position === 'absolute',
                [`${prefixCls}--hidden_${props.hiddenType}`]: props.hiddenType,
                [`${prefixCls}--fixed`]: props.position === 'fixed',
                [`${prefixCls}--shift`]: props.shift,
                [`${prefixCls}--is-color`]: props.color !== ''
            }
        });

        // 实时计算高度
        const computedHeight = computed(() => {
            return parseInt(props.height);
        });

        // 激活的选项
        const activeItem = computed(() => {
            return data.bottom_nav.activeItem;
        });

        // methods
        const getItemsAndKeys = () => {
            const items = data.bottom_nav.items;

            return {
                ...items,
            }
        };

        // 设置激活选项
        const setActiveItemByIndex = (index: number) => {
            const { id } = getItemsAndKeys();

            if (!props.active) {
                data.bottom_nav.activeItem = id
            } else {
                data.bottom_nav.activeItem = props.active
            }
        }

        onMounted(() => {
            // 初始化
            setActiveItemByIndex(0);
        });

        watch(() => activeItem.value, (value) => {
            emit('update:active', value);

            emit('on-change', value);
        });

        return {
            classes,
            computedHeight,
        }
    },
    render() {
        return h('div', this.setBackgroundColor(this.color, {
            'class': [
                prefixCls,
                this.classes,
            ],
            style: {
                height: `${parseInt(this.computedHeight)}px`
            },
        }), this.$slots.default());
    }
})
</script>
