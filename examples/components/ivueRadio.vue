<template>
    <div>
        <IvueRadio
            v-model="active"
            color="primary"
            textColor="primary"
            @on-change="handleChange1"
            rippleDisabled
        >Radio</IvueRadio>
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
        <!-- size -->
        <IvueRadio color="primary" textColor="#000" size="small" label="small"></IvueRadio>
        <IvueRadio color="primary" textColor="#000"  label="default"></IvueRadio>
        <IvueRadio color="primary" textColor="#000" size="large" label="large"></IvueRadio>
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
        handleChange1 (value) {
            console.log(value)
        },
        handleChange2 (value) {
            console.log(value)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
