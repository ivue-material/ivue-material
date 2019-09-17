<script>
const prefixCls = 'ivue-table-tr';

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
        * 重写表格数据
        *
        * @type {Object}
        */
        rewriteTableData: {
            type: Object,
            default: {}
        }
    },
    computed: {
        trClass () {
            const { row, rewriteTableData } = this;

            return [
                prefixCls,
                this.rowClsName(row._index),
                {
                    [`${prefixCls}-hover`]: rewriteTableData[row._index] && rewriteTableData[row._index]._isHover
                }
            ]
        }
    },
    methods: {
        // 某行的样式
        rowClsName (_index) {
            return this.$parent.$parent._rowClassName(_index);
        }
    },
    render (h) {

        return h('tr', {
            class: this.trClass
        }, [
                this.$slots.default
            ]);
    }
}
</script>
