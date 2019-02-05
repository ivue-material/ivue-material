<template>
      <div :class="classes">
            <!-- 头部 -->
            <div :class="`${prefixCls}--ripple`">
                  <IvueRipple :ivueDisabled="ivueDisabled">
                        <div :class="headerClasses" @click="toggle">
                              <slot name="header-icon"></slot>
                              <slot></slot>
                        </div>
                  </IvueRipple>
            </div>
            <!-- 内容 -->
            <CollapseTransition>
                  <div :class="`${prefixCls}--content`" v-show="isActive">
                        <div :class="`${prefixCls}--content-box`">
                              <slot name="content"></slot>
                        </div>
                  </div>
            </CollapseTransition>
      </div>
</template>

<script>
import CollapseTransition from '../../utils/collapse-transition';
import IvueRipple from '../ivue-ripple/ivue-ripple';

const prefixCls = 'ivue-collapse-panel';

export default {
      name: prefixCls,
      props: {
            /**
             * 用于设置激活 panel
             * 
             * @type {String}
             */
            name: {
                  type: String
            },
            /*
            * 启用/禁用涟漪
            * 
            * @type {null}
            */
            ivueDisabled: {
                  type: null,
                  default: false
            },
      },
      data () {
            return {
                  prefixCls: prefixCls,
                  isActive: false,
                  // 当name为null时，使用index作为默认值
                  index: 0
            }
      },
      computed: {
            classes () {
                  return [
                        `${prefixCls}`,
                        {
                              [`${prefixCls}--active`]: this.isActive
                        }
                  ]
            },
            // 头部 class
            headerClasses () {
                  return [
                        `${prefixCls}--header`
                  ]
            }
      },
      methods: {
            // 激活当前面板
            toggle () {
                  this.$parent.toggle({
                        name: this.name || this.index,
                        isActive: this.isActive
                  });
            }
      },
      components: {
            CollapseTransition,
            IvueRipple
      }
}
</script>
