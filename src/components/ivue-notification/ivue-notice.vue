<template>
      <transition :name="transitionName">
            <div :class="classes" :style="styles">
                  <template v-if="type === 'notice'">
                        <!-- 内容 -->
                        <div :class="contentClasses" ref="content" v-html="content"></div>
                        <!-- render 渲染 -->
                        <div :class="contentHaveIcon">
                              <Render :render="renderFunc"></Render>
                        </div>
                        <!-- 关闭按钮 -->
                        <a :class="`${baseClass}-close`"  @click="handleClose" v-show="closable">
                              <i class="ivue-icon">close</i>
                        </a>
                  </template>
                  <template v-if="type === 'message'">
                        <div :class="`${baseClass}-content`" ref="content">
                              <div :class="`${baseClass}-content-text`" v-html="content"></div>
                              <div :class="`${baseClass}-content-text`">
                                    <Render :render="renderFunc"></Render>
                              </div>
                              <a :class="`${baseClass}-close`"  @click="handleClose" v-show="closable">
                                    <i class="ivue-icon">close</i>
                              </a>
                        </div>
                  </template>
            </div>
      </transition>
</template>

<script>
import Render from '../../utils/render';

export default {
      name: 'ivue-notice',
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
            },
            /*
            * render 渲染函数
            * 
            * @type {Function}
            */
            render: {
                  type: Function
            },
            transitionName: {
                  type: String
            },
            /*
            * 关闭方法
            * 
            * @type {Function}
            */
            onClose: {
                  type: Function
            },
            /*
            * 延迟关闭时间
            * 
            * @type {Function}
            */
            duration: {
                  type: Number,
                  default: 1.5
            },
            /*
            * 是否有关闭按钮
            * 
            * @type {Function}
            */
            closable: {
                  type: Boolean,
                  default: false
            },
            name: {
                  type: String,
                  required: true
            },
            haveIcon: {
                  type: Boolean
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

            this.clearCloseTimer();

            if (this.duration !== 0) {
                  this.closeTimer = setTimeout(() => {
                        this.handleClose();
                  }, this.duration * 1000);
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
                              [`${this.baseClass}-closable`]: this.closable,
                              [`${this.baseClass}-have-desc`]: this.haveDesc
                        }
                  ]
            },
            contentClasses () {
                  return [
                        `${this.baseClass}-content`,
                        this.render !== undefined ? `${this.baseClass}-content-render` : ''
                  ]
            },
            // render 函数
            renderFunc () {
                  return this.render || function () { };
            },
            contentHaveIcon () {
                  return [
                        this.haveIcon ? `${this.prefixCls}-content-have-icon` : ''
                  ]
            }
      },
      methods: {
            handleClose () {
                  this.clearCloseTimer();

                  this.onClose();

                  this.$parent.close(this.name);
            },
            clearCloseTimer () {
                  if (this.closeTimer) {
                        clearTimeout(this.closeTimer);
                        this.closeTimer = null;
                  }
            }
      },
      components: {
            Render
      }
}
</script>
