<template>
  <div>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <div>
      <span>Flat</span>
      <IvueButton flat @click="clickBtn" center>默认效果</IvueButton>
      <IvueButton flat :ripple="false">波纹效果关闭</IvueButton>
      <IvueButton flat color="red-accent-4">Accent</IvueButton>
      <IvueButton flat color="blue">Primary</IvueButton>
      <IvueButton flat disabled>disabled</IvueButton>
    </div>
    <div>
      <span>Raised</span>
      <IvueButton>默认效果</IvueButton>
      <IvueButton :ripple="false">波纹效果关闭</IvueButton>
      <IvueButton color="blue">Primary</IvueButton>
      <IvueButton color="red-accent-4">Accent</IvueButton>
      <IvueButton disabled>disabled</IvueButton>
    </div>
    <div>
      <span>depressed</span>
      <IvueButton depressed>默认效果</IvueButton>
      <IvueButton depressed color="red-accent-4">Accent</IvueButton>
    </div>
     <div>
      <span>outline</span>
      <IvueButton outline>默认效果</IvueButton>
      <IvueButton outline color="red-accent-4">Accent</IvueButton>
    </div>
    <div>
      <span>link</span>
      <IvueButton :href="pageUrl">默认效果</IvueButton>
      <IvueButton :href="pageUrl" class="blue">Primary</IvueButton>
      <IvueButton :href="pageUrl" class="red-accent-4">Accent</IvueButton>
      <IvueButton :href="pageUrl" class="ivue-raised blue">Primary</IvueButton>
    </div>
    <div>
      <span>router link</span>
      <IvueButton to="Layout" tag="div">默认效果</IvueButton>
      <IvueButton to="Layout" class="blue">Primary</IvueButton>
      <IvueButton to="Layout" class="red-accent-4">Accent</IvueButton>
    </div>
    <div>
      <span>icon</span>
      <IvueButton icon>
        <IvueIcon>menu</IvueIcon>
      </IvueButton>

      <IvueButton icon flat>
        <IvueIcon>menu</IvueIcon>
      </IvueButton>

      <IvueButton icon color="red-accent-4">
        <IvueIcon>menu</IvueIcon>
      </IvueButton>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    pageUrl () {
      return 'www.baidu.com'
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
