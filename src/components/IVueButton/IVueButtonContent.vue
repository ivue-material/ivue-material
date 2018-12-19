<template>
      <IVueRipple :ivueDisabled="!ivueRipple || disabled" 
                  :ivueEventTrigger="false"  
                  :ivueActive="ivueRippleActive" 
                  @update:ivueActive="active => $emit('update:ivueRippleActive', active)"
            >
            <div :class="`${prefixCls}-content`">
                  <slot></slot>
            </div>
      </IVueRipple>
</template>

<script>
import IVueRipple from '../IVueRipple/IVueRipple';

const prefixCls = 'ivue-button';

export default {
      name: "IVueButtonContent",
      props: {
            /*
            * 禁用按钮并阻止其操作
            * 
            * @type {Boolean}
            */
            disabled: {
                  type: Boolean,
                  default: false
            },
            /*
            * 启用/禁用涟漪
            * 
            * @type {Boolean}
            */
            ivueRipple: {
                  type: Boolean,
                  default: false
            },
            /*
            * 涟漪激活
            * 
            * @type {Boolean}
            */
            ivueRippleActive: null,
      },
      data () {
            return {
                  prefixCls: prefixCls
            }
      },
      components: {
            IVueRipple
      }
}
</script>

<style lang="scss" scoped>
.ivue-button-content {
  position: relative;
  z-index: 2;
}
</style>
