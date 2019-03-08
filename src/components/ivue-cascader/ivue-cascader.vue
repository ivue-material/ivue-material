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
            /**
             * 菜单是否已获取焦点
             *
             * @type {Boolean}
             */
            menuFocus: false,
        }
    },
    mounted () {
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
                    readonly: 'readonly',
                    placeholder: this.currentlabels.length > 0 ? '' : '请选择',
                    value: this.selectValue
                },
                ref: 'input'
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
                },
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
                    'select': this.handlePick,
                    'focus': () => {
                        console.log('??')

                        return true
                    }
                },
                directives: [
                    {
                        name: 'show',
                        value: this.visibleMenu
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
                this.handleClick();
            }
            // 方向键 down
            else if (keyCode === 40) {
                // 展开菜单
                this.visibleMenu = true;

                // // 选择第一个菜单选项
                setTimeout(() => {
                    const firstMenu = this.$refs.menus.$el.querySelectorAll('.ivue-cascader-menu')[0];

                    console.log(document.activeElement)
                    // 判断获取焦点
                    // if (document.activeElement.getAttribute('tabindex') === '-1') {
                    //     return;
                    // }

                    firstMenu.querySelectorAll("[tabindex='-1']")[0].focus();
                })

                // 阻止 事件冒泡
                event.stopPropagation();
                // 阻止该元素默认的 keyup 事件
                event.preventDefault();
                return
            }
            console.log('??')

        },
        // 点击输入框
        handleClick () {
            // 输入框获取焦点
            this.$refs.input.$refs.input.focus()

            this.visibleMenu = !this.visibleMenu;
        },
        // 菜单点击的选择
        handlePick (value, close = true) {
            this.currentValue = value;

            if (close) {
                // 点击选择完后隐藏菜单
                this.visibleMenu = false;
            }
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
            on: {
                'keydown': this.handleKeydown
            },
            directives: [
                {
                    name: 'click-outside',
                    value: this.onClickOutside
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
