<template>
      <div>
            <IvueTabs v-model="active" color="#424242">
                  <IvueTab v-for="n in 10" :key="`item${n}`"  :disabled="n === 3" >Item {{ n }}</IvueTab>
                  <IvueTabItem  v-for="n in 10" :key="n">{{text}}{{n}}</IvueTabItem>
            </IvueTabs>

            <IvueTabs color="#424242" centered height="100">
                  <IvueTab v-for="n in 3" :key="n" :rippleCentered="true"><IvueIcon>menu</IvueIcon></IvueTab>
            </IvueTabs>

             <IvueTabs color="#424242" right sliderColor="yellow" >
                  
                  <IvueTab v-for="n in 3" :key="n" :rippleCentered="true"><IvueIcon>menu</IvueIcon></IvueTab>
            </IvueTabs>
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