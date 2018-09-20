<template>
      <span tabindex="0"
            :class="wrapClasses"
            @click="toggle"
      >

      </span>
</template>

<script>
const prefixCls = 'ivue-switch';

export default {
      name:'IVueSwitch',
      props:{
            disabled:{
                  
            }
      },
      computed:{
            wrapClasses() {
                  return [
                        `${prefixCls}`
                  ]
            }
      },
      methods:{
            // 切换状态
            toggle (event) {
                  event.preventDefault();
                  

            }
      }
}
</script>

<style>
</style>
