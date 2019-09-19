export default {
    name: 'table-render-header',
    functional: true,
    props: {
        /**
         * 渲染函数
         *
         * @type {Function}
         */
        render: {
            type: Function
        },
        /**
         * 一列的数据
         *
         * @type {Object}
         */
        column: {
            type: Object
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
    render (h, ctx) {

        return ctx.props.render(h, {
            column: ctx.props.column,
            index: ctx.props.index
        })
    }

}
