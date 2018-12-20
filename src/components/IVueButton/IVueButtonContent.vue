<template>
      <IvueRipple :ivueDisabled="!ivueRipple || disabled" 
                  :ivueEventTrigger="false"  
                  :ivueActive="ivueRippleActive" 
                  @update:ivueActive="active => $emit('update:ivueRippleActive', active)"
            >
            <div :class="`${prefixCls}-content`">
                  <slot></slot>
            </div>
      </IvueRipple>
</template>

<script>
import IvueRipple from '../IvueRipple/IvueRipple';

const prefixCls = 'ivue-button';

export default {
      name: prefixCls,
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
            IvueRipple
      }
}
</script>
