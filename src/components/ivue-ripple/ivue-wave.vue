<template>
      <transition name="ivue-ripple" @after-enter="end">
            <span v-show="animating"></span>
      </transition>
</template>

<script>
export default {
      name: "ivue-ripple",
      data () {
            return {
                  animating: true
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
