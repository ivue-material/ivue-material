<template>
      <div :class="wrapClasses">
            <input :class="inputClass"
            
            />
      </div>
</template>

<script>

const prefixCls = 'ivue-input';

export default {
      name: 'IVueInput',
      props: {
            /*
            * 输入提示
            * 
            * @type {String}
            */
            placeholder: {
                  type: String,
                  default: ''
            }
      },
      computed: {
            // 外部样式
            wrapClasses () {
                  return [
                        `${prefixCls}-wrapper`
                  ]
            },
            // 输入框样式
            inputClass () {
                  return [
                        prefixCls
                  ]
            }
      }
}
</script>

<style>
</style>
