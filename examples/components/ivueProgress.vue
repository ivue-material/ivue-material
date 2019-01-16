<template>
      <div>
            <IvueProgressLinear :percent="40" color="red-accent-4" ></IvueProgressLinear>
            <IvueProgressLinear :percent="40"  status="active" ></IvueProgressLinear>
            <IvueProgressLinear :percent="65"  status="wrong"></IvueProgressLinear>
            <IvueProgressLinear :percent="100"  ></IvueProgressLinear>
            <IvueProgressLinear :percent="80"  hideText></IvueProgressLinear>
            <IvueProgressLinear :percent="100"  ><span>成功</span></IvueProgressLinear>

            <IvueProgressCircular :percent="20" color="red-accent-4"></IvueProgressCircular>
            <IvueProgressCircular :percent="value" :size="100" :width="15" :rotate="360" color="purple">{{value}}</IvueProgressCircular>
            <IvueProgressCircular :percent="60" status="wrong"></IvueProgressCircular>
            <IvueProgressCircular :percent="80"></IvueProgressCircular>
            <IvueProgressCircular :percent="100"></IvueProgressCircular>
            <IvueProgressCircular :percent="20" indeterminate></IvueProgressCircular>
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
