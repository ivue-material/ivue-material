<template>
      <div>
            <IVueTabs color="#424242">
                  <IVueTab v-for="n in 3" :key="n" :disabled="n=== 2">Item {{ n }}</IVueTab>
            </IVueTabs>
      </div>
</template>

<script>
export default {

}
</script>

<style>
</style>
