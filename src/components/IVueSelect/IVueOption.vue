<template>
      <li :class="classes"
          @click.stop="selectOption"  
          @touchend.stop="selectOption"  
          @mousedown.prevent
          @touchstart="_touchstart"
          @touchmove="_touchmove"
          @touchend="_touchend"
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
            },
            /*
            * 是否选择当前项
            * 
            * @type {Boolean}
            */
            selected: {
                  type: Boolean,
                  default: false
            },
            /*
            * 是否获取到焦点
            * 
            * @type {Boolean}
            */
            isFocused: {
                  type: Boolean,
                  default: false
            }
      },
      data () {
            return {
                  // 触摸开始位置
                  touchesStart: [],
                  // 触摸结束位置
                  touchesEnd: []
            }
      },
      computed: {
            classes () {
                  return [
                        prefixCls,
                        {
                              [`${prefixCls}-selected`]: this.selected,
                              [`${prefixCls}-focus`]: this.isFocused,
                        }
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
            // 手指点击
            _touchstart (e) {
                  this.touchesStart = e.touches[0];
            },
            // 手机滑动
            _touchmove (e) {
                  this.touchesEnd = e.touches[0];
            },
            // 手指离开
            _touchend () {
                  this.touchesEnd = []
            },
            // 点击选择选项
            selectOption () {
                  // 判断移动端滑动
                  if (!(!(this.touchesStart.length > 0) && this.touchesEnd.length === 0)) {
                        return;
                  }

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
