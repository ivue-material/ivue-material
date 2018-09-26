<template>
     <div>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

           <IVueBottomNav :value="true" :position="'absolute'" :active.sync="bottomNav">
                  <IVueButton class="blue">
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
                  bottomNav: 0
            }
      },
      computed: {
            color () {
                  switch (this.bottomNav) {
                        case 0: return 'red'
                  }
            }
      }
}
</script>

<style>
</style>
