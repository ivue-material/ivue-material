<template>
      <ul :class="prefixCls">
            <li   v-for="file in files"
                  :class="fileStatusClass(file)"
                  :key="file.uid"
            >
                  <!-- 名称 -->
                  <span @click="handleFileData(file)">
                        <IvueIcon>{{iconType(file)}}</IvueIcon>{{file.name}}
                  </span>
                  <!-- 删除按钮 -->
                  <IvueIcon :class="`${prefixCls}-remove`"
                            v-show="file.status === 'finished'"
                            @click.native="handleRemove(file)"
                            >close</IvueIcon>
                  <!-- 进度条 -->
                  <transition name="progress-fade">
                        <IvueProgressLinear :height="3"
                                            :percent="percentage(file.percentage)"
                                            :status="file.status === 'finished' && file.showProgress ? 'success' :'normal'"
                                            v-if="file.showProgress"
                        ></IvueProgressLinear>
                  </transition>
            </li>
      </ul>
</template>

<script>
import IvueIcon from '../ivue-icon';
import IvueProgressLinear from '../ivue-progress/ivue-progress-linear';

const prefixCls = 'ivue-upload-list';

export default {
      name: prefixCls,
      props: {
            /*
            * 上传的文件的列表
            * 
            * @type {Array}
            */
            files: {
                  type: Array,
                  default: function () {
                        return [];
                  }
            }
      },
      data () {
            return {
                  prefixCls: prefixCls
            }
      },
      methods: {
            // 文件上传状态
            fileStatusClass (file) {
                  return [
                        `${prefixCls}-status`,
                        {
                              [`${prefixCls}-status-finish`]: file.status === 'finished'
                        }
                  ]
            },
            iconType (file) {
                  // 获取文件名称后缀
                  const name = file.name.split('.').pop().toLocaleLowerCase() || '';
                  let type = 'insert_drive_file';

                  if (['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'].indexOf(name) > -1) {
                        type = 'image';
                  }
                  if (['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'].indexOf(name) > -1) {
                        type = 'local_movies';
                  }

                  if (['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'].indexOf(name) > -1) {
                        type = 'music_note';
                  }

                  if (['doc', 'txt', 'docx', 'pages', 'epub', 'pdf'].indexOf(name) > -1) {
                        type = 'insert_drive_file';
                  }

                  if (['numbers', 'csv', 'xls', 'xlsx'].indexOf(name) > -1) {
                        type = 'assessment';
                  }

                  if (['keynote', 'ppt', 'pptx'].indexOf(name) > -1) {
                        type = 'videocam';
                  }


                  return type;
            },
            percentage (value) {
                  return parseInt(value, 10);
            },
            // 返回文件数据
            handleFileData (file) {
                  this.$emit('on-file-data', file);
            },
            // 点击删除按钮
            handleRemove (file) {
                  this.$emit('on-file-remove', file);
            }
      },
      components: {
            IvueIcon,
            IvueProgressLinear
      }
}
</script>
