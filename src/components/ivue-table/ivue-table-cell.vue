
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
        }
    },
    computed: {
        classes () {
            return [
                prefixCls,
                {
                    [`${prefixCls}--hidden`]: this.column.fixed && (this.column.fixed === 'left' || this.column.fixed === 'right'),
                }
            ]
        }
    },
    render (h) {
        const {
            row,
            column,
            classes
        } = this;
        const base = h('span', row[column.key])

        return h('div', {
            class: classes
        }, [
                base
            ])
    }
}
</script>
