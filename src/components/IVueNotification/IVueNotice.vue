<template>
      <transition>
            <div :class="classes" :style="styles">
                  <template v-if="type === 'notice'">
                  <!-- 内容 -->
                  <div :class="contentClasses" ref="content" v-html="content"></div>
                  <!-- 关闭按钮 -->
                  <a :class="`${baseClass}-close`">
                        <i class="ivue-icon">close</i>
                  </a>
                  </template>
            </div>
      </transition>
</template>

<script>
export default {
      props: {
            prefixCls: {
                  type: String,
                  default: ''
            },
            /*
            * 内容
            * 
            * @type {String}
            */
            content: {
                  type: String,
                  default: ''
            },
            /*
            * 通知类型
            * 
            * @type {String}
            */
            type: {
                  type: String
            },
            /*
            * 通知栏样式
            * 
            * @type {String}
            */
            styles: {
                  type: Object,
                  default: function () {
                        return {};
                  }
            }
      },
      data () {
            return {
                  haveDesc: false
            }
      },
      mounted () {
            // 检查是否使用了desc
            if (this.prefixCls === 'ivue-notice') {
                  let desc = this.$refs.content.querySelectorAll(`.${this.prefixCls}-desc`)[0];

                  this.haveDesc = desc ? desc.innerHTML !== '' : false;
            }
      },
      computed: {
            baseClass () {
                  return `${this.prefixCls}-notice`;
            },
            classes () {
                  return [
                        this.baseClass,
                        {
                              [`${this.baseClass}-have-desc`]: this.haveDesc
                        }
                  ]
            },
            contentClasses () {
                  return [
                        `${this.baseClass}-content`
                  ]
            }
      }
}
</script>
