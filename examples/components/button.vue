<template>
      <div>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div>
          <span>Flat</span>
          <IVueButton @click="clickBtn">默认效果</IVueButton>
          <IVueButton :ivueRipple="false">波纹效果关闭</IVueButton>
          <IVueButton class="red-accent-4">Accent</IVueButton>
          <IVueButton class="blue">Primary</IVueButton>
          <IVueButton disabled>disabled</IVueButton>
        </div>
        <div>
          <span>Raised</span>
          <IVueButton class="ivue-raised" >默认效果</IVueButton>
          <IVueButton class="ivue-raised" :ivueRipple="false">波纹效果关闭</IVueButton>
          <IVueButton class="ivue-raised blue">Primary</IVueButton>
          <IVueButton class="ivue-raised red-accent-4">Accent</IVueButton>
          <IVueButton class="ivue-raised" disabled>disabled</IVueButton>
        </div>
        <div>
          <span>no elevation</span>
          <IVueButton class="ivue-raised-noElevation">默认效果</IVueButton>
          <IVueButton class="ivue-raised-noElevation red-accent-4">Accent</IVueButton>
          <IVueButton class="ivue-raised-noElevation blue">Primary</IVueButton>
        </div>
        <div>
          <span>link</span>
          <IVueButton :href="pageUrl">默认效果</IVueButton>
          <IVueButton :href="pageUrl" class="blue">Primary</IVueButton>
          <IVueButton :href="pageUrl" class="red-accent-4">Accent</IVueButton>
          <IVueButton :href="pageUrl" class="ivue-raised blue">Primary</IVueButton>
        </div>
         <div>
          <span>router link</span>
          <IVueButton to="Layout">默认效果</IVueButton>
          <IVueButton to="Layout" class="blue">Primary</IVueButton>
          <IVueButton to="Layout" class="red-accent-4">Accent</IVueButton>
        </div>
        <div>
          <span>icon</span>
          <IVueButton class="ivue-icon-button">
            <IVueIcon>menu</IVueIcon>
          </IVueButton>

           <IVueButton class="ivue-icon-button ivue-raised ">
            <IVueIcon>menu</IVueIcon>
          </IVueButton>

          <IVueButton class="ivue-icon-button ivue-raised  red-accent-4">
            <IVueIcon>menu</IVueIcon>
          </IVueButton>
        </div>
      </div>
</template>

<script>
export default {
  computed: {
    pageUrl () {
      return window.location.href
    }
  },
  methods: {
    clickBtn () {
      console.log("..")
    }
  }
}
</script>

<style lang="scss">
body {
  background: #eee;
}
</style>
