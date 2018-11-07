<template>
      <div>
            <IVueTabs color="#424242" v-model="active">
                  <IVueTab v-for="n in 3" :key="n"  >Item {{ n }}<p>1</p></IVueTab>
            </IVueTabs>

            <IVueTabs color="#424242" centered>
                  <IVueTab v-for="n in 3" :key="n" :rippleCentered="true">Item {{ n }}</IVueTab>
            </IVueTabs>

             <IVueTabs color="#424242" right>
                  <IVueTab v-for="n in 3" :key="n" :rippleCentered="true">Item {{ n }}</IVueTab>
            </IVueTabs>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  active: 2
            }
      }
}
</script>

<style>
</style>
