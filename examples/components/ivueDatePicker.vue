<template>
      <div>
            <IVueDatePicker :value="picker"></IVueDatePicker>
            <IVueDatePicker :value="picker" locale="zh-CH"></IVueDatePicker>
      </div>
</template>

<script>
      export default {
            data() {
                  return {
                        picker: new Date().toISOString().substr(0, 10),
                  }
            }
      }
</script>

<style scoped>

</style>