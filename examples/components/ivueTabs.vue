<template>
      <div>
            <IVueTabs color="#424242" v-model="active">
                  <IVueTab v-for="n in 3" :key="n"  >Item {{ n }}</IVueTab>
                  <IVueTabItem  v-for="n in 3"
          :key="n">{{text}}{{n}}</IVueTabItem>
            </IVueTabs>

            <!-- <IVueTabs color="#424242" centered>
                  <IVueTab v-for="n in 3" :key="n" :rippleCentered="true">Item {{ n }}</IVueTab>
            </IVueTabs>

             <IVueTabs color="#424242" right>
                  <IVueTab v-for="n in 3" :key="n" :rippleCentered="true">Item {{ n }}</IVueTab>
            </IVueTabs> -->
      </div>
</template>

<script>
export default {
      data () {
            return {
                  active: 2,
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
      }
}
</script>

<style>
</style>
