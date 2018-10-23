<template>
      <div>
            <p>单选文件</p>
            <IVueUpLoad :uploadUrl="'//jsonplaceholder.typicode.com/posts/'"  :accept="'image/jpeg'" :defaultFileList="defaultList">
                  <IVueButton class="upload"  :ivueRipple="false">
                        <IVueIcon>cloud_upload</IVueIcon>上传
                  </IVueButton>
            </IVueUpLoad>

            <p>多选文件</p>
            <IVueUpLoad multiple :uploadUrl="'//jsonplaceholder.typicode.com/posts/'">
                  <IVueButton class="upload"  :ivueRipple="false">
                        <IVueIcon>cloud_upload</IVueIcon>上传
                  </IVueButton>
            </IVueUpLoad>

            <p>手动上传</p>
            <IVueUpLoad :uploadUrl="'//jsonplaceholder.typicode.com/posts/'" :beforeUpload="handleUpload">
                  <IVueButton class="upload"  :ivueRipple="false">
                        <IVueIcon>cloud_upload</IVueIcon>上传
                  </IVueButton>
            </IVueUpLoad>
            <div v-if="file !== null">Upload file: {{ file.name }} 
                   <IVueButton class="upload"  :ivueRipple="false" @click="upload" :loading="loadingStatus">
                        {{ loadingStatus ? 'Uploading' : 'Click to upload' }}
                  </IVueButton>
            </div>

            <p>拖拽上传</p>
            <IVueUpLoad :uploadUrl="'//jsonplaceholder.typicode.com/posts/'" multiple type="drag">
                  <div style="padding: 20px 0">
                        <p>Click or drag files here to upload</p>
                  </div>
            </IVueUpLoad>

      </div>
</template>

<script>
export default {
      data () {
            return {
                  defaultList: [
                        {
                              'name': 'a42bdcc1178e62b4694c830f028db5c0',
                              'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                        },
                        {
                              'name': 'bc7521e033abdd1e92222d733590f104',
                              'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                        }
                  ],
                  file: null,
                  loadingStatus: false
            }
      },
      methods: {
            handleUpload (file) {
                  this.file = file;
                  return false;
            },
            upload () {
                  this.loadingStatus = true;
                  setTimeout(() => {
                        this.file = null;
                        this.loadingStatus = false;
                  }, 1500);
            }
      }
}
</script>

<style lang="scss">
.upload {
  border: 1px solid #dcdee2;
}
</style>
