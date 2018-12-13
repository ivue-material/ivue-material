<template>
      <div :class="prefixCls" :style="styles">
            <slot></slot>
      </div>
</template>

<script>
const prefixCls = 'ivue-carousel-item';

export default {
      name: 'IVueCarouselItem',
      componentName: 'ivue-carousel-item',
      data () {
            return {
                  prefixCls: prefixCls,
                  width: 0,
                  height: 'auto',
                  left: 0
            }
      },
      mounted () {
            this.$parent.slotChange();
      },
      computed: {
            styles () {
                  return {
                        width: `${this.width}px`,
                        height: `${this.height}px`,
                        left: `${this.left}px`
                  }
            }
      },
      beforeDestroy () {
            this.$parent.slotChange();
      },
      watch: {
            width (value) {
                  if (value && this.$parent.loop) {
                        this.$nextTick(() => {
                              this.$parent.initCopyTrackDom();
                        })
                  }
            }
      }
}
</script>
