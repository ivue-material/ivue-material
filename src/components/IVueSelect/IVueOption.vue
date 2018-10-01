<template>
      <li :class="classes"
          @click.stop="selectOption"  
          @touchend.stop="selectOption"  
          @mousedown.prevent
          @touchstart.prevent
      >
            <slot>
                  {{showLabel}}
            </slot>
      </li>
</template>

<script>
import EmitterEvent from '../../utils/mixins/EmitterEvent';
const prefixCls = 'ivue-select-item';

export default {
      name: "IVueOption",
      componentName: "ivue-select-item",
      mixins: [EmitterEvent],
      props: {
            /*
            * 渲染的 value
            * 
            * @type {String, Number}
            */
            value: {
                  type: [String, Number],
                  required: true
            },
            /*
            * 渲染的 label
            * 
            * @type {String, Number}
            */
            label: {
                  type: [String, Number]
            }
      },
      computed: {
            classes () {
                  return [
                        prefixCls
                  ]
            },
            // 是否显示label
            showLabel () {
                  return this.label ? this.label : this.value;
            },
            // 获取label
            getLabel () {
                  return this.label || (this.$el && this.$el.textContent);
            }
      },
      methods: {
            // 点击选择选项
            selectOption () {
                  // 把事件注册到 IVueSelect 组件
                  this.dispatch('IVueSelect', 'on-select-option', {
                        value: this.value,
                        label: this.getLabel
                  });

                  // 注册事件
                  this.$emit('on-select-option', {
                        value: this.value,
                        label: this.getLabel
                  })
            }
      }
}
</script>

<style>
</style>
