<template>
    <div>
        <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
        />
        <p>有主题颜色</p>

        <ivue-switch
            color="#13ce66"
            false-color="#ff4949"
            v-model="showNav"
        ></ivue-switch>

        <ivue-bottom-nav
            v-model:active="bottomNav"
            shift
            @on-change="handleChange"
            position="fixed"

        >
            <ivue-bottom-nav-item
                label="Home"
                icon="history"
                :color="color"
                id="1"
                to="/123"
            >
            </ivue-bottom-nav-item>

            <ivue-bottom-nav-item
                label="Favorites"
                icon="favorite"
                :color="color"
                rippleDisabled
                id="2"
            >
            </ivue-bottom-nav-item>
        </ivue-bottom-nav>

        <h1>基础</h1>
        <ivue-bottom-nav
            :value="true"
            :active.sync="bottomNav"
            key="base"
            :height="'100'"
        >
            <ivue-bottom-nav-item
                flat
                color="red-accent-4"
                key="base1"
                to="/ivue-bottom-nav"
            >
                <span>Recents</span>
                <ivue-icon>history</ivue-icon>
            </ivue-bottom-nav-item>
            <ivue-bottom-nav-item
                flat
                color="blue"
                key="base2"
                to="/ivue-bottom-nav?q=q"
                tag="div"
            >
                <span>Recents</span>
                <ivue-icon>history</ivue-icon>
            </ivue-bottom-nav-item>
        </ivue-bottom-nav>

        <h1>不激活时隐藏按钮上的文字</h1>
        <br />
        <ivue-bottom-nav :value="true" :active.sync="bottomNav3" :shift="true">
            <ivue-bottom-nav-item flat color="red-accent-4">
                <span>Recents</span>
                <ivue-icon>history</ivue-icon>
            </ivue-bottom-nav-item>
            <ivue-bottom-nav-item flat color="blue">
                <span>Recents</span>
                <ivue-icon>history</ivue-icon>
            </ivue-bottom-nav-item>
        </ivue-bottom-nav>
    </div>
</template>

<script>
export default {
    data () {
        return {
            bottomNav: '1',
            bottomNav2: 1,
            bottomNav3: 0,
            showNav: true
        }
    },
    computed: {
        color () {
            switch (this.bottomNav) {
                case '1': return 'red'
                case '2': return 'lime'
            }
        }
    },
    methods: {
        handleChange (data) {
            console.log(data)
        }
    }
}
</script>

<style scope>
</style>
