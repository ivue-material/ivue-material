<script lang="ts">
import {
    defineComponent,
    h,
    reactive,
    computed,
} from 'vue';

import Colorable from '../../utils/mixins/colorable';
import { provide as registrableProvide } from '../../utils/mixins/registrable';

const prefixCls = 'ivue-bottom-nav';

export default defineComponent({
    name: prefixCls,
    mixins: [Colorable, registrableProvide('buttonGroup')],
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
         * 是否隐藏
         *
         * @type {Boolean}
         */
        hidden: {
            type: Boolean,
            default: false
        },
        /**
         * 导航栏 position
         *
         * @type {String}
         */
        position: {
            type: String,
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
    setup(props: any) {
        // data
        const data = reactive({
            // 按钮导航数组
            buttons: [],
            // 监听事件列表
            listeners: [],
            // 判断是否是路由按钮
            // isRouteButton: [],
            // 是否开启监听导航路由
            ivueSyncRoute: false,
            // 是否正在销毁
            isDestroying: false
        });


        // class
        const classes = computed(() => {
            return {
                [`${prefixCls}--absolute`]: props.position === 'absolute',
                [`${prefixCls}--active`]: props.value,
                [`${prefixCls}--fixed`]: props.position === 'fixed',
                [`${prefixCls}--shift`]: props.shift,
                [`${prefixCls}--is-color`]: props.color !== ''
            }
        });

        // 实时计算高度
        const computedHeight = computed(() => {
            return parseInt(props.height);
        })

        return {
            classes,
            computedHeight
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
