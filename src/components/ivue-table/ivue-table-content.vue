
<script>
import Mixin from './mixin.js';
import IvueTableTr from './ivue-table-tr';
import IvueTableCell from './ivue-table-cell';

const prefixCls = 'ivue-table';

export default {
    name: `${prefixCls}-content`,
    mixins: [Mixin],
    props: {
        /**
         * 表格数据
         *
         * @type {Array}
         */
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        /**
         * 表格样式
         *
         * @type {Object}
         */
        tableStyle: {
            type: Object,
            default: {}
        },
        /**
         * 表格头部标题
         *
         * @type {Array}
         */
        tableHeader: {
            type: Array,
            default: () => {
                return []
            }
        },
        /**
         * 每列宽度
         *
         * @type {Object}
         */
        columnsWidth: {
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
        },
        /**
         * 固定方向
         *
         * @type {Boolean, String}
         */
        fixed: {
            type: [Boolean, String],
            default: false
        }
    },
    methods: {
        // 渲染 colgroup
        genColgroup (h) {
            return h('colgroup', this.tableHeader.map((header) => {
                return h('col', {
                    attrs: {
                        width: this.setHeaderWidth(header)
                    }
                })
            }));
        },
        // 渲染 tbody
        genTbody (h) {
            return h('tbody', {
                class: `${prefixCls}-tbody`,
            }, this.data.map((row, index) => {
                // 渲染 tr
                return h(IvueTableTr, {
                    props: {
                        row,
                        rewriteTableData: this.rewriteTableData
                    },
                    nativeOn: {
                        'mouseenter': ($event) => {
                            $event.stopPropagation();

                            this.handleMouseIn(row._index)
                        },
                        'mouseleave': ($event) => {
                            $event.stopPropagation();

                            this.handleMouseOut(row._index)
                        },
                        'click': () => {
                            this.clickCurrentRow(row._index);
                        }
                    },
                    key: row._rowKey
                }, this.tableHeader.map((header) => {
                    // 渲染td
                    return h('td', {
                        class: this.tdClass(header, row)
                    }, [
                            // 渲染内容
                            h(IvueTableCell, {
                                props: {
                                    row,
                                    fixed: this.fixed,
                                    column: header,
                                    index: row._index,
                                    naturalIndex: index
                                },
                                key: header._columnKey
                            })
                        ])
                }));
            }));
        },
        // 鼠标进入
        handleMouseIn (_index) {
            this.$parent.handleMouseIn(_index);

        },
        // 鼠标离开
        handleMouseOut (_index) {
            this.$parent.handleMouseOut(_index);
        },
        // 点击当前行
        clickCurrentRow (_index) {
            this.$parent.clickCurrentRow(_index);
        },
        // td class
        tdClass (header, row) {
            // 单元格样式名称
            let cellClassName = '';

            // 设置某个单元格的样式
            if (row.cellClassName && header.key && row.cellClassName[header.key]) {
                cellClassName = row.cellClassName[header.key];
            }

            return [
                `${prefixCls}-td`,
                {
                    // 设置某个单元格的样式
                    [`${cellClassName}`]: cellClassName,
                    // 设置某列的样式
                    [`${header.className}`]: header.className
                }
            ]
        }
    },
    components: {
        IvueTableTr
    },
    render (h) {
        const {
            tableStyle,
            genColgroup,
            genTbody
        } = this;

        return h('table', {
            attrs: {
                cellspacing: '0',
                cellpadding: '0',
                border: '0'
            },
            style: tableStyle
        }, [
                genColgroup(h),
                genTbody(h)
            ]);
    }
}
</script>
