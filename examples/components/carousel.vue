<template>
    <div>
        <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
        />
        开启loop
        <!-- <ivue-switch @on-change="handleChange">
            <span slot="open">开</span>
            <span slot="close">关</span>
        </ivue-switch> -->
        <p>基础用法</p>
        <ivue-carousel v-model="value1" :loop="loop" >
            <ivue-carousel-item>
                <div class="demo-carousel" style="background: red">1</div>
            </ivue-carousel-item>
            <ivue-carousel-item>
                <div class="demo-carousel" style="background: yellow">2</div>
            </ivue-carousel-item>
            <ivue-carousel-item>
                <div class="demo-carousel">3</div>
            </ivue-carousel-item>
        </ivue-carousel>

        <p>自动切换</p>
        <ivue-carousel v-model="value1" loop autoplay>
            <ivue-carousel-item>
                <div class="demo-carousel">1</div>
            </ivue-carousel-item>
            <ivue-carousel-item>
                <div class="demo-carousel">2</div>
            </ivue-carousel-item>
            <ivue-carousel-item>
                <div class="demo-carousel">3</div>
            </ivue-carousel-item>
        </ivue-carousel>
        <p>综合设置</p>
        <ivue-carousel
            v-model="value1"
            :autoplay="autoplay"
            :autoplaySpeed="autoplaySpeed"
            :dots="dots"
            :radiusDot="radiusDot"
            :trigger="trigger"
            :arrow="arrow"
        >
            <ivue-carousel-item>
                <div class="demo-carousel">1</div>
            </ivue-carousel-item>
            <ivue-carousel-item>
                <div class="demo-carousel">2</div>
            </ivue-carousel-item>
            <ivue-carousel-item>
                <div class="demo-carousel">3</div>
            </ivue-carousel-item>
        </ivue-carousel>
    </div>
</template>

<script>
export default {
    data () {
        return {
            value1: 0,
            autoplay: true,
            autoplaySpeed: 1000,
            dots: 'inside',
            radiusDot: true,
            trigger: 'click',
            arrow: 'always',
            loop: false
        }
    },
    methods: {
        handleChange () {
            this.loop = !this.loop
        }
    }
}
</script>

<style lang="scss">
.demo-carousel {
    height: 200px;
    line-height: 200px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background: #506b9e;
}
</style>
