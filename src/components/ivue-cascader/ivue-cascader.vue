<script>
// 函数去抖
import debounce from 'lodash.debounce';
// 注册外部点击事件插件
import { directive as clickOutside } from '../../utils/directives/click-outside';
import { isIE, isEdge, escapeRegexpString } from '../../utils/helpers';

import IvueCascaderMenu from './ivue-cascader-menu'
import IvueInput from '../ivue-input'
import IvueIcon from '../ivue-icon'

const prefixCls = 'ivue-cascader';

export default {
    name: prefixCls,
    // 注册局部指令
    directives: { clickOutside },
    props: {
        /**
        * 下拉图标
        *
        * @type{Boolean}
        */
        arrowDownIcon: {
            type: String,
            default: 'keyboard_arrow_down'
        },
        /**
        * 清除按钮图标
        *
        * @type{Boolean}
        */
        clearableIcon: {
            type: String,
            default: 'cancel'
        },
        /**
         * 子选项图标
         *
         * @type {String}
         */
        childrenIcon: {
            type: String,
            default: 'keyboard_arrow_right'
        },
        /**
         * 可选项数据源
         *
         * @type {Array}
         */
        options: {
            type: Array,
            required: true,
            default: []
        },
        /**
         * 配置选项
         *
         * @type {Object}
         */
        props: {
            type: Object,
            default () {
                return {
                    children: 'children',
                    label: 'label',
                    value: 'value',
                    disabled: 'disabled'
                };
            }
        },
        /**
         * 选中项绑定值
         *
         * @type {Array}
         */
        value: {
            type: Array,
            default () {
                return [];
            }
        },
        /**
         * 选项分隔符
         *
         * @type {String}
         */
        separator: {
            type: String,
            default: '/'
        },
        /**
         * 选择触发类型
         *
         * @type {String}
         */
        trigger: {
            type: String,
            default: 'click'
        },
        /**
         * hover 悬停时间
         *
         * @type {Number}
         */
        hoverThreshold: {
            type: Number,
            default: 500
        },
        /**
         * 是否允许选择任意一级的选项
         *
         * @type {Boolean}
         */
        changeOnSelect: {
            type: Boolean
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
        /**
         * 去抖延迟时间
         *
         * @type {Number}
         */
        debounce: {
            type: Number,
            default: 300
        },
        /**
         * 没有搜索到数据时显示的提示
         *
         * @type {String}
         */
        noDataPlaceholder: {
            type: String,
            default: '无匹配数据'
        },
        /**
         * 输入框 input placeholder
         *
         * @type {String}
         */
        placeholder: {
            type: String,
            default: '请选择'
        },
        /**
        * 是否加载中
        *
        * @type {Boolean}
        */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * 清除按钮
         *
         * @type {Boolean}
         */
        clearable: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            prefixCls: prefixCls,
            /**
             * 当前的 value
             *
             * @type {Array}
             */
            currentValue: this.value || [],
            /**
             * 输入框数据
             *
             * @type {String}
             */
            inputValue: '',
            /**
            * 是否显示菜单
            *
            * @type {Boolean}
            */
            visibleMenu: false,
            /**
             * 菜单是否已获取焦点
             *
             * @type {Boolean}
             */
            menuFocus: false,
            /**
             * 扁平化选项
             *
             * @type {Array}
             */
            flatOptions: null,
            /**
             * 输入框去抖
             *
             * @type {Function}
             */
            debouncedInputChange () { },
            /**
             * 深度观察的数据选项
             *
             * @type {Array}
             */
            deepOptions: null,
            /**
             * 过滤到的选项
             *
             * @type {Array}
             */
            filteredFlatOptions: null,
            /**
             * input 输入框宽度
             *
             * @type {Number}
             */
            inputWidth: 0,
            /**
             * 输入框 hover
             *
             * @type {Boolean}
             */
            inputHover: false
        }
    },
    created () {
        // 创建输入框去抖函数
        this.debouncedInputChange = debounce((value) => {

            // 输入框数据改变
            this.$nextTick(() => {
                this.handleInputChange(value);
            });

        }, this.debounce);

    },
    mounted () {
        // 是否开启过滤
        if (this.filterable) {
            this.flatOptions = this.flattenOptions(this.options);
        }
    },
    computed: {
        labelKey () {
            return this.props.label || 'label';
        },
        valueKey () {
            return this.props.value || 'value';
        },
        childrenKey () {
            return this.props.children || 'children';
        },
        disabledKey () {
            return this.props.disabled || 'disabled';
        },
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-visible`]: this.visibleMenu,
                }
            ]
        },
        cascaderClasses () {
            return [
                `${prefixCls}-selection-default`,
                `${prefixCls}-selection`,
            ]
        },
        // 获取当前选择的 labels
        currentlabels () {
            const { valueKey, labelKey, childrenKey } = this;

            let options = this.options;
            let labels = [];

            this.currentValue.forEach((value) => {
                // 获取当前的选项
                const targetOption = options && options.filter((option) => option[valueKey] === value || option[labelKey] === value)[0];
                if (targetOption) {
                    // 当前的 label
                    labels.push(targetOption[labelKey]);

                    // 当前的选项 option
                    options = targetOption[childrenKey];
                }
            });

            return labels;
        },
        // 输入框只读
        readonly () {
            return !this.filterable || (!isIE() && !isEdge() && !this.visibleMenu);
        }
    },
    methods: {
        // 渲染输入框
        genInput () {
            const {
                readonly,
                currentlabels,
                inputValue,
                inputChange,
                arrowDownIcon,
                placeholder,
                clearableIcon,
                inputHover,
                clearable
            } = this;

            const _arrowDown = this.$createElement(IvueIcon, {
                class: {
                    [`${prefixCls}-arrow`]: true,
                },
                slot: 'suffix',
            }, arrowDownIcon);

            const _clearable = this.$createElement(IvueIcon, {
                slot: 'suffix',
                nativeOn: {
                    'click': this.clearValue
                }
            }, clearableIcon);

            return this.$createElement(IvueInput, {
                props: {
                    readonly: readonly,
                    placeholder: currentlabels.length > 0 ? '' : placeholder,
                    value: inputValue
                },
                on: {
                    'input': inputChange
                },
                ref: 'input'
            }, [
                    clearable && inputHover && currentlabels.length ? _clearable : _arrowDown
                ]);
        },
        // 渲染 label
        genLabel () {
            const { currentlabels, separator, inputValue } = this;

            /**
             * renderList 循环遍历
             * Runtime helper for rendering v-for lists.
             *  val: any,
                keyOrIndex: string | number,
                index?: number
             */
            const label = this._l(currentlabels, (label, index) => {
                return [label, index < currentlabels.length - 1 ? this.$createElement('span', ` ${separator} `) : null];
            });

            return this.$createElement('span', {
                class: `${prefixCls}-label`,
                directives: [
                    {
                        name: 'show',
                        value: inputValue === ''
                    }
                ],
            }, [label]);
        },
        genCascader () {
            const { cascaderClasses, handleClick, genInput, genLabel } = this;

            return this.$createElement('div', {
                class: cascaderClasses,
                on: {
                    click: handleClick
                },
            }, [genInput(), genLabel()]);
        },
        // 渲染菜单
        genMenu () {
            const {
                filteredFlatOptions,
                deepOptions,
                options,
                props,
                visibleMenu,
                currentValue,
                trigger,
                hoverThreshold,
                changeOnSelect,
                handleSelect,
                onClickOutside,
                handleActiveItemChange,
                inputWidth,
                childrenIcon,
                loading
            } = this;

            return this.$createElement(IvueCascaderMenu, {
                props: {
                    options: filteredFlatOptions || deepOptions || options,
                    props: props,
                    visible: visibleMenu,
                    value: currentValue.slice(0),
                    trigger: trigger,
                    hoverThreshold: hoverThreshold,
                    changeOnSelect: changeOnSelect,
                    inputWidth: inputWidth,
                    childrenIcon: childrenIcon,
                    loading: loading
                },
                on: {
                    'select': handleSelect,
                    'close-menu': onClickOutside,
                    'active-item-change': handleActiveItemChange
                },
                directives: [
                    {
                        name: 'show',
                        value: visibleMenu
                    }
                ],
                ref: 'menus'
            })
        },
        // 外部点击事件
        onClickOutside (event) {
            // 隐藏菜单
            this.visibleMenu = false;
        },
        // 键盘事件
        handleKeydown (event) {
            const keyCode = event.keyCode;

            // 确认按钮
            if (keyCode === 13) {
                // 判断菜单是否已经获取焦点
                if (this.menuFocus) {
                    return;
                }
                this.handleClick();
            }
            // 方向键 down
            else if (keyCode === 40) {

                // 展开菜单
                this.visibleMenu = true;
                // 菜单获取焦点
                this.menuFocus = true;

                // 阻止 事件冒泡
                event.stopPropagation();
                // 阻止该元素默认的 keyup 事件
                event.preventDefault();
            }
            // esc键  tab键
            else if (keyCode === 27 || keyCode === 9) {
                // 清除输入框内容
                this.inputValue = '';

                // 隐藏菜单
                if (this.visibleMenu) {
                    this.visibleMenu = false;
                }
            }
        },
        // 点击输入框
        handleClick () {
            // 输入框获取焦点
            this.$refs.input.$refs.input.focus();

            // 开启过滤不隐藏菜单
            if (this.filterable) {
                this.visibleMenu = true;
                return;
            }

            this.visibleMenu = !this.visibleMenu;
        },
        // 菜单点击的选择
        handleSelect (value, close = true) {
            this.currentValue = value;
            this.$emit('input', value);
            this.$emit('change', value);

            if (close) {
                // 点击选择完后隐藏菜单
                this.visibleMenu = false;
            }
        },
        // 菜单激活选项改变
        handleActiveItemChange (value) {
            this.$emit('active-item-change', value);
        },
        // 输入框输入
        inputChange (value) {
            this.inputValue = value;

            // 执行输入框去抖函数
            this.debouncedInputChange(value);
        },
        // 输入框数据改变
        handleInputChange (value) {
            const { visibleMenu, valueKey, labelKey, disabledKey, filteredOptionLabel, noDataPlaceholder } = this;

            if (!visibleMenu) {
                return;
            }
            const flatOptions = this.flatOptions;
            let filteredFlatOptions;

            if (!value) {
                this.filteredFlatOptions = null;
                return;
            }

            // 过滤选项
            filteredFlatOptions = flatOptions.filter((optionStack) => {
                // 检测数组中的元素是否满足指定条件
                return optionStack.some((option) => new RegExp(escapeRegexpString(value), 'i')
                    // 检测输入的 value 是否匹配当前选项的 key
                    .test(option[this.labelKey])
                );
            });

            // 是否找到选项
            if (filteredFlatOptions.length > 0) {
                // 返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值
                filteredFlatOptions = filteredFlatOptions.map((optionStack) => {
                    return {
                        __IS__FLAT__OPTIONS: true,
                        value: optionStack.map((item) => item[valueKey]),
                        label: filteredOptionLabel(value, optionStack),
                        disabled: optionStack.some((item) => item[disabledKey]),
                    }
                });
            }
            else {
                filteredFlatOptions = [{
                    __IS__FLAT__OPTIONS: true,
                    label: noDataPlaceholder,
                    value: '',
                    disabled: true
                }];
            }

            this.filteredFlatOptions = filteredFlatOptions;
        },
        // 扁平化选项数据
        flattenOptions (options, ancestor = []) {
            const { childrenKey } = this;
            let flatOptions = [];

            // 遍历选项数据
            options.forEach((option) => {
                // 创建栈
                const optionsStack = ancestor.concat(option);

                /**
                 * 判断是否有子选项
                 * 数据结构为一下
                 *
                 * [1,1,1]
                 * [1,1,2]
                 * [1,1,3]
                 * [1,2,1]
                 * [1,2,2]
                 * [2,1,1]
                 * [2,1,2]
                 * ......
                 */
                if (!option[childrenKey]) {
                    flatOptions.push(optionsStack)
                }
                else {
                    // 是否允许选择任意一级的选项
                    if (this.changeOnSelect) {
                        flatOptions.push(optionsStack)
                    }

                    // 递归调用遍历子选项 入栈
                    flatOptions = flatOptions.concat(this.flattenOptions(option[childrenKey], optionsStack));
                }
            });

            return flatOptions;
        },
        // 设置过滤后的选项的 label
        filteredOptionLabel (inputValue, optionsStack) {
            const { labelKey, highlightKeyword, separator } = this;

            // 返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值
            return optionsStack.map((option, index) => {
                // label
                const label = option[labelKey];
                // 索引 转换小写
                const keywordIndex = label.toLowerCase().indexOf(inputValue.toLowerCase());
                // 截取输入的文字在label中的位置然后高亮
                const labelPart = label.slice(keywordIndex, inputValue.length + keywordIndex);
                // 渲染节点
                const node = keywordIndex > -1 ? highlightKeyword(label, labelPart) : label;

                return index === 0 ? node : [` ${separator} `, node]
            });
        },
        // 高亮文字
        highlightKeyword (label, keyword) {
            return label.split(keyword).map((key, index) => index === 0 ? key : [
                // 渲染高亮
                this.$createElement('span',
                    { class: { [`${prefixCls}-menu--item---keyword`]: true } },
                    //  text to VNode
                    [this._v(keyword)]),
                key
            ]);
        },
        // 清除数据
        clearValue (ev) {
            ev.stopPropagation();
            this.handleSelect([], true);
        },
    },
    components: {
        IvueInput,
        IvueIcon,
        IvueCascaderMenu
    },
    watch: {
        // 设置菜单是否获取焦点
        menuFocus (focus) {
            if (focus) {
                const firstMenu = this.$refs.menus.$el.querySelectorAll('.ivue-cascader-menu')[0];
                firstMenu.querySelectorAll("[tabindex='-1']")[0].focus();
            }
        },
        // 监听菜单显示隐藏
        visibleMenu (visible) {
            // 隐藏
            if (!visible) {
                // 菜单失去焦点
                this.menuFocus = false;
                // 清除输入框内容
                this.inputValue = '';
            }
            else {
                // 获取输入框宽度
                this.inputWidth = this.$refs.input.$el.offsetWidth;
                this.filteredFlatOptions = null;
            }

            // 发送菜单隐藏显示事件
            this.$emit('visible-change', visible);
        },
        // 监听选项数据变化
        options: {
            // 深度观察
            deep: true,
            handler (value) {
                // 是否开启过滤
                if (this.filterable) {
                    this.flatOptions = this.flattenOptions(this.options);
                }

                this.deepOptions = value;
            }
        }
    },
    render (h) {
        return h('div', {
            class: this.classes,
            on: {
                'keydown': this.handleKeydown,
                'mouseenter': () => {
                    this.inputHover = true;
                },
                'mouseleave': () => {
                    this.inputHover = false;
                },
                'focus': () => {
                    this.inputHover = true;
                },
                'blur': () => {
                    this.inputHover = false;
                }
            },
            directives: [
                {
                    name: 'click-outside',
                    value: this.onClickOutside
                }
            ],
        },
            [
                this.genCascader(),
                this.genMenu()
            ]
        )
    }
}
</script>
