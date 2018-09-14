<template>
      <transition name="ivue-ripple" @after-enter="end">
            <span v-show="animating"></span>
      </transition>
</template>

<script>
export default {
      name: "IVueWave",
      data () {
            return {
                  animating: true
            }
      },
      props: {
            waveClasses: {
                  type: String,
                  default: null
            },
            waveStyles: {
                  type: String,
                  default: null
            }
      },
      methods: {
            // 动画结束
            end () {
                  this.animating = null;
                  this.$emit('animating-end')
            }
      }
}
</script>
