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

            <p>自定义上传列表</p>
            <IVueUpLoad :uploadUrl="'//jsonplaceholder.typicode.com/posts/'" 
                        multiple 
                        :showUploadList="false"
                        :defaultFileList="defaultList"
                        :onSuccess="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :maxSize="20"
                        :onFormatError="handleFormatError"
                        :beforeUpload="handleBeforeUpload"
                        type="drag"
                        style="display: inline-block;width:58px;"
                        ref="upload"
            >
                  <div style="width: 58px;height:58px;line-height: 58px;">
                        <p>Click or drag files here to upload</p>
                  </div>
            </IVueUpLoad>
            <img v-for="item in uploadList" :src="item.url" :key="item.url" v-if="item.status === 'finished'"/>
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
                  loadingStatus: false,
                  imgName: '',
                  visible: false,
                  uploadList: []
            }
      },
      mounted () {
            this.uploadList = this.$refs.upload.fileList;
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
            },
            handleSuccess (res, file) {
                  file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                  file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            handleFormatError (file) {
                  console.error('File format of ' + file.name + ' is incorrect, please select jpg or png.');
            },
            handleBeforeUpload () {
                  const check = this.uploadList.length <= 5;
                  if (!check) {
                        console.error('Up to five pictures can be uploaded.');
                  }
                  return check;
            }
      }
}
</script>

<style lang="scss">
.upload {
  border: 1px solid #dcdee2;
}
</style>
