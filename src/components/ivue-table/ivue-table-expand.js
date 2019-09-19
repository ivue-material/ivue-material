export default {
    name: 'ivue-table-expand',
    functional: true,
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
         * 渲染函数
         *
         * @type {Function}
         */
        render: {
            type: Function
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
        const params = {
            row: ctx.props.row,
            index: ctx.props.index
        };

        // 是否有列数据
        if (ctx.props.column) {
            params.column = ctx.props.column;
        }

        return ctx.props.render(h, params);
    }
}
