<template>
      <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

            <p>基础用法</p>
            <IVueCarousel v-model="value1" loop>
                  <IVueCarouselItem>
                        <div class="demo-carousel" style="background:red">1</div>
                  </IVueCarouselItem>
                  <IVueCarouselItem>
                        <div class="demo-carousel" style="background:yellow">2</div>
                  </IVueCarouselItem>
                    <IVueCarouselItem>
                        <div class="demo-carousel">3</div>
                  </IVueCarouselItem>
            </IVueCarousel>

            <p>自动切换</p>
            <IVueCarousel v-model="value1" loop autoplay>
                  <IVueCarouselItem>
                        <div class="demo-carousel">1</div>
                  </IVueCarouselItem>
                  <IVueCarouselItem>
                        <div class="demo-carousel">2</div>
                  </IVueCarouselItem>
                    <IVueCarouselItem>
                        <div class="demo-carousel">3</div>
                  </IVueCarouselItem>
            </IVueCarousel>

            <p>综合设置</p>
            <IVueCarousel  v-model="value1" 
                           :autoplay="autoplay"
                           :autoplaySpeed="autoplaySpeed"
                           :dots="dots"
                           :radiusDot="radiusDot"
                           :trigger="trigger"
                           :arrow="arrow"
            >
                  <IVueCarouselItem>
                        <div class="demo-carousel">1</div>
                  </IVueCarouselItem>
                  <IVueCarouselItem>
                        <div class="demo-carousel">2</div>
                  </IVueCarouselItem>
                    <IVueCarouselItem>
                        <div class="demo-carousel">3</div>
                  </IVueCarouselItem>
            </IVueCarousel>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  value1: 0,
                  autoplay: true,
                  autoplaySpeed: 10000,
                  dots: 'inside',
                  radiusDot: true,
                  trigger: 'click',
                  arrow: 'always'
            }
      }
}
</script>

<style lang="scss">
.demo-carousel {
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #506b9e;
}
</style>
