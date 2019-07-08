<template>
    <div>
        <p>单选文件</p>
        <IvueUpLoad
            :uploadUrl="'//jsonplaceholder.typicode.com/posts/'"
            :accept="'image/jpeg'"
            :defaultFileList="defaultList"
        >
            <IvueButton class="upload" :ivueRipple="false">
                <IvueIcon>cloud_upload</IvueIcon>上传
            </IvueButton>
        </IvueUpLoad>
        <p>多选文件</p>
        <IvueUpLoad multiple :uploadUrl="'//jsonplaceholder.typicode.com/posts/'">
            <IvueButton class="upload" :ivueRipple="false">
                <IvueIcon>cloud_upload</IvueIcon>上传
            </IvueButton>
        </IvueUpLoad>
        <p>手动上传</p>
        <IvueUpLoad
            :uploadUrl="'//jsonplaceholder.typicode.com/posts/'"
            :beforeUpload="handleUpload"
        >
            <IvueButton class="upload" :ivueRipple="false">
                <IvueIcon>cloud_upload</IvueIcon>上传
            </IvueButton>
        </IvueUpLoad>
        <div v-if="file !== null">
            Upload file: {{ file.name }}
            <IvueButton
                class="upload"
                :ivueRipple="false"
                @click="upload"
                :loading="loadingStatus"
            >{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</IvueButton>
        </div>
        <p>拖拽上传</p>
        <IvueUpLoad :uploadUrl="'//jsonplaceholder.typicode.com/posts/'" multiple type="drag">
            <div style="padding: 20px 0">
                <p>Click or drag files here to upload</p>
            </div>
        </IvueUpLoad>
        <p>自定义上传列表</p>
        <IvueUpLoad
            :uploadUrl="'//jsonplaceholder.typicode.com/posts/'"
            multiple
            :showUploadList="false"
            :defaultFileList="defaultList"
            :onSuccess="handleSuccess"
            :onFormatError="handleFormatError"
            :beforeUpload="handleBeforeUpload"
            type="drag"
            style="display: inline-block;width:58px;"
            ref="upload"
        >
            <div style="width: 58px;height:58px;line-height: 58px;">
                <p>Click or drag files here to upload</p>
            </div>
        </IvueUpLoad>
        <img
            v-for="(item,index) in uploadList"
            :src="item.url"
            :key="index"
            v-if="item.status === 'finished'"
        >
    </div>
</template>

<script>
export default {
    data () {
        return {
            defaultList: [
                {
                    'name': '1',
                    'url': 'https://cn.vuejs.org/images/logo.png'
                },
                {
                    'name': '2',
                    'url': 'https://cn.vuejs.org/images/logo.png'
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

        this.canvasDataURL('https://cn.vuejs.org/images/logo.png',(base64) => {
            console.log(base64)
        })
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
            console.log('??')
            file.url = 'https://cn.vuejs.org/images/logo.png';
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
        },
        canvasDataURL (url, callback) {
            const img = new Image();
            img.crossOrigin = "";
            img.setAttribute("crossOrigin", 'Anonymous')

            // 监听图片加载完成
            img.onload = () => {
                const that = this;
                let imgWidth = img.width;
                let imgHeight = img.height;
                let scale = imgWidth / imgHeight;

                imgHeight = imgWidth / scale;
                // 默认图片质量为0.1
                let quality = 0.1;

                //生成canvas
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                // 创建属性节点
                const canvasW = document.createAttribute("width");
                canvasW.nodeValue = imgWidth;

                const canvasH = document.createAttribute("height");
                canvasH.nodeValue = imgHeight;

                // 设置canvas 宽高
                canvas.setAttributeNode(canvasW);
                canvas.setAttributeNode(canvasH);

                // 绘制图片
                ctx.drawImage(img, 0, 0, imgWidth, imgHeight);

                //  quality值越小，所绘制出的图像越模糊
                const base64 = canvas.toDataURL("image/jpeg", quality);

                callback(base64);
            };

            img.src = url;

        }
    }
}
</script>

<style lang="scss">
.upload {
  border: 1px solid #dcdee2;
}
img {
  width: 50px;
  height: 50px;
}
</style>
