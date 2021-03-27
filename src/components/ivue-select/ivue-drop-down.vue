<template>
    <div class="ivue-select-dropdown" :style="{ minWidth: minWidth }">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    inject,
    computed
} from 'vue';

export default defineComponent({
    name: 'ivue-select-dropdown',
    setup() {
        const select: any = inject('selectKey');

        const minWidth = computed(() => {
            return `${select.selectWrapper?.getBoundingClientRect().width}px`;
        });

        return {
            minWidth
        }
    },
})
</script>
