<script>
import { generateId, isDef } from '../../utils/helpers';
import scrollIntoView from '../../utils/scroll-into-view';
import IvueIcon from '../ivue-icon/ivue-icon';

const prefixCls = 'ivue-cascader-menu';

// 浅拷贝
const copyArray = (arr, props) => {
    if (!arr || !Array.isArray(arr) || !props) return arr;

    const configurableProps = ['label', 'value', 'disabled'];
    const result = [];
    const childrenProp = props.children || 'children';


    arr.forEach((item) => {
        // 复制选项
        const itemCopy = {};

        // 循环props
        configurableProps.forEach((prop) => {
            // 名称
            let name = props[prop];
            // 值
            let value = item[name];

            if (value === undefined) {
                name = prop;
                value = item[name];
            }
            if (value !== undefined) itemCopy[name] = value;

        });

        // 递归遍历
        if (Array.isArray(item[childrenProp])) {
            itemCopy[childrenProp] = copyArray(item[childrenProp], props);
        }
        result.push(itemCopy);
    });

    return result;
};

export default {
    name: prefixCls,
    props: {
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
         * 配置项
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
         * 菜单现实隐藏
         *
         * @type {Boolean}
         */
        visible: {
            type: Boolean
        },
        /**
         * value
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
         * 选择触发类型
         *
         * @type {String}
         */
        trigger: {
            type: String,
            default: 'click'
        }
    },
    data () {
        return {
            prefixCls: prefixCls,
            id: generateId(),
            /**
             * 激活的选项
             *
             * @type {Array}
             */
            activeValue: [],
        }
    },
    computed: {
        // 获取激活的选项列表
        activeOptions () {
            // 数据的参数选项
            const configurableProps = ['label', 'value', 'children', 'disabled'];
            // 当前点击激活的选项
            const activeValue = this.activeValue;

            // 整理选项
            const formatOptions = (options) => {
                options.forEach((option) => {
                    if (option.__IS__FLAT__OPTIONS) return;
                    // 遍历4次
                    configurableProps.forEach((prop) => {
                        // 选项的值
                        const value = option[this.props[prop] || prop];

                        if (value !== undefined) {
                            option[prop] = value;
                        }
                    });

                    // 判断是否是数组，是的话递归调用
                    if (Array.isArray(option.children)) {
                        formatOptions(option.children);
                    }
                });
            }

            // 获取激活的选项
            const loadActiveOptions = (options, activeOptions = []) => {
                // 当前选项层级
                let level = activeOptions.length;
                activeOptions[level] = options;

                // 获取激活的value
                let active = activeValue[level];

                // 获取激活选项后的 children
                if (isDef(active)) {

                    options = options.filter((option) => option.value === active)[0];

                    // 判断是否有子节点
                    if (options && options.children) {
                        // 递归调用
                        loadActiveOptions(options.children, activeOptions);
                    }
                }

                return activeOptions;
            }

            // 浅拷贝
            const optionsCopy = copyArray(this.options, this.props);
            // 整理选项
            formatOptions(optionsCopy);

            // 获取激活的选项
            return loadActiveOptions(optionsCopy)
        }
    },
    methods: {
        // 选择选项
        select (item, menuIndex) {
            if (menuIndex) {
                this.activeValue.splice(menuIndex, this.activeValue.length - 1, item.value)
            }
            else {
                this.activeValue = [item.value];
            }

            this.$emit('select', this.activeValue.slice());
        },
        // 激活选项
        activeItem (item, menuIndex) {
            const length = this.activeOptions.length;
            // 设置激活的 value
            this.activeValue.splice(menuIndex, length, item.value);
            // 设置激活 value 的 children
            this.activeOptions.splice(menuIndex + 1, length, item.children);
        },
        // 当前选项是否可扩展
        extensibleClass (item) {
            if (item.children) {
                return {
                    [`${prefixCls}--item---extensible`]: true,
                }
            }
        },
        // 渲染菜单
        genMenus () {
            const { activeOptions, activeValue, trigger } = this;
            let itemId = null;
            let itemIndex = 0;

            /**
             * renderList
             * Runtime helper for rendering v-for lists.
             *  val: any,
                keyOrIndex: string | number,
                index?: number
             */
            const menus = this._l(activeOptions, (menu, menuIndex) => {
                const menuId = `menu-${this.id}-${menuIndex}`;

                // 循环选项
                const items = this._l(menu, (item, itemIndex) => {
                    const ownsId = `menu-item-${this.id}-${itemIndex + 1}`;
                    const events = {
                        on: {}
                    };

                    if (!item.disabled) {
                        // 注册键盘事件
                        events.on.keydown = (event) => {
                            const keyCode = event.keyCode;

                            if ([37, 38, 39, 40, 13, 9, 27].indexOf(keyCode) < 0) {
                                return;
                            }

                            // 当前节点
                            const currentEle = event.target;
                            // 父节点 ul
                            const parentEle = this.$refs.menus.childNodes[menuIndex];
                            // 菜单选项列表
                            const menuItemList = parentEle.querySelectorAll("[tabindex='-1']");
                            // 获取当前索引
                            const currentIndex = Array.prototype.indexOf.call(menuItemList, currentEle);

                            // 下一个index
                            let nextIndex;

                            if ([38, 40].indexOf(keyCode) > -1) {
                                if (keyCode === 38) {
                                    nextIndex = currentIndex !== 0 ? (currentIndex - 1) : currentIndex;
                                }
                                // 方向键 down
                                else if (keyCode === 40) {
                                    nextIndex = currentIndex !== (menuItemList.length - 1) ? currentIndex + 1 : currentIndex;
                                }

                                // 选项获取焦点
                                menuItemList[nextIndex].focus();
                            }
                        };

                        if (item.children) {
                            let triggerEvent = {
                                click: 'click',
                                hover: 'mouseenter'
                            }[trigger];

                            // 事件
                            const triggerHandler = () => {
                                if (this.visible) {
                                    this.activeItem(item, menuIndex);

                                    this.$nextTick(() => {
                                        this.scrollMenu(this.$refs.menus.childNodes[menuIndex]);
                                        this.scrollMenu(this.$refs.menus.childNodes[menuIndex + 1]);
                                    });
                                }
                            };

                            // 注册点击事件
                            events.on[triggerEvent] = triggerHandler;

                            // focus 选中
                            events.on['focus'] = () => {
                                triggerHandler();
                            };
                        }
                        else {
                            // 注册点击事件
                            events.on.click = () => {
                                this.select(item, menuIndex);

                                this.$nextTick(() => {
                                    this.scrollMenu(this.$refs.menus.childNodes[menuIndex])
                                });
                            };
                        }
                    }


                    return this.$createElement('li', {
                        attrs: {
                            role: 'menu-item',
                            tabindex: item.disabled ? null : -1,
                            id: ownsId
                        },
                        class: [
                            {
                                [`${prefixCls}--item`]: true,
                                // 是否激活
                                'is-active': item.value === activeValue[menuIndex],
                            },
                            // 判断是否有扩展图标
                            this.extensibleClass(item)
                        ],
                        ...events,
                        key: ownsId
                    }, [
                            this.$createElement('span', item.label),
                            item.children ? this.$createElement(IvueIcon, 'keyboard_arrow_right') : null
                        ]);
                });


                return this.$createElement('ul', {
                    class: [
                        this.prefixCls
                    ],
                    attrs: {
                        role: 'menu',
                        id: menuId
                    },
                    key: menuId,
                }, items);
            });

            return menus

        },
        // 滚动菜单视图
        scrollMenu (menu) {
            scrollIntoView(menu, menu.getElementsByClassName('is-active')[0]);
        },
    },
    watch: {
        // 监听菜单现实隐藏
        visible (value) {
            if (value) {
                this.activeValue = this.value;
            }
        },
        value: {
            immediate: true,
            handler (value) {
                // this.activeValue = value;
            }
        }
    },
    render (h) {
        const wrapper = h('div', {
            staticClass: `${prefixCls}s`,
            class: `${prefixCls}s-popper`,
            ref: 'wrapper'
        }, [
                h('div', {
                    class: 'popper-arrow'
                }),
                h('div', {
                    ref: 'menus',
                }, this.genMenus()),
            ]
        );

        return h('transition', {
            props: {
                name: prefixCls,
            }
        }, [wrapper]);
    }
}
</script>
