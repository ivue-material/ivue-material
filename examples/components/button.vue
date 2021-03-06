<template>
    <div>
        <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
        />
        <div>
            <span>Flat</span>
            <ivue-button flat @click="clickBtn" center>默认效果</ivue-button>
            <ivue-button flat :ripple="false">波纹效果关闭</ivue-button>
            <ivue-button flat color="red-accent-4">Accent</ivue-button>
            <ivue-button flat color="blue">Primary</ivue-button>
            <ivue-button flat disabled>disabled</ivue-button>
        </div>

        <div>
            <span>Raised</span>
            <ivue-button>默认效果</ivue-button>
            <ivue-button :ripple="false">波纹效果关闭</ivue-button>
            <ivue-button color="blue">Primary</ivue-button>
            <ivue-button color="red-accent-4">Accent</ivue-button>
            <ivue-button disabled>disabled</ivue-button>
        </div>

        <div>
            <span>depressed</span>
            <ivue-button depressed>默认效果</ivue-button>
            <ivue-button depressed color="red-accent-4">Accent</ivue-button>
        </div>
        <div>
            <span>outline</span>
            <ivue-button outline>默认效果</ivue-button>
            <ivue-button outline color="red-accent-4">Accent</ivue-button>
        </div>
        <div>
            <span>link</span>
            <ivue-button :href="pageUrl">默认效果</ivue-button>
            <ivue-button :href="pageUrl" class="blue">Primary</ivue-button>
            <ivue-button :href="pageUrl" class="red-accent-4">Accent</ivue-button>
            <ivue-button :href="pageUrl" class="ivue-raised blue"
                >Primary</ivue-button
            >
        </div>

        <div>
            <span>icon</span>
            <ivue-button icon>
                <ivue-icon>menu</ivue-icon>
            </ivue-button>

            <ivue-button icon flat>
                <ivue-icon>menu</ivue-icon>
            </ivue-button>

            <ivue-button icon color="red-accent-4">
                <ivue-icon>menu</ivue-icon>
            </ivue-button>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        pageUrl () {
            return 'www.baidu.com'
        }
    },
    methods: {
        clickBtn () {
            console.log("..")
        }
    }
}
</script>

<style lang="scss">
body {
    background: #eee;
}
</style>
