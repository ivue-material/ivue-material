<template>
      <div>
            <IVueTabs v-model="active" color="#424242">
                  <IVueTab v-for="n in 10" :key="`item${n}`"  :disabled="n === 3" >Item {{ n }}</IVueTab>
                  <IVueTabItem  v-for="n in 10" :key="n">{{text}}{{n}}</IVueTabItem>
            </IVueTabs>

            <IVueTabs color="#424242" centered height="100">
                  <IVueTab v-for="n in 3" :key="n" :rippleCentered="true"><IVueIcon>menu</IVueIcon></IVueTab>
            </IVueTabs>

             <IVueTabs color="#424242" right sliderColor="yellow" >
                  
                  <IVueTab v-for="n in 3" :key="n" :rippleCentered="true"><IVueIcon>menu</IVueIcon></IVueTab>
            </IVueTabs>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  active: 5,
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
      }
}
</script>

<style>
</style>
