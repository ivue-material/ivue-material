<template>
      <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            开启loop
            <ivue-switch @on-change="handleChange">
                  <span slot="open">开</span>
                  <span slot="close">关</span>
            </ivue-switch>

            <p>基础用法</p>
            <IvueCarousel v-model="value1" :loop="loop">
                  <IvueCarouselItem>
                        <div class="demo-carousel" style="background:red">1</div>
                  </IvueCarouselItem>
                  <IvueCarouselItem>
                        <div class="demo-carousel" style="background:yellow">2</div>
                  </IvueCarouselItem>
                  <IvueCarouselItem>
                        <div class="demo-carousel">3</div>
                  </IvueCarouselItem>
            </IvueCarousel>

            <p>自动切换</p>
            <!-- <IvueCarousel v-model="value1" loop autoplay>
                  <IvueCarouselItem>
                        <div class="demo-carousel">1</div>
                  </IvueCarouselItem>
                  <IvueCarouselItem>
                        <div class="demo-carousel">2</div>
                  </IvueCarouselItem>
                  <IvueCarouselItem>
                        <div class="demo-carousel">3</div>
                  </IvueCarouselItem>
            </IvueCarousel>

            <p>综合设置</p>
            <IvueCarousel
                  v-model="value1"
                  :autoplay="autoplay"
                  :autoplaySpeed="autoplaySpeed"
                  :dots="dots"
                  :radiusDot="radiusDot"
                  :trigger="trigger"
                  :arrow="arrow"
            >
                  <IvueCarouselItem>
                        <div class="demo-carousel">1</div>
                  </IvueCarouselItem>
                  <IvueCarouselItem>
                        <div class="demo-carousel">2</div>
                  </IvueCarouselItem>
                  <IvueCarouselItem>
                        <div class="demo-carousel">3</div>
                  </IvueCarouselItem>
            </IvueCarousel> -->
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
                  arrow: 'always',
                  loop:false
            }
      },
      methods: {
            handleChange () {
                  this.loop = !this.loop
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
