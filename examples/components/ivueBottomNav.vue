<template>
  <div>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <p>有主题颜色</p>
    <!-- <IVueBottomNav :value="true" :active.sync="bottomNav" :color="color" key="theme">
      <IVueButton flat color="red-accent-4">
        <span>Recents</span>
        <IVueIcon>history</IVueIcon>
      </IVueButton>
      <IVueButton flat color="blue">
        <span>Recents</span>
        <IVueIcon>history</IVueIcon>
      </IVueButton>
    </IVueBottomNav>-->
    <p>基础</p>
    <IVueBottomNav :value="true" :active.sync="bottomNav" key="base" :height="'100'">
      <IVueButton flat color="red-accent-4" key="base1" to="/IVueBottomNav">
        <span>Recents</span>
        <IVueIcon>history</IVueIcon>
      </IVueButton>
      <IVueButton flat color="blue" key="base2" to="/IVueBottomNav?q=q">
        <span>Recents</span>
        <IVueIcon>history</IVueIcon>
      </IVueButton>
    </IVueBottomNav>
    
    <p>不激活时隐藏按钮上的文字</p>
    <IVueBottomNav :value="true" :active.sync="bottomNav3" :shift="true" @onChange="onChange">
      <IVueButton flat color="red-accent-4">
        <span>Recents</span>
        <IVueIcon>history</IVueIcon>
      </IVueButton>
      <IVueButton flat color="buld">
        <span>Recents</span>
        <IVueIcon>history</IVueIcon>
      </IVueButton>
    </IVueBottomNav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bottomNav: 0,
      bottomNav2: 1,
      bottomNav3: 0
    }
  },
  computed: {
    color () {
      switch (this.bottomNav) {
        case 0: return 'red'
        case 1: return 'lime'
      }
    }
  },
  methods: {
    onChange (data) {
      console.log(data)
    }
  }
}
</script>

<style>
</style>
