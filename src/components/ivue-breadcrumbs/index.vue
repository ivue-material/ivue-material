<template>
    <div :class="classes" :style="styles">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    provide,
} from 'vue';
import { oneOf } from '../../utils/assist';

const prefixCls = 'ivue-breadcrumbs';

interface BreadcrumbProps {
    separator: string
    direction: string
}

export default defineComponent({
    name: prefixCls,
    props: {
        /**
        * 分隔符
        *
        * @type {String}
        */
        separator: {
            type: String,
            default: '/'
        },
        /**
         * 对齐方向
         *
         * @type {String}
         */
        direction: {
            type: String,
            default: 'flex-start',
            validator: (value: string) => {
                return oneOf(value, ['center', 'flex-end', 'flex-start']);
            }
        },
        /**
        * 中间对齐
        *
        * @type {Boolean}
        */
        justifyCenter: Boolean,
        /**
        * 尾部对齐
        *
        * @type {Boolean}
        */
        justifyEnd: Boolean
    },
    setup(props: BreadcrumbProps) {
        // provide
        provide('separator', props.separator);

        const classes = computed(() => {
            return `${prefixCls}`;
        });

        // 设置对齐位置
        const styles = computed(() => {
            return {
                'justify-content': props.direction
            }
        })

        return {
            classes,
            styles
        }
    }
})
</script>
