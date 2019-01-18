<template>
      <div>
            <ivue-affix>
                  <div class="demo-affix">固定在最顶部</div>
            </ivue-affix>
      </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
body {
      overflow: scroll;
      height: 100px;
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
