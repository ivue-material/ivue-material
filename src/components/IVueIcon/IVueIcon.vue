<template>
      <IVueSvgLoader class="ivue-icon ivue-icon-image" :svgSrc="svgSrc" v-if="svgSrc" @svg-loaded="$emit('svg-loaded')"></IVueSvgLoader>
      <i class="ivue-icon ivue-icon-font" v-else>
            <slot/>
      </i>
</template>

<script>
import IVueSvgLoader from '../IVueSvgLoader/IVueSvgLoader';

export default {
      name: 'IVueIcon',
      props: {
            /*
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
            IVueSvgLoader
      }
}
</script>
