<template>
      <div :class="prefixCls">
            <!-- 输入框 -->
            <div  :class="inputWrapClass"
                  @click="handleClickInputWrap"
                  @drop.prevent="onDrop"
                  @dragover.prevent="dragOver = true"
                  @dragleave.prevent="dragOver = false"
            >
                  <input :class="`${prefixCls}-input`"
                         :accept="accept"
                         :multiple="multiple"
                         type="file" 
                         ref="input"
                         @change="handleChange"
                         />
                  <slot></slot>
            </div>
            <IvueUpLoadList :files="fileList"
                            @on-file-data="handleFileData"
                            @on-file-remove="handleRemove"
                            v-show="showUploadList"
            ></IvueUpLoadList>
      </div>
</template>

<script>
import IvueUpLoadList from './ivue-up-load-list';
import { oneOf } from '../../utils/assist';
import ajax from './ajax';

const prefixCls = 'ivue-upload';

export default {
      name: prefixCls,
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
            * 显示文件上传列表
            * 
            * @type {String}
            */
            showUploadList: {
                  type: Boolean,
                  default: true
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
            * 是否支持多选文件
            * 
            * @type {Boolean}
            */
            multiple: {
                  type: Boolean,
                  default: false
            },
            /*
            * 接受的上传类型
            * 
            * @type {String}
            */
            accept: {
                  type: String
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
            },
            /*
            * 文件数据
            * 
            * @type {Function}
            */
            onFileData: {
                  type: Function,
                  default () {
                        return {};
                  }
            },
            /*
            * 文件删除
            * 
            * @type {Function}
            */
            onRemove: {
                  type: Function,
                  default () {
                        return {};
                  }
            },
            /*
            * 上传文件之前的钩子，参数为上传的文件
            * 
            * @type {Function}
            */
            beforeUpload: {
                  type: Function,
                  default () {
                        return {};
                  }
            },
            /*
            * 默认已上传的文件列表
            * 
            * @type {Array}
            */
            defaultFileList: {
                  type: Array,
                  default () {
                        return [];
                  }
            },
            /*
            * 文件大小限制，单位 kb
            * 
            * @type {Number}
            */
            maxSize: {
                  type: Number
            },
            /*
            * 文件超出指定大小限制时的钩子，返回字段为 file, fileList
            * 
            * @type {Function}
            */
            onExceededSize: {
                  type: Function,
                  default () {
                        return {};
                  }
            },
            /*
            * 支持的文件类型,识别文件的后缀名
            * 
            * @type {Number}
            */
            format: {
                  type: Array,
                  default () {
                        return [];
                  }
            },
            /*
            * 文件格式验证失败时的钩子
            * 
            * @type {Number}
            */
            onFormatError: {
                  type: Function,
                  default () {
                        return {};
                  }
            },
            /*
            * 上传时附带的额外参数
            * 
            * @type {Object}
            */
            ajaxData: {
                  type: Object
            },
            /*
            * 设置上传的请求头部
            * 
            * @type {Object}
            */
            ajaxHeaders: {
                  type: Object,
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
                  tempIndex: 1,
                  // 拖动是否完成
                  dragOver: false
            }
      },
      computed: {
            inputWrapClass () {
                  return [
                        {
                              [`${prefixCls}-select`]: this.type === 'select',
                              [`${prefixCls}-drag`]: this.type === 'drag',
                              [`${prefixCls}-dragOver`]: this.type === 'drag' && this.dragOver
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
                  console.log(files)

                  if (!files) {
                        return;
                  }
                  this.uploadFiles(files)
            },
            // 获取上传文件
            uploadFiles (files) {
                  let arrayFiles = Array.prototype.slice.call(files);

                  if (!this.multiple) {
                        arrayFiles = arrayFiles.slice(0, 1);
                  }

                  if (arrayFiles.length === 0) {
                        return;
                  }

                  arrayFiles.forEach((file) => {
                        this.upload(file);
                  });
            },
            upload (file) {
                  if (!this.beforeUpload) {
                        this.post(file);
                  }

                  const beforeUpload = this.beforeUpload(file);
                  if (beforeUpload && beforeUpload.then) {
                        beforeUpload.then((beforeUploadFile) => {
                              if (Object.prototype.toString.call(beforeUploadFile) === '[object File]') {
                                    this.post(beforeUploadFile)
                              }
                              else {
                                    this.post(file);
                              }
                        });
                  }
                  else if (beforeUpload !== false) {
                        this.post(file);
                  }

            },
            // 发送文件事件
            post (file) {
                  // 识别文件格式
                  if (this.format.length) {
                        const _fileFormat = file.name.split('.').pop().toLocaleLowerCase();
                        const checked = this.format.some((item) => item.toLocaleLowerCase() === _fileFormat);
                        if (!checked) {
                              this.onFormatError(file, this.fileList);
                              return false;
                        }

                  }

                  // 判断上传最大字节
                  if (this.maxSize) {
                        if (file.size > this.maxSize * 1024) {
                              this.onExceededSize(file, this.fileList);
                              return false;
                        }
                  }

                  // 记录上传文件列表
                  this.handleStart(file);

                  ajax({
                        file: file,
                        filename: this.name,
                        uploadUrl: this.uploadUrl,
                        withCredentials: this.withCredentials,
                        data: this.ajaxData,
                        headers: this.ajaxHeaders,
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
            },
            // 文件列表点击
            handleFileClick (file) {
                  this.$emit('on-file-click', file)
            },
            // 获取文件数据
            handleFileData (file) {
                  if (file.status === 'finished') {
                        this.onFileData(file);
                  }
            },
            // 删除文件
            handleRemove (file) {
                  const fileList = this.fileList;
                  fileList.splice(fileList.indexOf(file), 1);

                  this.onRemove(file, fileList);
            },
            clearFiles () {
                  this.fileList = [];
            },
            // 拖动
            onDrop (e) {
                  this.dragOver = false;
                  this.uploadFiles(e.dataTransfer.files);
            }
      },
      watch: {
            // 监听默认已上传文件列表 -> 同步监听
            defaultFileList: {
                  immediate: true,
                  handler (fileList) {
                        this.fileList = fileList.map(item => {
                              item.status = 'finished';
                              item.percentage = 100;
                              item.uid = Date.now() + this.tempIndex++;
                              return item;
                        });
                  }
            }
      },
      components: {
            IvueUpLoadList
      }
}
</script>

