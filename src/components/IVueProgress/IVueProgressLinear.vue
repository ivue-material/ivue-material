<template>
      <div :class="wrapClasses">
            <!-- 进度条 -->
            <div :class="outerClasser">
                  <div :class="innerClasser">
                        <!-- 背景 -->
                        <div :class="bgClasser" :style="bgStyle"></div>
                        <!-- 成功进度 -->
                        <div :class="successBgClasser" :style="successBgStyle"></div>
                  </div>
            </div>
            <!-- 进度数 -->
            <span :class="textClasses" v-show="!hideText">
                  <slot>
                        <span v-if="progressTextStatus" :class="textInnerClasses">
                              <IVueIcon>
                                    {{statusIcon}}
                              </IVueIcon>
                        </span>
                        <span v-else :class="textInnerClasses">{{percent}}%</span>
                  </slot>
            </span>
      </div>
</template>


<script>
import IVueIcon from '../IVueIcon';
import { oneOf } from '../../utils/Assist';

const prefixCls = 'ivue-progress-linear';

export default {
      name: "IVueProgressLinear",
      props: {
            /*
            * 状态，可选值为normal、active、wrong、success
            * 
            * @type {String}
            */
            status: {
                  validator (value) {
                        return oneOf(value, ['normal', 'active', 'wrong', 'success']);
                  },
                  default: 'normal'
            },
            /*
            * 进度条的高度，单位 px
            * 
            * @type {Number}
            */
            height: {
                  type: Number,
                  default: 10
            },
            /*
            * 百分比
            * 
            * @type {Number}
            */
            percent: {
                  type: Number,
                  default: 0
            },
            /*
            * 成功百分比
            * 
            * @type {Number}
            */
            successPercent: {
                  type: Number,
                  default: 0
            },
            /*
            * 隐藏文字
            * 
            * @type {Number}
            */
            hideText: {
                  type: Boolean,
                  default: false
            }
      },
      data () {
            return {
                  // 当前进度条状态
                  currentStatus: this.status
            }
      },
      computed: {
            wrapClasses () {
                  return [
                        prefixCls,
                        `${prefixCls}-${this.currentStatus}`,
                        {
                              [`${prefixCls}-show-info`]: !this.hideText
                        }
                  ];
            },
            outerClasser () {
                  return `${prefixCls}-outer`;
            },
            innerClasser () {
                  return `${prefixCls}-inner`;
            },
            bgClasser () {
                  return `${prefixCls}-bg`;
            },
            bgStyle () {
                  return {
                        width: `${this.percent}%`,
                        height: `${this.height}px`
                  };
            },
            successBgClasser () {
                  return `${prefixCls}-success-bg`;
            },
            successBgStyle () {
                  return {
                        width: `${this.successPercent}%`,
                        height: `${this.height}px`
                  };
            },
            textClasses () {
                  return `${prefixCls}-text`;
            },
            textInnerClasses () {
                  return `${prefixCls}-text-inner`;
            },
            progressTextStatus () {
                  return this.currentStatus === 'wrong' || this.currentStatus === 'success';
            },
            statusIcon () {
                  let type = '';
                  if (this.currentStatus === 'wrong') {
                        type = 'cancel'
                  }

                  if (this.currentStatus === 'success') {
                        type = 'check_circle'
                  }

                  return type;
            }
      },
      created () {
            this.handleStatus();
      },
      methods: {
            // 状态事件
            handleStatus (init) {
                  if (init) {
                        this.currentStatus = 'normal';
                  }
                  else {
                        if (parseInt(this.percent, 10) === 100) {
                              this.currentStatus = 'success';
                        }
                  }
            }
      },
      watch: {
            // 监听进度变化前
            percent (value, oldValue) {
                  if (value < oldValue) {
                        this.handleStatus(true);
                  }
                  else {
                        this.handleStatus();
                  }
            },
            // 监听状态
            status (status) {
                  this.currentStatus = status;
            }
      },
      components: {
            IVueIcon
      }
}
</script>
