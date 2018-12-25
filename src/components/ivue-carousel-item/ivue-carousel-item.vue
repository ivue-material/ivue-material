<template>
      <div :class="prefixCls" :style="styles">
            <slot></slot>
      </div>
</template>

<script>
const prefixCls = 'ivue-carousel-item';

export default {
      name: prefixCls,
      componentName: 'ivue-carousel-item',
      data () {
            return {
                  prefixCls: prefixCls,
                  // 宽度
                  width: 0,
                  // 高度
                  height: 'auto',
                  left: 0
            }
      },
      // 改变轮播图位置
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
            // 改变轮播图位置
            this.$parent.slotChange();
      },
      watch: {
            width (value) {
                  if (value && this.$parent.loop) {
                        this.$nextTick(() => {
                              // 初始化复制内容节点 用于 loop 效果
                              this.$parent.initCopyTrackDom();
                        })
                  }
            }
      }
}
</script>
