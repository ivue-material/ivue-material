<template>
    <div :class="`${prefixCls}-ripple`">
        <div :class="`${prefixCls}-content`">
            <slot></slot>
        </div>
    </div>
</template>

<script lang='ts'>
import {
    defineComponent,
} from 'vue';

const prefixCls = 'ivue-button';

export default defineComponent({
    name: prefixCls,
    data() {
        return {
            prefixCls: prefixCls
        }
    }
})
</script>
