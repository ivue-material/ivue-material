<template>
      <div :class="wrapClasses">
            <input :class="inputClass"
                   :placeholder="placeholder"
                   :spellcheck="spellcheck"
                   :type="type"
                   :disabled="disabled"
                   :autocomplete="autocomplete"
                   :readonly="readonly"
                   :name="name"
                   :value="currentValue"
                   :autofocus="autofocus"
                   :number="number"
                   :id="id"
                   @input="handleInput"
                   @focus="handleFocus"
                   @blur="handleBlur"
                   ref="input"
            />
             <!-- 重置选择 -->
            <IVueIcon :class="[`${prefixCls}-icon`,`${prefixCls}-icon-clear`]" 
                      v-if="clearable && currentValue" 
                      @click.native.stop="handleClear"
            >{{clearIcon}}</IVueIcon>
      </div>
</template>

<script>
import { oneOf } from '../../utils/Assist';

const prefixCls = 'ivue-input';

export default {
      name: 'IVueInput',
      props: {
            placeholder: {
                  type: String,
                  default: ''
            },
            spellcheck: {
                  type: Boolean,
                  default: false
            },
            type: {
                  validator (value) {
                        return oneOf(value, ['text', 'password', 'url', 'email', 'date']);
                  },
                  default: 'text'
            },
            disabled: {
                  type: Boolean,
                  default: false
            },
            maxlength: {
                  type: Number
            },
            autocomplete: {
                  validator (value) {
                        return oneOf(value, ['on', 'off']);
                  },
                  default: 'off'
            },
            readonly: {
                  type: Boolean,
                  default: false
            },
            name: {
                  type: String
            },
            value: {
                  type: [String, Number],
                  default: ''
            },
            autofocus: {
                  type: Boolean,
                  default: false
            },
            number: {
                  type: Boolean,
                  default: false
            },
            id: {
                  type: String
            },
            /*
            * 是否显示清除按钮
            * 
            * @type {Boolean}
            */
            clearable: {
                  type: Boolean,
                  default: false
            },
            /*
            * 输入框清除图标
            * 
            * @type {Boolean}
            */
            clearIcon: {
                  type: String
            }
      },
      data () {
            return {
                  // 输入框value
                  currentValue: this.value,
                  prefixCls: prefixCls
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
      },
      methods: {
            // 获取焦点事件
            handleFocus (event) {
                  this.$emit('on-focus', event);
            },
            // 失去焦点事件
            handleBlur (event) {
                  this.$emit('on-blur', event);
            },
            // 输入事件
            handleInput (event) {
                  let value = event.target.value;
                  if (this.number && value !== '') {
                        value = Number.isNaN(Number(value)) ? value : Number(value);
                  }

                  // updated v-model
                  this.$emit('input', value);
                  this.setCurrentValue(value);
                  this.$emit('on-change', event);
            },
            // 清除数据
            handleClear () {
                  this.$emit('input', '');
                  this.setCurrentValue('');
                  this.$emit('on-change', { target: { value: '' } });
            },
            // 设置当前值
            setCurrentValue (value) {
                  if (value === this.currentValue) {
                        return;
                  }
                  this.currentValue = value;
            }
      },
      watch: {
            value (value) {
                  this.setCurrentValue(value);
            }
      }
}
</script>

<style>
</style>
