<template>
    <div>
        <IvueChip v-ripple>hello</IvueChip>
        <IvueChip disabled>hello</IvueChip>
        <IvueChip color="primary" text-color="#ffffff">hello</IvueChip>
        <IvueChip color="primary" text-color="#ffffff">
            <IvueIcon>build</IvueIcon>Icon
        </IvueChip>
        <IvueChip outline color="primary">hello</IvueChip>
        <IvueChip square color="primary">hello</IvueChip>
        <IvueChip square color="primary" text-color="#ffffff" close v-model="chip">hello</IvueChip>
        <IvueChip color="cyan" text-color="#ffffff" close>
            <IvueIcon>mood</IvueIcon>New Tweets
        </IvueChip>
    </div>
</template>

<script>
export default {
    data () {
        return {
            chip: true
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
