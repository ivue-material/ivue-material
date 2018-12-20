<template>
  <div>
    <IvueContent>
      <div class="demo-affix">固定在最顶部</div>
    </IvueContent>

    <ivue-content>
      <div class="demo-affix">固定在最顶部</div>
    </ivue-content>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
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
