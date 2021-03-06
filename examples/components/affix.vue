<template>
    <div class="affix-wrapper">
        <div class="affix">
            <ivue-affix @on-change="handleChang">
                <div class="demo-affix">固定在最顶部</div>
            </ivue-affix>

            <ivue-affix :offset-bottom="20">
                <div class="demo-affix">固定在最底部</div>
            </ivue-affix>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        handleChang () {
            console.log('>>>>>>')
        }
    }
}
</script>

<style lang="scss" scope>
.affix {
    margin-top:100px;
    width: 100px;
    height: 3000px;
    background: red;
}

.demo-affix {
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    border-radius: 5px;
    background: rgba(0, 153, 229, 0.7);
    color: #fff;
}
</style>
