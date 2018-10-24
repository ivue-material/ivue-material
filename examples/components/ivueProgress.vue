<template>
      <div>
            <IVueProgressLinear :percent="40" class="red-accent-4" ></IVueProgressLinear>
            <IVueProgressLinear :percent="40"  status="active" ></IVueProgressLinear>
            <IVueProgressLinear :percent="65"  status="wrong"></IVueProgressLinear>
            <IVueProgressLinear :percent="100"  ></IVueProgressLinear>
            <IVueProgressLinear :percent="80"  hideText></IVueProgressLinear>
            <IVueProgressLinear :percent="100"  ><span>成功</span></IVueProgressLinear>

            <IVueProgressCircular :percent="20" class="red-accent-4"></IVueProgressCircular>
            <IVueProgressCircular :percent="value" :size="100" :width="15" :rotate="360" class="purple">{{value}}</IVueProgressCircular>
            <IVueProgressCircular :percent="60" status="wrong"></IVueProgressCircular>
            <IVueProgressCircular :percent="80"></IVueProgressCircular>
            <IVueProgressCircular :percent="100"></IVueProgressCircular>
            <IVueProgressCircular :percent="20" indeterminate></IVueProgressCircular>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  interval: {},
                  value: 0
            }
      },
      beforeDestroy () {
            clearInterval(this.interval)
      },
      mounted () {
            this.interval = setInterval(() => {
                  if (this.value === 100) {
                        return (this.value = 0)
                  }
                  this.value += 10
            }, 1000)
      }
}
</script>

<style>
</style>
