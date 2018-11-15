<template>
      <div>
            <Button @click="start">Start</Button>
            <Button @click="finish">Finish</Button>
            <Button @click="error">Error</Button>
            <Button @click="update">update</Button>
      </div>
</template>

<script>
export default {
      methods: {
            start () {
                  this.$IVueLoadingBar.start();
            },
            finish () {
                  this.$IVueLoadingBar.finish();
            },
            error () {
                  this.$IVueLoadingBar.error();
            },
            update(){
                  this.$IVueLoadingBar.update(50);
            }
      }
}
</script>

<style>
</style>
