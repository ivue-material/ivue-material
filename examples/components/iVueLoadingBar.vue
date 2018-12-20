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
                  this.$IvueLoadingBar.start();
            },
            finish () {
                  this.$IvueLoadingBar.finish();
            },
            error () {
                  this.$IvueLoadingBar.error();
            },
            update(){
                  this.$IvueLoadingBar.update(50);
            }
      }
}
</script>

<style>
</style>
