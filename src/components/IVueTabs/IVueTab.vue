<template>
      <div :class="wrapClass" refs="tab" @click="handleChange">
            <slot></slot>
      </div>
</template>

<script>
import { inject as RegistrableInject } from '../../utils/mixins/Registrable';

const prefixCls = 'ivue-tabs-tab';

export default {
      name: 'IVueTab',
      mixins: [
            RegistrableInject('tabNavList','IVueTab','IVueTabs')
      ],
      inject: ['tabNavClick'],
      props: {
            /*
            * 是否禁用当前项
            * 
            * @type{Boolean}
            */
            disabled: {
                  type: Boolean,
                  default: false
            }
      },
      data () {
            return {
                  prefixCls: prefixCls,
                  isActive: false,
                  key: this.$vnode.data.key || this._uid
            }
      },
      mounted () {
            // 更新tab导航
            this.tabNavList.updateTabNav(this);
      },
      computed: {
            wrapClass () {
                  return [
                        prefixCls,
                        {
                              [`${prefixCls}-disabled`]: this.disabled,
                              [`${prefixCls}-active`]: this.isActive
                        }
                  ]
            }
      },
      methods: {
            // 切换激活状态
            toggle (action) {
                  this.isActive = (action === this);
            },
            // 点击当前项
            handleChange () {
                  this.tabNavClick(this);
            }
      },
      // 实例销毁之前调用
      beforeDestroy () {
            this.tabNavList.removeTabNav(this);
      }
}
</script>

