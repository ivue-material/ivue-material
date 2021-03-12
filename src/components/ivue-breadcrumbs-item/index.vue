<template>
    <span>
        <span :class="linkClasses"><slot></slot></span>

        <span
            :class="separatorClasses"
            v-html="data.separator"
            v-if="!data.showHtmlSeparator"
        ></span>
        <span :class="separatorClasses" v-else>
            <slot name="separator"></slot>
        </span>
    </span>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    reactive,
    inject,
    onMounted
} from 'vue';

import { oneOf } from '../../utils/assist';

const prefixCls = 'ivue-breadcrumbs-item';

export default defineComponent({
    name: prefixCls,
    props: {
    },
    setup(props, { slots }) {
        const separator = inject('separator');

        // data
        const data = reactive<{
            showHtmlSeparator: boolean,
            separator: any
        }>({
            /**
             * 是否显示v-html的 showSeparator
             *
             * @type {Boolean}
             */
            showHtmlSeparator: false,
            /**
             * 标志符号
             *
             * @type {String}
             */
            separator: separator,
        });

        const linkClasses = computed(() => {
            return `${prefixCls}-link`;
        });

        const separatorClasses = computed(() => {
            return `${prefixCls}-separator`;
        });

        onMounted(() => {
            data.showHtmlSeparator = slots.separator !== undefined
        });

        return {
            linkClasses,
            separatorClasses,
            data
        }
    }
})
</script>
