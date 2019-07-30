<template>
    <div>
        <IvueRadio v-model="active" textColor="red">Radio</IvueRadio>
    </div>
</template>

<script>
export default {
    data () {
        return {
            active: false
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
