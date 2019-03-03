<script>
import { generateId } from '../../utils/helpers';

const prefixCls = 'ivue-cascader-menu';

// 复制数组
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
        props: {},
    },
    data () {
        return {
            prefixCls: prefixCls,
            id: generateId()
        }
    },
    computed: {
        activeOptions () {
            const loadActiveOptions = () => {

            }

            copyArray(this.options, this.props)
            // const optionsCopy;

            // return loadActiveOptions;
        }
    },
    methods: {
        // 渲染菜单
        genMenus () {
            /**
             * renderList
             * Runtime helper for rendering v-for lists.
             *  val: any,
                keyOrIndex: string | number,
                index?: number
             */
            // return this._l(() => {
            console.log(this.activeOptions)
            // const menuId = `menu-${this.id}-${menuIndex}`;

            return this.$createElement('ul', {
                class: [
                    this.prefixCls
                ],
                attrs: {
                    id: this.id,
                    role: 'menu'
                },
            });
            // });

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
                this.genMenus()
            ]
        );

        return h('transition', {
            name: prefixCls,
        }, [wrapper]);
    }
}
</script>
