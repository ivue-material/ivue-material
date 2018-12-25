<template>
      <IvueSelect
            :placeholder="placeholder"
            :value="currentValue"
            :disabled="disabled"
            :searchMethod="searchMethod"
            filterable
            autocomplete
            @on-change="handleChange"
            :class="prefixCls"
            ref="ivueSelect"
      >
            <!-- 输入框 -->
            <slot name="input">
                  <IvueInput
                        v-model="currentValue"
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
                  ></IvueInput>
            </slot>
            <!-- 选项 -->
            <slot>
                  <IvueOption v-for="item in filterableData" :value="item" :key="item">{{item}}</IvueOption>
            </slot>
      </IvueSelect>
</template>

<script>
import IvueSelect from '../ivue-select/ivue-select';
import IvueOption from '../ivue-select/ivue-option';
import IvueInput from '../ivue-input/ivue-input';

const prefixCls = 'ivue-auto-complete';

export default {
      name: prefixCls,
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
                  // 当前改变的值
                  currentValue: this.value,
                  // 禁止发送 change 事件
                  disableEmitChange: false,
                  prefixCls: prefixCls
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
            // 发送搜索方法
            searchMethod (query) {
                  this.$emit('on-search', query)
            },
            // 发送获取焦点事件
            handleFocus (event) {
                  this.$emit('on-focus', event);
            },
            // 发送失去焦点事件
            handleBlur (event) {
                  this.$emit('on-blur', event);
            },
            // 发送点击选项
            handleChange (value) {
                  this.currentValue = value;
                  this.$refs.iVueInput.$refs.input.blur();
                  this.$emit('on-select', value);
            }
      },
      watch: {
            // 监听v-model
            value (value) {
                  if (!value || value.length === 0) {
                        // 输入框获取焦点
                        this.$refs.iVueInput.$refs.input.focus();
                  }

                  if (this.currentValue !== value) {
                        this.disableEmitChange = true;
                  }
                  this.currentValue = value;
            },
            // 监听当前值得变化
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
            IvueSelect,
            IvueOption,
            IvueInput
      }
}
</script>

