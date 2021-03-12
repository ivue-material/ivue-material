<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    provide,
} from 'vue';

const prefixCls = 'ivue-breadcrumbs';

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
    },
    setup(props) {
        // provide
        provide('separator', props.separator);

        const classes = computed(() => {
            return `${prefixCls}`;
        });

        return {
            classes
        }
    }
})
</script>
