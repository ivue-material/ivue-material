<template>
      <div>
            <!-- 普通渲染 -->
            <span :class="defaultDisplayClasses"
                  v-show="defaultDisplayValue"
            >{{defaultDisplayValue}}</span>
            <IVueIcon :class="[prefixCls + '-arrow']">keyboard_arrow_down</IVueIcon>
      </div>
</template>

<script>
const prefixCls = 'ivue-select';
import IVueIcon from '../IVueIcon';

export default {
      name: 'IVueSelectHead',
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
            }
      },
      data () {
            return {
                  prefixCls: prefixCls
            }
      },
      computed: {
            // 普通显示的class
            defaultDisplayClasses () {
                  return [
                        {
                              [`${prefixCls}-selection-value`]: !this.showPlaceholder && !this.multiple,
                              [`${prefixCls}-placeholder`]: this.showPlaceholder
                        }
                  ]
            },
            // 普通显示的值
            defaultDisplayValue () {
                  const selected = this.values[0];

                  if ((this.multiple && this.values.length > 0)) {
                        return '';
                  }

                  return this.selectedSingle || this.placeholder;
            },
            // 是否显示占位符
            showPlaceholder () {
                  let status = false;
                  if (!this.multiple) {
                        const value = this.values[0];

                        // 判断 undefined 和清除空格
                        if (typeof value === 'undefined' || String(value).trim === '') {
                              status = !this.initialLabel;
                        }
                  }
                  else {
                        if (!this.values.length > 0) {
                              status = true
                        }
                  }

                  return status
            },
            // 选择单个选项
            selectedSingle () {
                  const selected = this.values[0];
                  return selected ? selected.label : (this.initialLabel || '');
            }
      },
      components: {
            IVueIcon
      }
}
</script>

<style>
</style>
