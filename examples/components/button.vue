<template>
  <div>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <div>
      <span>Flat</span>
      <IVueButton flat @click="clickBtn">默认效果</IVueButton>
      <IVueButton flat :ivueRipple="false">波纹效果关闭</IVueButton>
      <IVueButton flat color="red-accent-4">Accent</IVueButton>
      <IVueButton flat color="blue">Primary</IVueButton>
      <IVueButton flat disabled>disabled</IVueButton>
    </div>
    <div>
      <span>Raised</span>
      <IVueButton>默认效果</IVueButton>
      <IVueButton :ivueRipple="false">波纹效果关闭</IVueButton>
      <IVueButton color="blue">Primary</IVueButton>
      <IVueButton color="red-accent-4">Accent</IVueButton>
      <IVueButton disabled>disabled</IVueButton>
    </div>
    <div>
      <span>depressed</span>
      <IVueButton depressed>默认效果</IVueButton>
      <IVueButton depressed color="red-accent-4">Accent</IVueButton>
    </div>
     <div>
      <span>outline</span>
      <IVueButton outline>默认效果</IVueButton>
      <IVueButton outline color="red-accent-4">Accent</IVueButton>
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
      <IVueButton to="Layout" tag="div">默认效果</IVueButton>
      <IVueButton to="Layout" class="blue">Primary</IVueButton>
      <IVueButton to="Layout" class="red-accent-4">Accent</IVueButton>
    </div>
    <div>
      <span>icon</span>
      <IVueButton icon>
        <IVueIcon>menu</IVueIcon>
      </IVueButton>

      <IVueButton icon flat>
        <IVueIcon>menu</IVueIcon>
      </IVueButton>

      <IVueButton icon color="red-accent-4">
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
