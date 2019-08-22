<template>
    <div>
        <IvueCheckbox
            color="red"
            textColor="#000"
            v-model="active"
            rippleDisabled
            @on-change="handleChange"
        >default</IvueCheckbox>
        <IvueCheckbox color="red" textColor="#000" disabled v-model="active">disabled</IvueCheckbox>
        <IvueCheckbox color="red" textColor="#000" v-model="active" indeterminate>indeterminate</IvueCheckbox>
        <IvueCheckboxGroup v-model="value1" @on-change="handleChange">
            <IvueCheckbox color="primary" textColor="#000" label="1"></IvueCheckbox>
            <IvueCheckbox color="primary" textColor="#000" label="2"></IvueCheckbox>
            <IvueCheckbox color="primary" textColor="#000" label="3"></IvueCheckbox>
        </IvueCheckboxGroup>
        {{value1}}
        <IvueCheckbox color="red" textColor="#000" v-model="active" size="small" indeterminate>small</IvueCheckbox>
        <IvueCheckbox color="red" textColor="#000" v-model="active" size="default" indeterminate>default</IvueCheckbox>
        <IvueCheckbox color="red" textColor="#000" v-model="active" size="large" indeterminate>large</IvueCheckbox>
    </div>
</template>

<script>
export default {
    data () {
        return {
            active: true,
            value1: ['1']
        }
    },
    methods: {
        handleChange (value) {
            console.log(value)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
