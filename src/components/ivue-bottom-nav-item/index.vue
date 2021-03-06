<template>
    <div :class="prefixCls"></div>
</template>

<script lang="ts">
import {
    defineComponent,
    h,
    reactive,
    computed,
} from 'vue';

const prefixCls = 'ivue-bottom-nav-item';

export default defineComponent({
    name: prefixCls,
    setup() {

        return {
            prefixCls
        }
    }
})
</script>
