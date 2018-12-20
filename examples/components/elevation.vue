<template>
      <div class="elevation-demo">
            <IvueContent :class="`ivue-elevation-${index}`" 
                        v-for="(item,index) in length"
                        :key="index">
                  {{index}}
            </IvueContent>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  length: 25
            }
      }

}
</script>

<style lang="scss"> 
.elevation-demo {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
}
.ivue-content {
  width: 100px;
  height: 100px;
  margin: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
