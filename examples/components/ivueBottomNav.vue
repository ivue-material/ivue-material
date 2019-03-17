<template>
    <div>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <p>有主题颜色</p>
        <IvueBottomNav :value="true" :active.sync="bottomNav">
            <IvueButton flat color="primary">
                <span>Recents</span>
                <IvueIcon>history</IvueIcon>
            </IvueButton>
            <IvueButton flat color="pink">
                <span>Favorites</span>
                <IvueIcon>favorite</IvueIcon>
            </IvueButton>
        </IvueBottomNav>
        <p>基础</p>
        <IvueBottomNav :value="true" :active.sync="bottomNav" key="base" :height="'100'">
            <IvueButton flat color="red-accent-4" key="base1" to="/IvueBottomNav">
                <span>Recents</span>
                <IvueIcon>history</IvueIcon>
            </IvueButton>
            <IvueButton flat color="blue" key="base2" to="/IvueBottomNav?q=q" tag="div">
                <span>Recents</span>
                <IvueIcon>history</IvueIcon>
            </IvueButton>
        </IvueBottomNav>
        <p>不激活时隐藏按钮上的文字</p>
        <IvueBottomNav :value="true" :active.sync="bottomNav3" :shift="true" @onChange="onChange">
            <IvueButton flat color="red-accent-4">
                <span>Recents</span>
                <IvueIcon>history</IvueIcon>
            </IvueButton>
            <IvueButton flat color="buld">
                <span>Recents</span>
                <IvueIcon>history</IvueIcon>
            </IvueButton>
        </IvueBottomNav>
    </div>
</template>

<script>
export default {
    data () {
        return {
            bottomNav: 0,
            bottomNav2: 1,
            bottomNav3: 0,
            showNav: true
        }
    },
    computed: {
        color () {
            switch (this.bottomNav) {
                case 0: return 'red'
                case 1: return 'lime'
            }
        }
    },
    methods: {
        onChange (data) {
            console.log(data)
        }
    }
}
</script>

<style>
</style>
