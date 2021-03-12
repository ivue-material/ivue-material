<template>
    <ivue-button
        :class="wrapper"
        flat
        :color="color"
        :ripple="!rippleDisabled"
        @click="setActiveItem"
    >
        <slot v-if="$slots.default"></slot>

        <template v-else>
            <span :class="`${prefixCls}-text`">{{ label }}</span>
            <ivue-icon>{{ icon }}</ivue-icon>
        </template>
    </ivue-button>
</template>


<script lang="ts">
import {
    defineComponent,
    onMounted,
    reactive,
    inject,
    computed,
} from 'vue';
import { useRouter } from 'vue-router';

import { IvueButton } from '../../components/ivue-button';
import { IvueIcon } from '../../components/ivue-icon';
import uuid from '../../utils/uuid';

const prefixCls = 'ivue-bottom-nav-item';

export default defineComponent({
    name: prefixCls,
    props: {
        /**
         * 禁用涟漪
         *
         * @type {Boolean}
         */
        rippleDisabled: {
            type: Boolean,
            default: false
        },
        /**
         * 底部标签
         *
         * @type {String}
         */
        label: {
            type: String,
            default: ''
        },
        /**
         * 底部图标
         *
         * @type {String}
         */
        icon: {
            type: String,
            default: ''
        },
        /**
         * item激活颜色
         *
         * @type {String}
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * item激活颜色
         *
         * @type {String}
         */
        id: {
            type: String,
            default: () => `${prefixCls}-${uuid()}`
        },
        /**
         * 跳转位置
         *
         * @type {String, Object}
         */
        to: {
            type: [String, Object],
            default: ''
        },
        /**
         * 路由跳转时，开启 replace 将不会向 history 添加新记录
         *
         * @type {Boolean}
         */
        replace: {
            type: Boolean,
            default: false
        },

    },
    setup(props: any) {
        // data
        const data = reactive({
            router: useRouter()
        });


        const bottom_nav: any = inject('bottom_nav');

        const wrapper = computed(() => {
            return [
                prefixCls,
                {
                    [`${prefixCls}--active`]: props.id === bottom_nav.activeItem
                }
            ]
        });

        // methods

        // 点击激活选项
        const setActiveItem = () => {
            bottom_nav.activeItem = props.id

            // 是否开启了路由
            if (!props.to) {
                return;
            }

            if (data.router) {
                props.replace ? data.router.replace(props.to) : data.router.push(props.to);
            }
        }

        // 设置选项数据
        const setItemData = () => {
            bottom_nav.items = {
                id: props.id
            }
        };

        onMounted(() => {
            if (!bottom_nav.items.id) {
                setItemData();
            }
        });

        return {
            prefixCls,
            // computed
            wrapper,

            // methods
            setActiveItem
        }
    },
    components: {
        IvueButton,
        IvueIcon
    }
})
</script>
