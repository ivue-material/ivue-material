<template>
    <div>
        <IvueRadio v-model="active" color="primary" textColor="#000" @on-change="handleChange1">Radio</IvueRadio>
        <IvueRadio v-model="active" color="primary" textColor="#000" disabled>Radio</IvueRadio>
        <IvueRadioGroup v-model="value1">
            <IvueRadio color="primary" textColor="#000" label="1"></IvueRadio>
            <IvueRadio color="primary" textColor="#000" label="2"></IvueRadio>
            <IvueRadio color="primary" textColor="#000" label="3"></IvueRadio>
        </IvueRadioGroup>

         <IvueRadioGroup v-model="value2" vertical @on-change="handleChange2">
            <IvueRadio color="primary" textColor="#000" label="1"></IvueRadio>
            <IvueRadio color="primary" textColor="#000" label="2"></IvueRadio>
            <IvueRadio color="primary" textColor="#000" label="3"></IvueRadio>
        </IvueRadioGroup>
    </div>
</template>

<script>
export default {
    data () {
        return {
            active: false,
            value1: '1',
            value2: '1',
        }
    },
    methods: {
        handleChange1(value){
            console.log(value)
        },
        handleChange2(value){
            console.log(value)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
