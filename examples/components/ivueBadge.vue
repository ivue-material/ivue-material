<template>
      <div>
            <IVueBadge :count="3" color="#ba68c8" :show="show">
                    <a href="#" class="demo-badge"></a>
            </IVueBadge>

             <IVueBadge :count="0" color="purple" :showZero="true">
                    <a href="#" class="demo-badge"></a>
            </IVueBadge>

            <IVueBadge  dot color="#ba68c8" :count="0">
                    <a href="#" class="demo-badge"></a>
            </IVueBadge>

             <IVueBadge  text="123" :offset="[10,10]">
                    <a href="#" class="demo-badge"></a>
            </IVueBadge>

            <IVueBadge dot>
                   <a href="#">可以是一个链接</a>
            </IVueBadge>

            <button @click="onShow">show</button>
      </div>
</template>

<script>
      export default {
            data() {
                  return {
                        show: false
                  }
            },
            methods:{
                  onShow(){
                        this.show = !this.show
                  }
            }
      }
</script>

<style scoped>
 .demo-badge{
        width: 42px;
        height: 42px;
        background: #eee;
        border-radius: 6px;
        display: inline-block;
    }
</style>