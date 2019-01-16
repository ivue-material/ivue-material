<template>
      <div :class="wrapClasses" :style="wrapStyles">
            <!-- 进度条 -->
            <svg
                  :style="svgStyles"
                  xmlns="http://www.w3.org/2000/svg"
                  :viewBox="`${viewBoxSize} ${viewBoxSize} ${2 * viewBoxSize} ${2 * viewBoxSize}`"
            >
                  <circle
                        fill="transparent"
                        :cx="`${2 * viewBoxSize}`"
                        :cy="`${2 * viewBoxSize}`"
                        :r="radius"
                        :stroke-width="strokeWidth"
                        :stroke-dasharray="strokeDasharray"
                        stroke-dashoffset="0"
                        :class="`${prefixCls}-underlay`"
                        v-if="!indeterminate"
                  ></circle>
                  <circle
                        fill="transparent"
                        :cx="`${2 * viewBoxSize}`"
                        :cy="`${2 * viewBoxSize}`"
                        :r="radius"
                        :stroke-width="strokeWidth"
                        :stroke-dasharray="strokeDasharray"
                        :stroke-dashoffset="strokeDashoffset"
                        :class="`${prefixCls}-overlay`"
                  ></circle>
            </svg>
            <!-- 进度数 -->
            <span :class="textClasses" v-if="!hideText && !indeterminate">
                  <slot>{{percent}}%</slot>
            </span>
      </div>
</template>


<script>
import IvueIcon from '../ivue-icon';
import { oneOf } from '../../utils/assist';

const prefixCls = 'ivue-progress-circular';

function isCssColor (color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
}

export default {
      name: prefixCls,
      props: {
            color: {
                  type: String,
                  default: ''
            },
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
            * 旋转角度
            * 
            * @type {String}
            */
            rotate: {
                  type: Number,
                  default: 0
            },
            /*
            * 圆圈大小，单位 px
            * 
            * @type {Number}
            */
            size: {
                  type: Number,
                  default: 50
            },
            /*
            * 圆圈的宽度
            * 
            * @type {Number}
            */
            width: {
                  type: Number,
                  default: 4
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
            * 隐藏文字
            * 
            * @type {Number}
            */
            hideText: {
                  type: Boolean,
                  default: false
            },
            /*
            * 一个不确定的进度圆环永远循环动画
            * 
            * @type {Boolean}
            */
            indeterminate: {
                  type: Boolean,
                  default: false
            }
      },
      data () {
            return {
                  prefixCls: prefixCls,
                  // 当前进度条状态
                  currentStatus: this.status
            }
      },
      computed: {
            wrapClasses () {
                  let _color = {};

                  if (isCssColor(this.color)) {
                        _color = { 'color': `${this.color}` };
                  }
                  else if (this.color) {
                        _color = { [this.color + '--text']: true }
                  }

                  return [
                        prefixCls,
                        `${prefixCls}-${this.currentStatus}`,
                        {
                              [`${prefixCls}-show-info`]: !this.hideText,
                              [`${prefixCls}-indeterminate`]: this.indeterminate
                        },
                        _color
                  ];
            },
            wrapStyles () {
                  return {
                        height: `${this.size}px`,
                        width: `${this.size}px`
                  }
            },
            radius () {
                  return 20
            },
            textClasses () {
                  return `${prefixCls}-text`;
            },
            // svg 旋转角度
            svgStyles () {
                  return {
                        transform: `rotate(${this.rotate}deg)`
                  }
            },
            viewBoxSize () {
                  return this.radius / (1 - this.width / +this.size);
            },
            strokeWidth () {
                  return this.width / +this.size * this.viewBoxSize * 2;
            },
            // 周长
            circumference () {
                  return 2 * Math.PI * this.radius;
            },
            // 创建虚线
            strokeDasharray () {
                  return Math.round(this.circumference * 1000) / 1000;
            },
            normalizedValue () {
                  if (this.percent < 0) {
                        return 0;
                  }

                  if (this.percent > 100) {
                        return 100
                  }

                  return this.percent;
            },
            // 路径开始的距离
            strokeDashoffset () {
                  return ((100 - this.normalizedValue) / 100) * this.circumference + 'px';
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
            IvueIcon
      }
}
</script>
