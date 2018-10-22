<template>
      <div :class="prefixCls">
            <!-- 输入框 -->
            <div :class="inputWrapClass"
                 @click="handleClickInputWrap"
            >
                  <input :class="`${prefixCls}-input`"
                         type="file" 
                         ref="input"
                         @change="handleChange"
                         />
                  <slot></slot>
            </div>
            <IVueUpLoadList :files="fileList"></IVueUpLoadList>
      </div>
</template>

<script>
import IVueUpLoadList from './IVueUpLoadList';
import { oneOf } from '../../utils/Assist';
import ajax from './ajax';

const prefixCls = 'ivue-upload';

export default {
      name: "IVueUpLoad",
      props: {
            /*
            * 文件上传地址
            * 
            * @type {String}
            */
            uploadUrl: {
                  type: String,
                  required: true
            },
            /*
            * 上传组件类型
            * 
            * @type {String}
            * 
            * select (点击选择)
            * 
            * drag (支持拖动)
            */
            type: {
                  type: String,
                  validator (value) {
                        return oneOf(value, ['select', 'drag']);
                  },
                  default: 'select'
            },
            /*
            * 上传文件字段名
            * 
            * @type {String}
            */
            name: {
                  type: String,
                  default: 'file'
            },
            /*
            * 是否Access-Control应使用cookie
            * 
            * @type {Boolean}
            */
            withCredentials: {
                  type: Boolean,
                  default: false
            },
            /*
            * 文件上传时的钩子
            * 
            * @type {Function}
            */
            onProgress: {
                  type: Function,
                  default () {
                        return {};
                  }
            },
            /*
            * 文件上传成功
            * 
            * @type {Function}
            */
            onSuccess: {
                  type: Function,
                  default () {
                        return {};
                  }
            },
            /*
            * 文件上传失败
            * 
            * @type {Function}
            */
            onError: {
                  type: Function,
                  default () {
                        return {};
                  }
            }
      },
      data () {
            return {
                  prefixCls: prefixCls,
                  // 上传文件的列表
                  fileList: [],
                  tempIndex: 1
            }
      },
      computed: {
            inputWrapClass () {
                  return [
                        {
                              [`${prefixCls}-select`]: this.type === 'select'
                        }
                  ]
            }
      },
      methods: {
            // 输入框点击
            handleClickInputWrap () {
                  this.$refs.input.click();
            },
            // 输入框提交数据
            handleChange (e) {
                  const files = e.target.files;

                  if (!files) {
                        return;
                  }
                  this.uploadFiles(files)
            },
            // 获取上传文件
            uploadFiles (files) {
                  let arrayFiles = Array.prototype.slice.call(files);

                  arrayFiles = arrayFiles.slice(0, 1);

                  if (arrayFiles.length === 0) {
                        return;
                  }

                  arrayFiles.forEach((file) => {
                        this.upload(file);
                  });
            },
            upload (file) {
                  this.post(file);
            },
            // 发送文件事件
            post (file) {

                  // 记录上传文件列表
                  this.handleStart(file);

                  ajax({
                        file: file,
                        filename: this.name,
                        uploadUrl: this.uploadUrl,
                        withCredentials: this.withCredentials,
                        // 上传中
                        onProgress: (e) => {
                              this.handleProgress(e, file);
                        },
                        // 成功
                        onSuccess: (res) => {
                              this.handleSuccess(res, file);
                        },
                        // 错误
                        onError: (err, response) => {
                              this.handleError(err, response, file);
                        }
                  })
            },
            // 上传中
            handleProgress (e, file) {
                  const _file = this.getFile(file);

                  this.onProgress(e, _file, this.fileList);

                  // 设置文件上传进度
                  _file.percentage = e.percent || 0;
            },
            // 上传成功
            handleSuccess (res, file) {
                  const _file = this.getFile(file);
                  if (_file) {
                        _file.status = 'finished';
                        _file.response = res;

                        this.onSuccess(res, _file, this.fileList);

                        setTimeout(() => {
                              _file.showProgress = false;
                        }, 1000);
                  }
            },
            // 上传错误
            handleError (err, response, file) {
                  const _file = this.getFile(file);
                  const fileList = this.fileList;

                  _file.status = 'fail';

                  fileList.splice(fileList.indexOf(_file), 1);

                  this.onError(err, response, file);
            },
            // 记录上传文件列表
            handleStart (file) {
                  file.uid = Date.now() + this.tempIndex++;

                  const _file = {
                        status: 'uploading',
                        name: file.name,
                        size: file.size,
                        percentage: 0,
                        uid: file.uid,
                        showProgress: true
                  }

                  this.fileList.push(_file);
            },
            getFile (file) {
                  const fileList = this.fileList;

                  let ret;

                  // 检测数组所有元素是否都符合指定条件
                  fileList.every((item) => {
                        ret = file.uid === item.uid ? item : null;

                        return !ret;
                  });

                  return ret;
            }
      },
      components: {
            IVueUpLoadList
      }
}
</script>

<style>
</style>
