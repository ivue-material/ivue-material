<script>
import { generateId, isDef } from '../../utils/helpers';
import IvueIcon from '../ivue-icon/ivue-icon';

const prefixCls = 'ivue-cascader-menu';

// 浅拷贝
const copyArray = (arr, props) => {
    if (!arr || !Array.isArray(arr) || !props) return arr;

    const configurableProps = ['__IS__FLAT__OPTIONS', 'label', 'value', 'disabled'];
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
        props: {}
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
            activeValue: ['zhinan']
        }
    },
    computed: {
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
                        // console.log(value)

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
                        loadActiveOptions(options.children, activeOptions);
                    }
                }
                console.log(activeOptions)

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
            const { activeOptions, activeValue } = this;
            /**
             * renderList
             * Runtime helper for rendering v-for lists.
             *  val: any,
                keyOrIndex: string | number,
                index?: number
             */
            const menus = this._l(activeOptions, (menu, menuIndex) => {
                // 循环选项
                const items = this._l(menu, (item) => {
                    return this.$createElement('li', {
                        class: [
                            {
                                [`${prefixCls}--item`]: true,
                                'is-active': item.value === activeValue[menuIndex],
                            },
                            this.extensibleClass(item)
                        ]
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
                        id: this.id,
                        role: 'menu'
                    },
                }, items);
            });

            console.log(menus)

            // const menuId = `menu-${this.id}-${menuIndex}`;

            return menus

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
                ...this.genMenus()
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
