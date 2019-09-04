<template>
    <div>
        <IvuePage :total="100" :bgList="bgList" :colorList="colorList" v-model="value"></IvuePage>
        <IvuePage :total="100" :bgList="bgList" :colorList="colorList" :pageSize="10"></IvuePage>
        <IvuePage :total="10" circle></IvuePage>

        <IvuePage :total="100" :bgList="bgList" :colorList="colorList" :pageSize="10" :pageSizeOpts="[10,20,30]" showElevator></IvuePage>

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
