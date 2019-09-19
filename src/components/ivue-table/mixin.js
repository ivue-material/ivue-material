export default {
    methods: {
        // 居中
        alignClass (column, row = {}) {
            return {
                [`${this.prefixCls}-column-${column.align}`]: column.align,
            }
        },
        // 设置头部宽度
        setHeaderWidth (column) {
            let width = '';

            // 是否有宽度
            if (column.width) {
                width = column.width;
            }
            else if (this.columnsWidth[column._index]) {
                width = this.columnsWidth[column._index].width;
            }

            if (width === '0') {
                width = ''
            }

            return width;
        }
    }
}
