<template>
     <div>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

           <p>有主题颜色</p>
            <IVueBottomNav :value="true"  :active.sync="bottomNav" :color="color" key="theme">
                  <IVueButton class="shades-white">
                        <span>Recents</span>
                        <IVueIcon>history</IVueIcon>
                  </IVueButton>
                  <IVueButton class="shades-white">
                        <span>Recents</span>
                        <IVueIcon>history</IVueIcon>
                  </IVueButton>
            </IVueBottomNav>

           <p>基础</p>
           <IVueBottomNav :value="true" :active.sync="bottomNav2" key="base">
                  <IVueButton class="red" key="base1" >
                          <span>Recents</span>
                          <IVueIcon>history</IVueIcon>
                  </IVueButton>
                   <IVueButton class="buld" key="base2">
                          <span>Recents</span>
                          <IVueIcon>history</IVueIcon>
                  </IVueButton>
           </IVueBottomNav>

           <p>不激活时隐藏按钮上的文字</p>
           <IVueBottomNav :value="true" :active.sync="bottomNav3" :shift="true" @onChange="onChange">
                  <IVueButton class="red">
                          <span>Recents</span>
                          <IVueIcon>history</IVueIcon>
                  </IVueButton>
                   <IVueButton class="buld">
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
