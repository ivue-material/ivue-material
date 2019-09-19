export default {
    name: 'ivue-table-slot',
    functional: true,
    inject: ['tableRoot'],
    props: {
        /**
         * 一行的数据
         *
         * @type {Object}
         */
        row: {
            type: Object
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
         * 一列的数据
         *
         * @type {Object}
         */
        column: {
            type: Object,
            default: null
        }
    },
    render (h, ctx) {
        // 获取 slot
        return h('div', ctx.injections.tableRoot.$scopedSlots[ctx.props.column.slot]({
            row: ctx.props.row,
            column: ctx.props.column,
            index: ctx.props.index
        }))
    },
}
