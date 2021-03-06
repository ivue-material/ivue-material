<template>
    <div>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <p>有主题颜色</p>
        <ivue-bottom-nav :value="true" :active.sync="bottomNav">
            <ivue-button flat color="primary">
                <span>Recents</span>
                <!-- <IvueIcon>history</IvueIcon> -->
            </ivue-button>
            <ivue-button flat color="pink">
                <span>Favorites</span>
                <!-- <IvueIcon>favorite</IvueIcon> -->
            </ivue-button>

            <ivue-bottom-nav-item>123</ivue-bottom-nav-item>
        </ivue-bottom-nav>
        <!-- <p>基础</p>
        <ivue-bottom-nav :value="true" :active.sync="bottomNav" key="base" :height="'100'">
            <ivue-button flat color="red-accent-4" key="base1" to="/ivue-bottom-nav">
                <span>Recents</span>
                <IvueIcon>history</IvueIcon>
            </ivue-button>
            <ivue-button flat color="blue" key="base2" to="/ivue-bottom-nav?q=q" tag="div">
                <span>Recents</span>
                <IvueIcon>history</IvueIcon>
            </ivue-button>
        </ivue-bottom-nav>
        <p>不激活时隐藏按钮上的文字</p>
        <ivue-bottom-nav :value="true" :active.sync="bottomNav3" :shift="true" @onChange="onChange">
            <ivue-button flat color="red-accent-4">
                <span>Recents</span>
                <IvueIcon>history</IvueIcon>
            </ivue-button>
            <ivue-button flat color="buld">
                <span>Recents</span>
                <IvueIcon>history</IvueIcon>
            </ivue-button>
        </ivue-bottom-nav> -->
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
