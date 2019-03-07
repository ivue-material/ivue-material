<script>
import IvueCascaderMenu from './ivue-cascader-menu'
import IvueInput from '../ivue-input'
import IvueIcon from '../ivue-icon'
// 注册外部点击事件插件
import { directive as clickOutside } from '../../utils/click-outside';

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
         * 可选项数据源
         *
         * @type {Array}
         */
        options: {
            type: Array,
            required: true
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
            selectValue: '',
            /**
            * 是否显示菜单
            *
            * @type {Boolean}
            */
            visibleMenu: false,
        }
    },
    computed: {
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
            let options = this.options;
            let labels = [];

            this.currentValue.forEach((value) => {
                // 获取当前的选项
                const targetOption = options && options.filter((option) => option[this.props.value] === value)[0];
                if (targetOption) {
                    labels.push(targetOption[this.props.label]);
                    options = targetOption[this.props.children];
                }
            });

            return labels
        }
    },
    methods: {
        // 渲染输入框
        genInput () {
            return this.$createElement(IvueInput, {
                props: {
                    type: this.currentlabels.length > 0 ? 'hidden' : 'text',
                    readonly: 'readonly',
                    placeholder: '请选择',
                    value: this.selectValue
                }
            }, [
                    this.$createElement(IvueIcon, {
                        class: {
                            [`${prefixCls}-arrow`]: true,
                        },
                        slot: 'suffix',
                    }, this.arrowDownIcon)
                ]);
        },
        // 渲染 label
        genLabel () {
            const { currentlabels, separator } = this;
            const label = this._l(currentlabels, (label, index) => {
                return [label, index < currentlabels.length - 1 ? this.$createElement('span', ` ${separator} `) : null];
            });

            return this.$createElement('span', {
                class: `${prefixCls}-label`
            }, [label]);
        },
        genCascader () {
            return this.$createElement('div', {
                class: this.cascaderClasses,
                on: {
                    click: this.handleClick
                }
            }, [this.genInput(), this.genLabel()]);
        },
        // 渲染菜单
        genMenu () {
            return this.$createElement(IvueCascaderMenu, {
                props: {
                    options: this.options,
                    props: this.props,
                    visible: this.visibleMenu,
                    value: this.currentValue.slice(0)
                },
                on: {
                    'select': this.handlePick
                },
                directives: [
                    {
                        name: 'show',
                        value: this.visibleMenu
                    }
                ]
            })
        },
        // 外部点击事件
        onClickOutside (event) {
            // 隐藏菜单
            this.visibleMenu = false;
        },
        // 点击输入框
        handleClick () {
            this.visibleMenu = !this.visibleMenu;
        },
        // 菜单点击的选择
        handlePick (value) {
            this.currentValue = value;
        }
    },
    components: {
        IvueInput,
        IvueIcon,
        IvueCascaderMenu
    },
    render (h) {
        return h('div', {
            class: this.classes,
            directives: [
                {
                    name: 'click-outside',
                    value: this.onClickOutside,
                    modifiers: {
                        quiet: true,
                        once: true
                    }
                }
            ]
        },
            [
                this.genCascader(),
                this.genMenu()
            ]
        )
    }
}
</script>
