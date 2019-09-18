
<script>
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
        }
    },
    computed: {
        classes () {
            return [
                prefixCls,
                {
                    [`${prefixCls}--hidden`]: !this.fixed && this.column.fixed && (this.column.fixed === 'left' || this.column.fixed === 'right'),
                }
            ]
        }
    },
    render (h) {
        const {
            row,
            column,
            classes,
            naturalIndex
        } = this;
        const base = h('span', row[column.key]);
        let index;

        // 是否显示行下标
        if (column.type === 'index') {
            index = h('span', column.indexMethod ? column.indexMethod(row) : naturalIndex + 1)
        }


        return h('div', {
            class: classes
        }, [
                base,
                index
            ])
    }
}
</script>
