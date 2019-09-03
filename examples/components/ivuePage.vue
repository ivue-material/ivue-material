<template>
    <div>
        <IvuePage :total="10" :bgList="bgList" :colorList="colorList" v-model="value"></IvuePage>
        <IvuePage :total="1"></IvuePage>
        {{value}}
    </div>
</template>

<script>
export default {
    data () {
        return {
            value: 2,
            colorList: ['#fff'],
            bgList: ['#F41D74', 'orange']
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
