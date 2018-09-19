<template>
      <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

            <IVueCarousel loop>
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

}
</script>

<style>
.demo-carousel {
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #506b9e;
}
</style>
