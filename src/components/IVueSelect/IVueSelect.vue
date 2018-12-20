<template>
  <div
    :class="classes"
    v-click-outside.capture="onClickOutside"
    v-click-outside:mousedown.capture="onClickOutside"
  >
    <div
      :class="selectionClasses"
      :tabindex="selectTabindex"
      @click="toggleMenu"
      @mouseenter="hasMouseHover = true"
      @mouseleave="hasMouseHover = false"
      @keydown.down.prevent="handldKeyDown"
      @keydown.up.prevent="handldKeyDown"
      @keydown.enter="handldKeyDown"
      @keydown.esc="handldKeyDown"
    >
      <slot name="input">
        <input type="hidden" :value="selectValue">
        <IvueSleectHead
          :values="values"
          :multiple="multiple"
          :multipleCloseIcon="multipleCloseIcon"
          :arrowDownIcon="arrowDownIcon"
          :filterable="filterable"
          :resetSelectIcon="resetSelectIcon"
          :clearable="canClearable"
          :filterQueryProp="filterQuery"
          :disabled="disabled"
          :placeholder="placeholder"
          @on-filter-query-change="onFilterQueryChange"
          @on-input-focus="isFocused = true"
          @on-input-blur="isFocused = false"
          @on-clear="clearSingleSelect"
        ></IvueSleectHead>
      </slot>
    </div>
    <!-- 下拉菜单 -->
    <transition name="transition-drop">
      <IvueDropDown ref="ivueDropDown" v-show="dropVisible" :class="dropdownClass">
        <!-- 没有找到数据时的提示 -->
        <ul :class="`${prefixCls}-not-find`" v-show="showNotFindText">
          <li>{{notFindText}}</li>
        </ul>
        <!-- 数据列表 -->
        <ul :class="`${prefixCls}-dropdown-list`">
          <!-- 函数式组件用于提升渲染性能纯渲染组件 -->
          <FunctionalOptions
            :slotOption="slotOptions"
            :slotUpdateHook="updateSlotOptions"
            :options="selectOptions"
          ></FunctionalOptions>
        </ul>
      </IvueDropDown>
    </transition>
  </div>
</template>

<script>
// 注册外部点击事件插件
import { directive as clickOutside } from '../../utils/ClickOutside';

// 输入框
import IvueSleectHead from './IvueSelectHead.vue';
// 下拉菜单
import IvueDropDown from './IvueDropDown.vue';
// 函数式组件用于提升渲染性能纯渲染组件
import FunctionalOptions from './FunctionalOptions.vue';

const prefixCls = 'ivue-select';
const optionRegexp = /^ivue-option$|^IvueOption$/i;
const optionGroupRegexp = /^ivue-option-group$|^IvueOptionGroup$/i;

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

  const childrenOption = children.reduce((arr, el) => [...arr, ...findOptionsInVNode(el)], []).filter(Boolean);

  return childrenOption.length > 0 ? childrenOption : [];
}

// 提取选项
// reduce 累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。放入数组
const extractOptions = (options) => options.reduce((options, slotEntry) => {
  if (options && slotEntry) {
    return options.concat(findOptionsInVNode(slotEntry));
  }
}, []);

// 获取嵌套属性
const getNestedProperty = (obj, path) => {
  const keys = path.split('.');

  return keys.reduce((option, key) => {
    if (option) {
      return option && option[key] || null
    }
  }, obj);
}

// 获取选项的 label
const getOptionLabel = (option) => {
  if (option.componentOptions.propsData.label) {
    return option.componentOptions.propsData.label;
  }

  // 获取text内容
  const textContent = (option.componentOptions.children || []).reduce((string, children) => {
    const _childrenVNode = children.children;

    // 判断是否存在更深的子节点
    if (_childrenVNode && _childrenVNode.length > 0) {
      return _childrenVNode.reduce((str, vnode) => {
        return str + (vnode.text || '');
      }, '');
    }
    else {
      return string + (children.text || '');
    }

  }, '');

  const innerHTML = getNestedProperty(option, 'data.domProps.innerHTML');

  return textContent || (typeof innerHTML === 'string' ? innerHTML : '');
}

// 设置组件的prop值
const applyProp = (node, propName, value) => {
  return {
    ...node,
    componentOptions: {
      ...node.componentOptions,
      propsData: {
        ...node.componentOptions.propsData,
        [propName]: value
      }
    }
  };
}

export default {
  name: prefixCls,
  // 注册局部指令
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
    * @type{String}
    */
    multipleCloseIcon: {
      type: String,
      default: 'close'
    },
    /*
    * 重置选择图标
    * 
    * @type{String}
    */
    resetSelectIcon: {
      type: String,
      default: 'cancel'
    },
    /*
    * 下拉图标
    * 
    * @type{String}
    */
    arrowDownIcon: {
      type: String,
      default: 'keyboard_arrow_down'
    },
    /*
    * 是否可以清除选择
    * 
    * @type{Boolean}
    */
    clearable: {
      type: Boolean,
      default: false
    },
    /*
    * 是否禁用选择组件
    * 
    * @type{Boolean}
    */
    disabled: {
      type: Boolean,
      default: false
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
    * 自动完成
    * 
    * @type{Boolean}
    */
    autoComplete: {
      type: Boolean,
      default: false
    },
    /*
    * 搜索方法
    * 
    * @type{Function}
    */
    searchMethod: {
      type: Function
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
      slotOptions: this.$slots.default,
      /*
      * 焦点项
      *
      * @type {Number}
      */
      focusIndex: -1,
      /*
      * 过滤输入框输入数据
      *
      * @type {String}
      */
      filterQuery: '',
      /*
      * 是否开始输入框过滤
      *
      * @type {Boolean}
      */
      filterQueryChange: false,
      /*
      * 过滤输入框焦点位置
      *
      * @type {Boolean}
      */
      caretPosition: -1,
      /*
      * 判断是否有焦点
      *
      * @type {Boolean}
      */
      isFocused: false,
      /*
      * 鼠标悬浮
      *
      * @type {Boolean}
      */
      hasMouseHover: false,
      /*
      * 下一个搜索请求
      *
      * @type {String}
      */
      lastSearchQuery: ''
    }
  },
  mounted () {
    const { onOptionClick, selectOptions, getInitialValue, getOptionData } = this;

    // 注册参数选择事件
    this.$on('on-select-option', onOptionClick);

    // 设置初始值
    if (!this.isSearchMethod && selectOptions.length > 0) {
      this.values = getInitialValue().map((value) => {
        if (typeof value === 'undefined' && !value) {
          return null;
        }

        return getOptionData(value);
      }).filter(Boolean);
    }
  },
  computed: {
    // 外部样式
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-default`]: !this.multiple,
          [`${prefixCls}-multiple`]: this.multiple,
          [`${prefixCls}-visible`]: this.visibleMenu,
          [`${prefixCls}-disabled`]: this.disabled
        }
      ]
    },
    // 选择框样式
    selectionClasses () {
      return [
        `${prefixCls}-selection-default`,
        {
          [`${prefixCls}-selection`]: !this.autoComplete

        }
      ]

    },
    // 菜单样式
    dropdownClass () {
      return {
        [`ivue-auto-complete`]: this.autoComplete
      }
    },
    // 当前选择的值
    selectValue () {
      const { labelAndValue, values, multiple } = this;

      // 判断是否有开启返回label和value
      if (labelAndValue) {
        return multiple ? values : values[0];
      }
      else {
        return multiple ? values.map((option) => option.value) : (values[0] || {}).value;
      }
    },
    // 扁平化选项数据
    flatOptionsData () {
      // 提取选项
      return extractOptions(this.selectOptions);
    },
    // 获取菜单选择列表
    selectOptions () {
      const { slotOptions, focusIndex, values, handleOption, filterQueryChange, validateOption, filterable, autoComplete } = this;

      // 获取选项的列表
      const selectOptions = [];
      // 获取插槽选项的数据
      const slotOptionsData = (slotOptions || []);
      // 选项计数器，计算有多少个选项
      let optionCounter = -1;
      // 当前焦点项
      const currentIndex = focusIndex;
      // 选择的选项
      const selectedValues = values.filter(Boolean).map(({ value }) => value);
      const selectedKeys = values.filter(Boolean).map(({ keys }) => keys);

      // 判断是否有自动输入
      if (autoComplete) {
        const copyChildren = (node, fn) => {
          return {
            ...node,
            children: (node.children || []).map(fn).map((child) => copyChildren(child, fn))
          }
        }

        const autoCompleteOptions = extractOptions(slotOptionsData);
        const selectedSlotOption = autoCompleteOptions[currentIndex];

        return autoCompleteOptions.map((node, index) => {
          if (node === selectedSlotOption || getNestedProperty(node, 'componentOptions.propsData.value') === this.value) {
            return applyProp(node, 'isFocused', true);
          }

          return copyChildren(node, (child) => {
            if (selectedSlotOption && child !== selectedSlotOption) {
              return child;
            }
            return applyProp(child, 'isFocused', true);
          });
        });
      }

      for (let option of slotOptionsData) {
        // 获取选项组件里的数据
        let componentOptions = option.componentOptions;

        if (!componentOptions) {
          continue;
        }

        // 判断是否使用了选项组
        if (componentOptions.tag.match(optionGroupRegexp)) {
          let childrenGroup = componentOptions.children;

          // 删除过滤子节点
          if (filterable) {
            childrenGroup = childrenGroup.filter(({ componentOptions }) => validateOption(componentOptions));
          }

          childrenGroup = childrenGroup.map((childrenGroupOption) => {
            // 选项计数器
            optionCounter = optionCounter + 1;
            return this.handleOption(childrenGroupOption, selectedValues, null, optionCounter === currentIndex);
          });

          // 判断是否有子节点
          if (childrenGroup.length > 0) {
            selectOptions.push({ ...option, componentOptions: { ...componentOptions, children: childrenGroup } });
          }

        }
        else {
          //如果没有 filterQueryChange ，则忽略选项
          if (filterQueryChange) {
            const optionFilter = filterable ? validateOption(componentOptions) : option;
            if (!optionFilter) {
              continue;
            }
          }

          // 选项计数器
          optionCounter = optionCounter + 1;

          selectOptions.push(handleOption(option, selectedValues, selectedKeys, optionCounter === currentIndex));
        }
      }

      /*
      * 这是一个组件数组 [components]
      */
      return selectOptions;
    },
    // 显示没有数据时的文本
    showNotFindText () {
      return this.selectOptions && this.selectOptions.length === 0 && (!this.isSearchMethod);
    },
    // 是否可以显示重置选择按钮
    canClearable () {
      const { hasMouseHover, clearable, multiple, disabled } = this;

      // 多选模式下无效
      return (hasMouseHover && clearable && !multiple && !disabled);
    },
    //  tab 键顺序
    selectTabindex () {
      return this.disabled || this.filterable ? -1 : 0
    },
    // 显示下拉菜单
    dropVisible () {
      let status = true;
      const noSelectOptions = !this.selectOptions || this.selectOptions.length === 0;

      if (this.filterQuery === '' && noSelectOptions && this.isSearchMethod) {
        status = false;
      }

      if (this.autoComplete && noSelectOptions) {
        status = false;
      }

      return this.visibleMenu && status;
    },
    // 判断是是否是一个方法
    isSearchMethod () {
      return typeof this.searchMethod === 'function';
    }
  },
  methods: {
    // 点击外部
    onClickOutside (event) {
      const { visibleMenu, hideMenu, filterable, autoComplete } = this;

      // 判断是否显示了菜单
      if (visibleMenu) {
        if (event.type === 'mousedown') {
          event.preventDefault();
          return;
        }

        if (filterable) {
          const input = this.$el.querySelector('input[type="text"]');
          // 第一个选定字符的索引
          this.caretPosition = input.selectionStart;

          this.$nextTick(() => {
            const caretPosition = this.caretPosition === -1 ? input.value.length : this.caretPosition;

            input.setSelectionRange(caretPosition, caretPosition);

            input.blur();
          });
        }

        if (!autoComplete) {
          event.stopPropagation();
        }
        event.preventDefault();
        // 点击后隐藏菜单
        hideMenu();

        this.isFocused = true;
      }
      else {
        this.caretPosition = -1;
        this.isFocused = false;
      }
    },
    // 点击菜单
    toggleMenu (event, force) {
      // 选择组件是否禁用
      if (this.disabled) {
        return false;
      }

      // 设置菜单状态
      this.visibleMenu = typeof force !== 'undefined' ? force : !this.visibleMenu;
      if (this.visibleMenu) {
        // 注册点击事件
        this.$refs.ivueDropDown.$emit('on-update-drop-down');
      }
      // 菜单收起
      else {
        // 取消焦点
        if (this.filterable) {
          const input = this.$el.querySelector('input[type="text"]');
          input.blur();
        }
      }
    },
    // 隐藏菜单
    hideMenu () {
      this.toggleMenu(null, false);
    },
    // 更新插槽数据
    updateSlotOptions () {
      if (this.$slots.default) {
        this.slotOptions = this.$slots.default;
      }
    },
    // 提取选项数据
    handleOption (option, values, keys, isFocused) {
      // 如果选项节点没有子组件就直接返回选项节点
      if (!option.componentOptions) {
        return option;
      }

      // 获取选项的值
      const optionValue = option.componentOptions.propsData.value;
      const disabled = option.componentOptions.propsData.disabled;
      const optionKeys = option.key;

      // 判断是否选中当前选项
      const isSelect = (optionKeys && keys) ? keys.includes(optionKeys) && values.includes(optionValue) : values.includes(optionValue);

      const propsData = {
        ...option.componentOptions.propsData,
        selected: isSelect,
        isFocused: isFocused,
        keys: option.key,
        disabled: typeof disabled === 'undefined' ? false : disabled !== false
      };

      // 设置选项组件的参数
      return {
        ...option,
        componentOptions: {
          ...option.componentOptions,
          propsData: propsData
        }
      };

    },
    // 选项菜单点击
    onOptionClick (option) {
      const { hideMenu, setFocusIndex, multiple, filterable, autoComplete, isSearchMethod } = this;

      // 判断是否开启了多选
      if (this.multiple) {

        const selected = this.values.find(({ value, keys }) => {
          if (keys) {
            return (keys === option.keys) && (value === option.value);
          }
          else {
            return value === option.value;
          }
        });

        // 设置搜索请求
        if (isSearchMethod) {
          this.lastSearchQuery = this.lastSearchQuery || this.filterQuery;
        }
        else {
          this.lastSearchQuery = '';
        }


        if (selected) {
          this.values = this.values.filter(({ value, keys }) => {
            // 如果有key 就使用key去匹配删除
            if (keys) {
              return ((keys !== option.keys) && (value !== option.value)) || ((value === option.value) && (keys !== option.keys));
            }
            else {
              return (value !== option.value);
            }
          });
        }
        else {
          this.values = this.values.concat(option);
        }

        this.isFocused = true;
      }
      else {
        // 过滤输入框数据
        this.filterQuery = String(option.label).trim();
        // 最终渲染的数据
        this.values = [option];
        // 点击后隐藏菜单
        hideMenu();
        // 搜索请求
        this.lastSearchQuery = '';
      }

      // 判断是否开启过滤
      if (filterable) {
        const input = this.$el.querySelector('input[type="text"]');

        this.$nextTick(() => {
          input.blur();
        });
      }

      // 获取焦点项
      this.focusIndex = setFocusIndex(option);

      // 判断是否进行了过滤输入
      if (this.filterQueryChange) {
        // 等菜单动画执行完再清除
        setTimeout(() => {
          this.filterQueryChange = false;
        }, 300);
      }
      else {
        // 等菜单动画执行完再清除
        this.$nextTick(() => {
          this.filterQueryChange = false;
        });
      }
    },
    // 获取选项数据
    getOptionData (data) {
      const { flatOptionsData, setFocusIndex } = this;

      const option = flatOptionsData.find(({ componentOptions }) => {
        if (typeof data === 'object') {
          return ((componentOptions.propsData.value === data.value) && (componentOptions.propsData.keys === data.keys));
        }
        else {
          return componentOptions.propsData.value === data
        }
      });

      if (!option) {
        return null;
      }

      const label = getOptionLabel(option);

      // 获取焦点项
      this.focusIndex = setFocusIndex(data);
      this.filterQuery = '';

      return {
        value: data.value || data,
        label: label,
        keys: option.key
      }
    },
    // 获取初始值value
    getInitialValue () {
      const { value, getOptionData, multiple, isSearchMethod } = this;

      let initialValue = Array.isArray(value) ? value : [value];
      // 判断 值 === undefined 或者是 ''而且 参数不是无穷大
      if ((typeof initialValue[0] === 'undefined' || (String(initialValue[0]).trim() === '' && !Number.isFinite(initialValue[0])))) {
        initialValue = [];
      }

      if (isSearchMethod && !multiple && value) {
        // 获取选项数据
        const data = getOptionData(value);

        // 过滤输入框数据
        this.filterQuery = data ? data.label : String(value);
      }

      return initialValue.filter((item) => {
        return Boolean(item) || item === 0;
      });
    },
    // 设置选项焦点位置
    setFocusIndex (option) {
      return this.flatOptionsData.findIndex((opt) => {
        if (!opt || !opt.componentOptions) {
          return false;
        }

        if (typeof option === 'object') {
          // 判断是否有key 使用key匹配选项
          if (option.keys) {
            return opt.key === option.keys;
          }
          else {
            return opt.componentOptions.propsData.value === option.value;
          }
        }
        else {
          return opt.componentOptions.propsData.value === option;
        }
      });
    },
    // 过滤输入框输入
    onFilterQueryChange (filterQuery) {
      // 是否显示下拉菜单
      if (filterQuery.length > 0 && filterQuery !== this.filterQuery) {
        this.visibleMenu = true;
      }

      // 输入框需要过滤的数据
      this.filterQuery = filterQuery;

      // 输入框过滤输入开始
      this.filterQueryChange = true;
    },
    // 过滤选项组件
    validateOption ({ children, elm, propsData }) {
      // value
      const value = propsData.value;
      // label
      const label = propsData.label || '';
      // 文本内容 将数组元素计算为一个值（从左到右）
      const textContent = (elm && elm.textContent) || (children || []).reduce((str, node) => {
        const nodeText = node.elm ? node.elm.textContent : node.text;

        return `${str}${nodeText}`;
      }, '') || '';

      // 把数据转换成字符串
      const stringValues = JSON.stringify([value, label, textContent]);

      // 把输入框数据转换成小写去除前后空格
      const filterQuery = this.filterQuery.toLowerCase().trim();

      // 判断 stringValues 数组中是否包含 filterQuery 中的值 includes()
      return stringValues.toLowerCase().includes(filterQuery);
    },
    // 重置数据
    resetData () {
      this.focusIndex = -1;
      this.values = [];
      this.hasMouseHover = false;

      // 等菜单动画消失后再清除
      setTimeout(() => {
        this.filterQuery = '';
        this.filterQueryChange = false;
        this.isClear = false;
      }, 300)
    },
    // 清楚单项选择数据
    clearSingleSelect () {
      this.$emit('on-clear'); // API 点击清空按钮时触发

      this.isClear = true;

      // 隐藏菜单
      this.hideMenu();

      // 初始化数据
      if (this.clearable) {
        this.resetData();
      }
    },
    // 导航选项
    navigateOptions (direction) {
      const optionLength = this.flatOptionsData.length - 1;

      let index = this.focusIndex + direction;
      if (index < 0) {
        index = optionLength;
      }
      // 重置下标
      if (index > optionLength) {
        index = 0;
      }

      // 寻找下标选项
      if (direction > 0) {
        let activeOption = -1;
        for (let i = 0; i < this.flatOptionsData.length; i++) {
          // 判断选项是否可选
          const isActiveOption = !this.flatOptionsData[i].componentOptions.propsData.disabled;

          // 设置激活的选项
          if (isActiveOption) {
            activeOption = i;
          }

          if (activeOption >= index) {
            break;
          }
        }
        index = activeOption;
      }
      else {
        let activeOption = this.flatOptionsData.length;
        for (let i = optionLength; i >= 0; i--) {
          // 判断选项是否可选
          const isActiveOption = !this.flatOptionsData[i].componentOptions.propsData.disabled;

          // 设置激活的选项
          if (isActiveOption) {
            activeOption = i;
          }
          if (activeOption <= index) {
            break;
          }
        }
        index = activeOption;
      }

      // 设置焦点选项
      this.focusIndex = index;
    },
    // 按键
    handldKeyDown (event) {
      const { visibleMenu, navigateOptions, hideMenu, focusIndex, flatOptionsData, getOptionData, onOptionClick, toggleMenu } = this;

      // Backspace
      if (event.key === 'Backspace') {
        return;
      }
      if (visibleMenu) {
        event.preventDefault();
        // Tab
        if (event.key === 'Tab') {
          event.stopPropagation();
        }
        // next
        if (event.key === 'ArrowUp') {
          navigateOptions(-1);
        }
        // prev
        if (event.key === 'ArrowDown') {
          navigateOptions(1);
        }
        // enter
        if (event.key === 'Enter') {
          if (focusIndex === -1) {
            return hideMenu();
          }

          const optionComponent = flatOptionsData[focusIndex];
          const option = getOptionData(optionComponent.componentOptions.propsData);

          onOptionClick(option);
        }
        // esc
        if (event.key === 'Escape') {
          event.stopPropagation();
          hideMenu();
        }
      }
      else {
        const keysCanOpenMenu = ['ArrowDown', 'ArrowUp'];
        // 如果焦点在当前选择框的话按 next or prev 可以打开选项菜单
        if (keysCanOpenMenu.includes(event.key)) {
          toggleMenu(null, true);
        }
      }
    }
  },
  watch: {
    // 监听选择的值
    value (value) {
      const { getInitialValue, getOptionData, selectValue } = this;

      if (value === undefined || value === null) {
        this.values = [];
      }
      else if (JSON.stringify(value) !== JSON.stringify(selectValue)) {
        this.$nextTick(() => {
          this.values = getInitialValue().map(getOptionData).filter(Boolean);
        })
      }
    },
    // 监听最终渲染的数据的变化
    values (newValue, oldValue) {
      const { labelAndValue, selectValue, value, multiple } = this;

      const _newValue = JSON.stringify(newValue);
      const _oldValue = JSON.stringify(oldValue);

      // 设置v-model的值
      const vModelValue = (labelAndValue && selectValue) ? (multiple ? selectValue.map(({ value }) => value) : selectValue.value) : selectValue;

      // 输入框值
      const emitInput = _newValue !== _oldValue && vModelValue !== value;

      if (emitInput) {
        // 更新 v-model
        this.$emit('input', vModelValue);

        // API 选中的Option变化时触发
        selectValue && this.$emit('on-change', selectValue);
      }
    },
    // 监听焦点
    isFocused (focused) {
      const { filterable, values, multiple } = this;

      // 输入框获取焦点，移除焦点
      const el = filterable ? this.$el.querySelector('input[type="text"]') : this.$el;
      el[focused ? 'focus' : 'blur']();

      // 恢复单选查询值
      const [option] = values;

      // 判断是否有点击删除按钮在进行还原输入框内容
      setTimeout(() => {
        if (option && filterable && !multiple && !focused && !this.isClear) {
          const label = String(option.label || option.value).trim();
          if (label && this.filterQuery !== label) {
            this.filterQuery = label;
          }
        }
      }, 300);
    },
    // 监听过滤输入框输入数据
    filterQuery (filterQuery) {
      // API 搜索词改变时触发 
      this.$emit('on-filter-query-change', filterQuery);

      const { searchMethod, lastSearchQuery, isSearchMethod } = this;

      // 是否是有效查询
      const hasValidQuery = filterQuery !== '' && (filterQuery !== lastSearchQuery || !lastSearchQuery);

      if ((searchMethod && hasValidQuery)) {
        this.focusIndex = -1;
        searchMethod(filterQuery);
      }

      if (filterQuery !== '' && isSearchMethod) {
        this.lastSearchQuery = filterQuery
      }


    },
    // 监听菜单显示隐藏
    visibleMenu (state) {
      // API 下拉框展开或收起时触发
      this.$emit('on-menu-open', state);
    },
    // 监听菜单选择列表
    selectOptions () {
      const { slotOptions } = this;

      if (slotOptions && slotOptions.length === 0) {
        this.filterQuery = '';
      }

    }
  },
  components: {
    IvueSleectHead,
    IvueDropDown,
    FunctionalOptions
  }
}
</script>
