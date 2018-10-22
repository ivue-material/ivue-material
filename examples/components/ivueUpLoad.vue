<template>
      <div>
            <IVueUpLoad :uploadUrl="'//jsonplaceholder.typicode.com/posts/'">
                  <IVueButton class="upload"  :ivueRipple="false">
                        <IVueIcon>cloud_upload</IVueIcon>上传
                  </IVueButton>
            </IVueUpLoad>
      </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
      .upload{
            border: 1px solid #dcdee2;
      }
</style>
