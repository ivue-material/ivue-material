
<script>
import IvueTableSlot from './ivue-table-slot';
import IvueIcon from '../ivue-icon/ivue-icon';
import IvueCheckBox from '../ivue-checkbox/ivue-checkbox';
import IvueTableExpand from './ivue-table-expand';

const prefixCls = 'ivue-table-cell';

export default {
    name: prefixCls,
    props: {
        /**
         * 一行的数据
         *
         * @type {Object}
         */
        row: {
            type: Object,
            default: {}
        },
        /**
         * 一列的数据
         *
         * @type {Object}
         */
        column: {
            type: Object,
            default: {}
        },
        /**
         * 下标
         *
         * @type {Number}
         */
        index: {
            type: Number
        },
        /**
         * 固定方向
         *
         * @type {Boolean, String}
         */
        fixed: {
            type: [Boolean, String],
            default: false
        },
        /**
         * 行的下标
         *
         * @type {Number}
         */
        naturalIndex: {
            type: Number
        },
        /**
         * 是否展开
         *
         * @type {Boolean}
         */
        expanded: {
            type: Boolean
        },
        /**
         * 是否选中
         *
         * @type {Boolean}
         */
        checked: {
            type: Boolean
        },
        /**
         * 是否禁用
         *
         * @type {Boolean}
         */
        disabled: {
            type: Boolean
        }
    },
    data () {
        return {
            /**
             * 渲染的类型
             *
             * @type {String}
             */
            renderType: 'normal'
        }
    },
    computed: {
        // 外层样式
        classes () {
            return [
                prefixCls,
                {
                    [`${prefixCls}--hidden`]: !this.fixed && this.column.fixed && (this.column.fixed === 'left' || this.column.fixed === 'right'),
                    [`${prefixCls}--expand`]: this.renderType === 'expand',
                    [`${prefixCls}--selection`]: this.renderType === 'selection'
                }
            ]
        },
        // 扩展样式
        expandClass () {
            return [
                `${prefixCls}--expand`,
                {
                    [`${prefixCls}--expandExpanded`]: this.expanded
                }
            ]
        }
    },
    methods: {
        // 切换扩展状态
        toggleExpand () {
            this.$parent.$parent.$parent.toggleExpand(this.index);
        },
        // 切换选中状态
        toggleSelect () {
            this.$parent.$parent.$parent.toggleSelect(this.index);
        }
    },
    render (h) {
        const {
            row,
            column,
            classes,
            naturalIndex,
            expandClass,
            toggleExpand,
            checked,
            toggleSelect,
            disabled
        } = this;

        let renderIndex;
        let renderSlot;
        let renderExpand;
        let renderChecked;
        let renderFunction;

        //  应该渲染的内容
        let rednerContent;

        // 正常渲染
        const renderBase = h('span', row[column.key]);

        // 是否显示行下标
        if (column.type === 'index') {
            this.renderType = 'index';

            renderIndex = h('span', column.indexMethod ? column.indexMethod(row) : naturalIndex + 1)
        }

        // 是否开启 slot
        if (column.slot) {
            this.renderType = 'slot';

            renderSlot = h(IvueTableSlot, {
                props: {
                    row,
                    column,
                    index: this.index
                }
            });
        }

        // 是否开启了扩展
        if (column.type === 'expand') {
            this.renderType = 'expand';

            renderExpand = h('div', {
                class: expandClass,
                on: {
                    click: toggleExpand
                }
            }, [
                    h(IvueIcon, 'chevron_right')
                ]);
        }

        // 是否开启了多选
        if (column.type === 'selection') {
            this.renderType = 'selection';

            renderChecked = h(IvueCheckBox, {
                props: {
                    color: row.checkBoxColor,
                    value: checked,
                    disabled: disabled,
                },
                on: {
                    'on-change': toggleSelect
                },
                nativeOn: {
                    click: (event) => {
                        event.stopPropagation();
                    }
                }
            });
        }

        if (this.renderType === 'normal') {
            rednerContent = renderBase
        }

        if (this.renderType === 'slot') {
            rednerContent = renderSlot;
        }

        if (this.renderType === 'index') {
            rednerContent = renderIndex;
        }

        if (this.renderType === 'expand') {
            rednerContent = renderExpand;
        }

        if (this.renderType === 'selection') {
            rednerContent = renderChecked;
        }

        // 是否使用了 render 函数
        if (column.render) {
            rednerContent = h(IvueTableExpand, {
                props: {
                    render: column.render,
                    row: row,
                    column,
                    index: this.index
                }
            });
        }

        return h('div', {
            class: classes
        }, [
                rednerContent
            ]);
    }
}
</script>
