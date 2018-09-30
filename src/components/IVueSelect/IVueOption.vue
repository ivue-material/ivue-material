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
const prefixCls = 'ivue-select-item';

export default {
      name: "IVueOption",
      componentName: "ivue-select-item",
      props: {
            value: {
                  type: [String, Number],
                  required: true
            },
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
                  this.$emit('onSelectOption', {
                        value: this.value,
                        label: this.getLabel
                  })
            }
      }
}
</script>

<style>
</style>
