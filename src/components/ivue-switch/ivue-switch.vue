<template>
      <span tabindex="0" :class="wrapClasses" @click="toggle">
            <span :class="innerClasses">
                  <slot name="open" v-if="currentValue === trueValue"></slot>
                  <slot name="close" v-if="currentValue === falseValue"></slot>
            </span>
      </span>
</template>

<script>
import { oneOf } from '../../utils/assist';

const prefixCls = 'ivue-switch';

function isCssColor (color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
}

export default {
      name: prefixCls,
      props: {
            color: {
                  type: String,
                  default: ''
            },
            /*
            * 是否禁用开关
            * 
            * @type {Boolean}            
            */
            disabled: {
                  type: Boolean,
                  default: false
            },
            /*
            * 加载中的开关
            * 
            * @type {Boolean}            
            */
            loading: {
                  type: Boolean,
                  default: false
            },
            /*
            * 选中时的值
            * 
            * @type {String,Number,Boolean}             
            */
            trueValue: {
                  type: [String, Number, Boolean],
                  default: true
            },
            /*
            * 没有选中时的值
            * 
            * @type {String,Number,Boolean}             
            */
            falseValue: {
                  type: [String, Number, Boolean],
                  default: false
            },
            /*
            * 指定当前是否开启，可以使用 v-model 双向绑定数据
            * 
            * @type {String,Number,Boolean}            
            */
            value: {
                  type: [String, Number, Boolean],
                  default: false
            },
            /*
            * 开关的尺寸，可选值为large、small、default或者不写。建议如果使用了2个汉字的文字，使用 large
            * 
            * @type {String,Number,Boolean}             
            */
            size: {
                  type: String,
                  validator (value) {
                        return oneOf(value, ['large', 'small', 'default'])
                  },
                  default () {
                        return !this.$Ivue || this.$Ivue.size === '' ? 'default' : this.$Ivue.size
                  }
            }
      },
      data () {
            return {
                  /*
                  * 当前选择状态
                  * 
                  * @type {String,Number,Boolean}            
                  */
                  currentValue: this.value
            }
      },
      mounted () {
      },
      computed: {
            // 外部样式
            wrapClasses () {
                  let _color = {};

                  if (isCssColor(this.color)) {
                        _color = { 'background-color': `${this.color}` };
                  }
                  else if (this.color) {
                        _color = { [this.color]: true }
                  }

                  return [
                        `${prefixCls}`,
                        {
                              [`${prefixCls}-checked`]: this.currentValue === this.trueValue,
                              [`${prefixCls}-disabled`]: this.disabled,
                              [`${prefixCls}-loading`]: this.loading,
                              [`${prefixCls}-${this.size}`]: this.size
                        },
                        this.currentValue === this.trueValue ? _color : {}
                  ]
            },
            // 内部文字样式
            innerClasses () {
                  return `${prefixCls}-inner`;
            },
            // 修改v-model
            inputValue: {
                  get () {
                        return this.currentValue
                  },
                  set (val) {
                        this.currentValue = val;

                        this.$emit('input', val);
                  }
            }
      },
      methods: {
            // 切换状态
            toggle (event) {
                  event.preventDefault();

                  if (this.disabled || this.loading) {
                        return false;
                  }

                  const checked = this.currentValue === this.trueValue ? this.falseValue : this.trueValue;

                  // 修改 v-modul
                  this.inputValue = checked

                  this.$emit('on-change', checked);

            }
      },
      watch: {
            value (value) {
                  if (value !== this.trueValue && value !== this.falseValue) {
                        throw 'Value should be trueValue or falseValue.';
                  }

                  this.currentValue = value;
            }
      }
}
</script>
