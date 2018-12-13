<template>
      <transition name="fade">
            <div :class="classes" v-if="fullscreenVisible">
                  <div :class="mainClasses">
                        <span :class="dotClasses"></span>
                        <div :class="textClasses">
                              <slot></slot>
                        </div>
                  </div>
            </div>
      </transition>
</template>

<script>
import { oneOf } from '../../utils/Assist';

const prefixCls = 'ivue-spin';

export default {
      name: 'IVueSpin',
      props: {
            /*
            * 尺寸
            * 
            * @type {String}
            */
            size: {
                  validator (value) {
                        return oneOf(value, ['small', 'large', 'default']);
                  },
                  default () {
                        return !this.$IVUE || this.$IVUE.size === '' ? 'default' : this.$IVUE.size
                  }
            },
            /*
            * 是否固定 需要父级有relative或absolute
            * 
            * @type {Boolean}
            */
            fix: {
                  type: Boolean,
                  default: false
            },
            /*
            * 是否全屏
            * 
            * @type {Boolean}
            */
            fullscreen: {
                  type: Boolean,
                  default: false
            }
      },
      data () {
            return {
                  // 是否显示文本
                  showText: false,
                  // 是否可见
                  visible: false
            }
      },
      mounted () {
            this.showText = this.$slots.default !== undefined;
      },
      computed: {
            // 全屏显示
            fullscreenVisible () {
                  if (this.fullscreen) {
                        return this.visible;
                  }
                  else {
                        return true;
                  }
            },
            // 样式
            classes () {
                  return [
                        `${prefixCls}`,
                        {
                              [`${prefixCls}-${this.size}`]: this.size,
                              [`${prefixCls}-fix`]: this.fix,
                              [`${prefixCls}-show-text`]: this.showText,
                              [`${prefixCls}-fullscreen`]: this.fullscreen,

                        }
                  ]
            },
            mainClasses () {
                  return `${prefixCls}-main`;
            },
            dotClasses () {
                  return `${prefixCls}-dot`;
            },
            textClasses () {
                  return `${prefixCls}-text`;
            }
      }
}
</script>

