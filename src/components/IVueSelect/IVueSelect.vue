<template>
      <div :class="classes" 
            v-click-outside.capture="onClickOutside"
            v-click-outside:mousedown.capture="onClickOutside"
      >
            <div ref="ivueSlectSelection"
                 :class="selectionClasses"
                 @click="toggleMenu"
            >
                  <slot name="input">
                        <input type="hidden" :name="name" :value="selectValue">
                        <IVueSleectHead  
                              :values="values"
                              :multiple="multiple"
                        ></IVueSleectHead>
                  </slot>
            </div>
            <transition name="transition-drop">
                  <IVueDropDown ref="ivueDropDown" 
                                v-show="visibleMenu"
                  >
                        <!-- 没有找到数据时的提示 -->
                        <ul :class="`${prefixCls}-not-find`" v-show="showNotFindText">
                              <li>{{notFindText}}</li>
                        </ul>
                        <!-- 数据列表 -->
                        <ul :class="`${prefixCls}-dropdown-list`">
                              <!-- 函数式组件用于提升渲染性能纯渲染组件 -->
                              <FunctionalOptions
                                    :slotOption="slotOptions"
                                    :slotUpdateHook= "updateSlotOptions"
                                    :options="selectOptions"
                              >
                              </FunctionalOptions>
                        </ul>
                  </IVueDropDown>
            </transition>
      </div>
</template>

<script>
// 注册外部点击事件插件
import { directive as clickOutside } from 'v-click-outside-x';
import IVueSleectHead from './IVueSelectHead.vue';
import IVueDropDown from './IVueDropDown.vue';
// 函数式组件用于提升渲染性能纯渲染组件
import FunctionalOptions from './FunctionalOptions.vue';

const prefixCls = 'ivue-select';
const optionRegexp = /^ivue-option$|^IVueOption$/i;

// 在vnode中查找选项
const findOptionsInVNode = (node) => {
      const options = node.componentOptions;
      if (options && options.tag.match(optionRegexp)) {
            return [node];
      }

      if (!node.children && (!options || !options.children)) {
            return [];
      }

      const children = [...(node.children || []), ...(options && options.children || [])];
      const childrenOption = children.reduce((arr, el) => {
            return [...arr, ...findOptionsInVNode(el)], []
      }).filter();

      return childrenOption.length > 0 ? childrenOption : [];
}

// 提取选项
const extractOptions = (options) => {
      // reduce 累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
      return options.reduce((options, slotEntry) => {
            return options.concat(findOptionsInVNode(slotEntry));
      })

}

// 获取嵌套属性
const getNestedProperty = (obj, path) => {
      const keys = path.split('.');
      return keys.reduce((option, key) => {
            return option && option[key] || null, obj
      });

}

// 获取选项的 label
const getOptionLabel = (option) => {
      if (option.componentOptions.propsData.label) {
            return option.componentOptions.propsData.label;
      }

      // 获取text内容
      const textContent = (option.componentOptions.children || []).reduce((string, children) => {
            return string + (children.text || ''), '';
      });

      const innerHTML = getNestedProperty(option, 'data.domProps.innerHTML');

      return textContent || (typeof innerHTML === 'string' ? innerHTML : '');
}

export default {
      name: 'IVueSelect',
      // 注册自定义指令
      directives: { clickOutside },
      props: {
            /*
            * 设置选择的值
            * 
            * @type{String, Number, Array}
            */
            value: {
                  type: [String, Number, Array],
                  default: ''
            },
            /*
            * 是否使用自动补全组件
            * 
            * @type{Boolean}
            */
            autoComplete: {
                  type: Boolean,
                  default: false
            },
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
            * 是否将label和value一起返回
            * 
            * @type{Boolean}
            */
            labelAndValue: {
                  type: Boolean,
                  default: false
            },
            /*
            * 没有找到数据时的提示
            * 
            * @type{Boolean}
            */
            notFindText: {
                  type: String,
                  default: '无匹配数据'
            },
            name: {
                  type: String
            }
      },
      data () {
            return {
                  prefixCls: prefixCls,
                  /*
                  * 最终渲染的数据
                  * 
                  * @type {Array}
                  */
                  values: [],
                  /*
                  * 需要查询到的值
                  *
                  * @type {String}
                  */
                  query: '',
                  /*
                  * 是否显示菜单
                  *
                  * @type {Boolean}
                  */
                  visibleMenu: false,
                  /*
                  * 插槽数据
                  *
                  * @type {Array}
                  */
                  slotOptions: this.$slots.default
            }
      },
      mounted () {
            // 注册参数选择事件
            this.$on('on-select-option', this.onOptionClick);
      },
      computed: {
            // 外部样式
            classes () {
                  return [
                        `${prefixCls}`,
                        {
                              [`${prefixCls}-default`]: !this.multiple,
                              [`${prefixCls}-visible`]: this.visibleMenu
                        }
                  ]
            },
            // 选择框样式
            selectionClasses () {
                  return {
                        [`${prefixCls}-selection`]: !this.autoComplete
                  }
            },
            // 当前选择的值
            selectValue () {
                  // 判断是否有开启返回label和value
                  if (this.labelAndValue) {
                        return this.multiple ? this.values : this.values[0];
                  }
                  else {
                        return this.multiple ? this.values.map((option) => option.value) : (this.values[0] || {}).value;
                  }
            },
            // 扁平化选项数据
            flatOptionsData () {
                  // 提取选项
                  return extractOptions(this.selectOptions);
            },
            // 获取菜单选择列表
            selectOptions () {
                  // 获取选项的列表
                  const selectOptions = [];
                  // 获取插槽选项的数据
                  const slotOption = (this.slotOptions || []);
                  // 选项计数器，计算有多少个选项
                  let optionCounter = -1;

                  slotOption.forEach((option) => {
                        // 获取选项组件里的数据
                        let componentOptions = option.componentOptions;

                        if (componentOptions && componentOptions.tag.match(optionRegexp)) {
                              let children = componentOptions.children;


                              // option = VNode
                              children = children.map((option) => {
                                    optionCounter = optionCounter + 1;

                                    // 提取选项
                                    return this.handleOption(option);
                              });

                              // 插入VNode
                              if (children.length > 0) {
                                    selectOptions.push({ ...option });
                              }

                        }
                  });

                  /*
                  * 这是一个组件数组 [components]
                  */
                  return selectOptions;
            },
            // 显示没有数据时的文本
            showNotFindText () {
                  return this.selectOptions && this.selectOptions.length === 0;
            }
      },
      methods: {
            // 点击外部
            onClickOutside (event) {
                  console.log(event)
                  // 判断是否显示了菜单
                  if (this.visibleMenu) {
                        if (event.type === 'mousedown') {
                              event.preventDefault();
                              return;
                        }

                        event.preventDefault();
                        // 点击后隐藏菜单
                        this.hideMenu();
                  }
            },
            // 点击菜单
            toggleMenu (event, force) {
                  // 设置菜单状态
                  this.visibleMenu = typeof force !== 'undefined' ? force : !this.visibleMenu;
                  if (this.visibleMenu) {
                        // 注册点击事件
                        this.$refs.ivueDropDown.$emit('on-update-drop-down');
                  }
            },
            // 隐藏菜单
            hideMenu () {
                  this.toggleMenu(null, false);
            },
            // 更新插槽数据
            updateSlotOptions () {
                  this.slotOptions = this.$slots.default;
            },
            // 提取选项数据
            handleOption (option, values, isFocused) {
                  // 如果选项节点没有子组件就直接返回选项节点
                  if (!option.componentOptions) {
                        return option;
                  }
            },
            // 选项菜单点击
            onOptionClick (option) {
                  // 设置需要查询的label
                  this.query = String(option.label).trim();
                  // 最终渲染的数据
                  this.values = [option];
                  // 点击后隐藏菜单
                  this.hideMenu();
            }
      },
      components: {
            IVueSleectHead,
            IVueDropDown,
            FunctionalOptions
      }
}
</script>

<style>
</style>
