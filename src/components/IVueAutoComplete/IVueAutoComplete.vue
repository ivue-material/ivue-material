<template>
      <IVueSelect :placeholder="placeholder"
                  :value="currentValue"
                  :disabled="disabled"
                  :searchMethod="searchMethod"
                  filterable
                  autoComplete
                  @on-change="handleChange"
                  class="ivue-auto-complete"
                  ref="ivueSelect"
      >
            <slot name="input">
                  <IVueInput  v-model="currentValue" 
                              :placeholder="placeholder"
                              :disabled="disabled"
                              :name="name"
                              :id="id"
                              :clearable="clearable"
                              :clearIcon="clearIcon"
                              @on-focus="handleFocus"
                              @on-blur="handleBlur"
                              slot="input" 
                              ref="iVueInput"
                              >
                  </IVueInput>
            </slot>
            <slot>
                  <IVueOption v-for="item in filterableData" :value="item" :key="item">{{item}}</IVueOption>
            </slot>
      </IVueSelect>
</template>

<script>
import IVueSelect from '../IVueSelect/IVueSelect';
import IVueOption from '../IVueSelect/IVueOption';
import IVueInput from '../IVueInput/IVueInput';

export default {
      name: 'IVueAutoComplete',
      props: {
            /*
            * 绑定的值，可使用 v-model 双向绑定
            * 
            * @type {String,Number}
            */
            value: {
                  type: [String, Number],
                  default: ''
            },
            /*
            * 数据源
            * 
            * @type {Array}
            */
            data: {
                  type: Array,
                  default: () => []
            },
            /*
            * 外部过滤方法
            * 
            * @type{Function, Boolean}
            */
            filterMethod: {
                  type: [Function, Boolean],
                  default: false
            },
            /*
            * 输入提示
            * 
            * @type {String}
            */
            placeholder: {
                  type: String,
                  default: '请输入数据'
            },
            /*
            * 禁用输入
            * 
            * @type {Boolean}
            */
            disabled: {
                  type: Boolean,
                  default: false
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
            name: {
                  type: String
            },
            id: {
                  type: String
            },
            /*
            * 输入框清除图标
            * 
            * @type {Boolean}
            */
            clearIcon: {
                  type: String,
                  default: 'cancel'
            }
      },
      data () {
            return {
                  currentValue: this.value,
                  disableEmitChange: false
            }
      },
      computed: {
            // 过滤数据
            filterableData () {
                  // 使用外部传入的过滤方法
                  if (this.filterMethod && this.currentValue) {
                        return this.data.filter((item) => this.filterMethod(this.currentValue, item));
                  }
                  else {
                        return this.data;
                  }
            }
      },
      methods: {
            // 搜索方法
            searchMethod (query) {
                  this.$emit('on-search', query)
            },
            // 获取焦点事件
            handleFocus (event) {
                  this.$emit('on-focus', event);
            },
            // 失去焦点事件
            handleBlur (event) {
                  this.$emit('on-blur', event);
            },
            // 点击选项
            handleChange (value) {
                  this.currentValue = value;

                  this.$refs.iVueInput.$refs.input.blur();
                  this.$emit('on-select', value);
            }
      },
      watch: {
            value (value) {
                  if ( this.currentValue !== value) {
                        this.disableEmitChange = true;
                  }
                  this.currentValue = value;
            },
            currentValue (currentValue) {
                  this.$refs.ivueSelect.filterQuery = currentValue;
                  this.$emit('input', currentValue);

                  if (this.disableEmitChange) {
                        this.disableEmitChange = false;
                        return;
                  }

                  this.$emit('on-change', currentValue);
            }
      },
      components: {
            IVueSelect,
            IVueOption,
            IVueInput
      }
}
</script>

<style>
</style>
