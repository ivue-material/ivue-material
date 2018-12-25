<template>
      <div :class="wrapClasses">
            <template v-if="type !== 'textarea'">
                  <!-- 首部图标 -->
                  <span :class="[`${prefixCls}-prefix`]" v-show="showPrefix">
                        <slot name="prefix">
                              <i class="ivue-icon">{{prefix}}</i>
                        </slot>
                  </span>
                  <!-- 输入框 -->
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
                        @keyup.enter="handleEnter"
                        @keyup="handleKeyup"
                        @keypress="handleKeypress"
                        @keydown="handleKeydown"
                        @input="handleInput"
                        @focus="handleFocus"
                        @blur="handleBlur"
                        ref="input"
                  />
                  <!-- 尾部图标 -->
                  <span :class="[`${prefixCls}-suffix`]" v-show="showSuffix" @click.stop="handleSuffix">
                        <slot name="suffix">
                              <i class="ivue-icon">{{suffix}}</i>
                        </slot>
                  </span>
                  <!-- 重置选择 -->
                  <IvueIcon :class="[`${prefixCls}-icon`,`${prefixCls}-icon-clear`,showSuffix? 'is-suffix': '']" 
                        v-if="clearable && currentValue" 
                        @click.native.stop="handleClear"
                  >{{clearIcon}}</IvueIcon>
            </template>
            <!-- textarea文本框 -->
            <textarea   v-else
                        :id="id"
                        :name="name"
                        :disabled="disabled"
                        :class="textareaClasses"
                        :style="textareaStyles"
                        :value="currentValue"
                        :placeholder="placeholder"
                        :autofocus="autofocus"
                        :readonly="readonly"
                        :rows="rows"
                        :maxlength="maxlength"
                        :spellcheck="spellcheck"
                        ref="textarea"
                        @keyup.enter="handleEnter"
                        @keyup="handleKeyup"
                        @keypress="handleKeypress"
                        @keydown="handleKeydown"
                        @focus="handleFocus"
                        @blur="handleBlur"
                        @input="handleInput"
            >
            </textarea>
      </div>
</template>

<script>
import { oneOf } from '../../utils/assist';
import CalcTextareaHeight from '../../utils/calc-textarea-height';

const prefixCls = 'ivue-input';

export default {
      name: prefixCls,
      props: {
            /*
            * 输入框类型，可选值为 text、password、textarea、url、email、date
            * 
            * @type {null}
            */
            type: {
                  validator (value) {
                        return oneOf(value, ['text', 'textarea', 'password', 'url', 'email', 'date']);
                  },
                  default: 'text'
            },
            placeholder: {
                  type: String,
                  default: ''
            },
            spellcheck: {
                  type: Boolean,
                  default: false
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
            rows: {
                  type: Number,
                  default: 2
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
            * @type {String}
            */
            clearIcon: {
                  type: String,
                  default: 'cancel'
            },
            /*
            * 输入框首部图标
            * 
            * @type {String}
            */
            prefix: {
                  type: String,
                  default: ''
            },
            /*
            * 输入框尾部部图标
            * 
            * @type {String}
            */
            suffix: {
                  type: String,
                  default: ''
            },
            /*
            * 指定最小行数和最大行数
            * 
            * @type {String}
            */
            autosize: {
                  type: [Boolean, Object],
                  default: false
            }
      },
      data () {
            return {
                  prefixCls: prefixCls,
                  // 输入框value
                  currentValue: this.value,
                  // 是否显示首部图标
                  showPrefix: false,
                  // 是否显示尾部图标
                  showSuffix: false,
                  // 文本框样式
                  textareaStyles: {}
            }
      },
      mounted () {
            this.showPrefix = this.prefix !== '' || this.$slots.prefix !== undefined;
            this.showSuffix = this.suffix !== '' || this.$slots.suffix !== undefined;

            this.resizeTextarea();
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
                        prefixCls,
                        {
                              [`${prefixCls}-with-prefix`]: this.showPrefix,
                              [`${prefixCls}-with-suffix`]: this.showSuffix,
                              [`${prefixCls}-disabled`]: this.disabled
                        }
                  ]
            },
            // 文本框样式
            textareaClasses () {
                  return [
                        prefixCls,
                        `${prefixCls}-textarea`,
                        {
                              [`${prefixCls}-disabled`]: this.disabled
                        }

                  ]
            }
      },
      methods: {
            handleEnter (event) {
                  this.$emit('on-enter', event);
            },
            handleKeydown (event) {
                  this.$emit('on-keydown', event);
            },
            handleKeypress (event) {
                  this.$emit('on-keypress', event);
            },
            handleKeyup (event) {
                  this.$emit('on-keyup', event);
            },
            // 获取焦点事件
            handleFocus (event) {
                  this.$emit('on-focus', event);
            },
            // 失去焦点事件
            handleBlur (event) {
                  this.$emit('on-blur', event);
            },
            // 尾部图标点击事件
            handleSuffix(event){
                 this.$emit('handleSuffix', event);
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

                  this.$nextTick(() => {
                        this.resizeTextarea();
                  });

                  this.currentValue = value;
            },
            // 改变文本框样式
            resizeTextarea () {
                  const autosize = this.autosize;

                  if (!autosize && this.type !== 'textarea') {
                        return;
                  }

                  const minRows = autosize.minRows;
                  const maxRows = autosize.maxRows;

                  // 文本框样式
                  this.textareaStyles = CalcTextareaHeight(this.$refs.textarea, minRows, maxRows);
            }
      },
      watch: {
            // 监听输入变化
            value (value) {
                  this.setCurrentValue(value);
            }
      }
}
</script>

