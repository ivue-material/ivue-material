<template>
    <IvueSvgLoader
        class="ivue-icon ivue-icon-image"
        :svgSrc="svgSrc"
        v-if="svgSrc"
        @svg-loaded="$emit('svg-loaded')"
    ></IvueSvgLoader>
    <i class="ivue-icon ivue-icon-font" v-else>
        <slot />
    </i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IvueSvgLoader from '../ivue-svg-loader/index';

const prefixCls = 'ivue-icon';

export default defineComponent({
    name: prefixCls,
    props: {
        /**
         * svg 链接
         *
         * @type {String}
        */
        svgSrc: {
            type: String,
            default: null
        }
    },
    components: {
        IvueSvgLoader
    }
})
</script>
