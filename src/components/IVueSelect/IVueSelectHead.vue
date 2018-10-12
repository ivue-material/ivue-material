<template>
      <div @click="onHeaderClick">
            <!-- 普通渲染 -->
            <transition name="ivue-select-fade">
                  <span :class="defaultDisplayClasses"
                        v-show="defaultDisplayValue"
                  >{{defaultDisplayValue}}</span>
            </transition>
            <!-- 多选 -->
            <transition-group name="multiple-transition" v-if="selectedMultiple.length > 0">
                  <div :class="[`${prefixCls}-selection-multiple`]" v-for="(item, index) in selectedMultiple" :key="index">
                        <span>{{item.label}}</span>
                        <IVueIcon :class="[`${prefixCls}-selection-multiple-close`]" @click.native.stop="removeSelectItem(item)">{{multipleCloseIcon}}</IVueIcon>
                  </div>
            </transition-group>
            <!-- 过滤输入框 -->
            <input type="text"
                   v-if="filterable"
                   :class="[`${prefixCls}-input-filter`]"
                   :style="inputStyle"
                   :placeholder="showPlaceholder ? placeholder : ''"
                   spellcheck="false"
                   autocomplete="off"
                   v-model="filterQuery"
                   @focus="onInputFocus"
                   @blur="onInputFocus"
                   @keydown="resetInputState"
                   @keydown.delete="handleInputDelete"
                   ref="input"
             />
            <!-- 下拉图标 -->
            <IVueIcon :class="[`${prefixCls}-arrow`]" v-if="!resetSelect">{{arrowDownIcon}}</IVueIcon>
            <!-- 重置选择 -->
            <IVueIcon :class="[`${prefixCls}-arrow`,`${prefixCls}-clear`]" 
                      v-if="resetSelect" 
                      @click.native.stop="onClear"
                      @mousedown.native.stop="onClear"
            >{{resetSelectIcon}}</IVueIcon>
      </div>
</template>

<script>
import EmitterEvent from '../../utils/mixins/EmitterEvent';
import IVueIcon from '../IVueIcon';

const prefixCls = 'ivue-select';

export default {
      name: 'IVueSelectHead',
      mixins: [EmitterEvent],
      props: {
            /*
            * 是否开启多选
            * 
            * @type{Boolean}
            */
            multiple: {
                  type: Boolean,
                  default: false
            },
            /*
            * 最终渲染的数据
            * 
            * @type {Array}
            */
            values: {
                  type: Array,
                  default: () => []
            },
            /*
            * 输入提示
            * 
            * @type {String}
            */
            placeholder: {
                  type: String,
                  default: '请选择'
            },
            /*
            * 是否可清除
            * 
            * @type {Function,Boolean}
            */
            clearable: {
                  type: [Function, Boolean],
                  default: false
            },
            /*
            * 开启过滤筛选
            * 
            * @type{Boolean}
            */
            filterable: {
                  type: Boolean,
                  default: false
            },
            /*
            * 多项选择关闭图标
            * 
            * @type{Boolean}
            */
            multipleCloseIcon: {
                  type: String
            },
            /*
            * 下拉图标
            * 
            * @type{Boolean}
            */
            arrowDownIcon: {
                  type: String
            },
            /*
            * 重置选择图标
            * 
            * @type{Boolean}
            */
            resetSelectIcon: {
                  type: String
            },
            /*
            * 是否可以清楚选择
            * 
            * @type{Boolean}
            */
            clearable: {
                  type: Boolean,
                  default: false
            },
            /*
            * 外部输入框输入数据
            * 
            * @type{String}
            */
            filterQueryProp: {
                  type: String,
                  default: ''
            }
      },
      data () {
            return {
                  prefixCls: prefixCls,
                  /*
                  * 输入框长度
                  * 
                  * @type { Number}
                  */
                  inputLength: 20,
                  /*
                  * 输入框输入数据
                  * 
                  * @type { String}
                  */
                  filterQuery: '',
                  /*
                  * 输入框是否输入-这里不是判断直接赋值v-model而是输入框确实有输入行为
                  * 
                  * @type { Boolean}
                  */
                  isInputChange: false
            }
      },
      computed: {
            // 普通显示的class
            defaultDisplayClasses () {
                  const { showPlaceholder, multiple, filterable } = this;

                  return [
                        {
                              [`${prefixCls}-selection-value`]: !showPlaceholder && !multiple && !filterable,
                              [`${prefixCls}-placeholder`]: showPlaceholder && !filterable
                        }
                  ]
            },
            // 普通显示的值
            defaultDisplayValue () {
                  const { values, multiple, selectedSingle, placeholder } = this;

                  const selected = values[0];

                  // 判断是否是多选 或者 是否开启了输入框过滤
                  if ((multiple && values.length > 0) || this.filterable) {
                        return '';
                  }

                  return `${selectedSingle}` || placeholder;
            },
            // 是否显示占位符
            showPlaceholder () {
                  const { values, multiple } = this;

                  let status = false;
                  if (!multiple) {
                        const value = values[0];

                        // 判断 undefined 和清除空格
                        if (typeof value === 'undefined' || String(value).trim() === '') {
                              status = true;
                        }
                  }
                  else {
                        if (!values.length > 0) {
                              status = true;
                        }
                  }

                  return status;
            },
            // 选择单个选项
            selectedSingle () {
                  const { values } = this;

                  const selected = values[0];

                  return selected ? selected.label :  '';
            },
            // 多项选择
            selectedMultiple () {
                  return this.multiple ? this.values : [];
            },
            // 输入框样式
            inputStyle () {
                  let style = {};

                  if (this.multiple) {
                        if (this.showPlaceholder) {
                              style.width = "100%";
                        }
                        else {
                              style.width = `${this.inputLength}px`;
                        }
                  }

                  return style;
            },
            // 重置选择
            resetSelect () {
                  return !this.showPlaceholder && this.clearable;
            }
      },
      methods: {
            // 删除选择选项
            removeSelectItem (value) {
                  // 把事件注册到 IVueSelect 组件
                  this.dispatch('IVueSelect', 'on-select-option', value);
            },
            // 判断焦点发送事件
            onInputFocus (e) {
                  this.$emit(e.type === 'focus' ? 'on-input-focus' : 'on-input-blur');
            },
            // 重置输入框状态
            resetInputState () {
                  this.inputLength = this.$refs.input.value.length * 12 + 20;
            },
            // 输入框删除
            handleInputDelete () {
                  const { multiple, selectedMultiple, filterQuery, removeSelectItem } = this;

                  if (multiple && selectedMultiple.length && filterQuery === '') {
                        removeSelectItem(selectedMultiple[selectedMultiple.length - 1]);
                  }
            },
            // 输入框点击
            onHeaderClick(e){
                if (this.filterable && e.target === this.$el){
                    this.$refs.input.focus();
                }
            },
            // 清楚选择
            onClear () {
                  this.$emit('on-clear');
            }
      },
      watch: {
            // 监听最终渲染的数据
            values ([value]) {
                  const { filterable, multiple } = this;

                  if (!filterable) {
                        return;
                  }

                  this.isInputChange = true;

                  // 判断多选
                  if (multiple) {
                        this.filterQuery = '';
                        // 判断输入框是否输入-这里不是判断直接赋值v-model而是输入框确实有输入行为
                        this.isInputChange = false;
                        return;
                  }

                  if (typeof value === 'undefined' || value === '' || value === null) {
                        this.filterQuery = '';
                  }
                  else {
                        this.filterQuery = value.label;
                  }

                  this.$nextTick(() => {
                        // 判断输入框是否输入-这里不是判断直接赋值v-model而是输入框确实有输入行为
                        this.isInputChange = false;
                  });

            },
            // 监听过滤输入
            filterQuery (value) {
                  if (this.isInputChange) {
                        this.isInputChange = false;
                        return;
                  }

                  this.$emit('on-filter-query-change', value)
            },
            // 监听外部过滤输入
            filterQueryProp (filterQuery) {
                  if (filterQuery !== this.filterQuery) {
                        this.filterQuery = filterQuery;
                  }
            }
      },
      components: {
            IVueIcon
      }
}
</script>
