<template>
      <div>
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

             />
            <!-- 下拉图标 -->
            <IVueIcon :class="[prefixCls + '-arrow']">{{arrowDownIcon}}</IVueIcon>
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
            * 初始化 Label
            * 
            * @type{Boolean}
            */
            initialLabel: {
                  type: [String, Number, Array]
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
                  filterQuery: ''
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

                  return selectedSingle || placeholder;
            },
            // 是否显示占位符
            showPlaceholder () {
                  const { values, multiple, initialLabel } = this;

                  let status = false;
                  if (!multiple) {
                        const value = values[0];

                        // 判断 undefined 和清除空格
                        if (typeof value === 'undefined' || String(value).trim() === '') {
                              status = !initialLabel;
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
                  const { values, initialLabel } = this;

                  const selected = values[0];
                  return selected ? selected.label : (initialLabel || '');
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
            }
      },
      methods: {
            // 删除选择选项
            removeSelectItem (value) {
                  // 把事件注册到 IVueSelect 组件
                  this.dispatch('IVueSelect', 'on-select-option', value);
            }
      },
      watch: {
            // 监听过滤输入
            filterQuery (value) {
                  this.$emit('on-filter-query-change', value)
            }
      },
      components: {
            IVueIcon
      }
}
</script>

<style lang="scss">
</style>
