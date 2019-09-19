
<script>
import Mixin from './mixin.js';
import IvueTableTr from './ivue-table-tr';
import IvueTableCell from './ivue-table-cell';
import IvueTableExpand from './ivue-table-expand';

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
    data () {
        return {
            prefixCls: 'ivue-table'
        }
    },
    computed: {
        // 扩展的渲染函数
        expandRender () {
            let render = function () {
                return '';
            }

            for (let i = 0; i < this.tableHeader.length; i++) {
                const column = this.tableHeader[i];
                if (column.type && column.type === 'expand') {
                    if (column.render) {
                        render = column.render;
                    }
                }

            }

            return render;
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
            const {
                rewriteTableData,
                handleMouseIn,
                handleMouseOut,
                clickCurrentRow,
                data,
                tableHeader,
                tdClass,
                fixed,
                alignClass,
                rowExpanded,
                expandRender,
                rowChecked,
                rowDisabled
            } = this;

            return h('tbody', {
                class: `${prefixCls}-tbody`,
            }, data.map((row, index) => {
                // 扩展
                const expanded = h('tr', {
                    class: {
                        [`${prefixCls}-expanded--hidden`]: fixed,
                        [`${prefixCls}-tr`]: true
                    }
                }, [
                        h('td', {
                            attrs: {
                                colspan: tableHeader.length
                            },
                            class: [
                                `${prefixCls}-expanded--cell`,
                                `${prefixCls}-td`
                            ]
                        }, [
                                h(IvueTableExpand, {
                                    props: {
                                        row,
                                        render: expandRender,
                                        index: row._index
                                    },
                                    key: row._rowKey
                                })
                            ])
                    ])


                // 渲染 tr
                return [h(IvueTableTr, {
                    props: {
                        row,
                        rewriteTableData
                    },
                    nativeOn: {
                        'mouseenter': ($event) => {
                            $event.stopPropagation();

                            handleMouseIn(row._index)
                        },
                        'mouseleave': ($event) => {
                            $event.stopPropagation();

                            handleMouseOut(row._index)
                        },
                        'click': () => {
                            clickCurrentRow(row._index);
                        }
                    },
                    key: row._rowKey
                }, tableHeader.map((header) => {
                    // 渲染td
                    return h('td', {
                        class: [
                            ...tdClass(header, row),
                            alignClass(header)
                        ]
                    }, [
                            // 渲染内容
                            h(IvueTableCell, {
                                props: {
                                    row,
                                    fixed,
                                    column: header,
                                    index: row._index,
                                    naturalIndex: index,
                                    expanded: rowExpanded(row._index),
                                    checked: rowChecked(row._index),
                                    disabled: rowDisabled(row._index)
                                },
                                key: header._columnKey
                            })
                        ])
                })),
                rowExpanded(row._index) ? expanded : ''
                ];
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
        },
        // 是否有扩展
        rowExpanded (_index) {
            return this.rewriteTableData[_index] && this.rewriteTableData[_index]._isExpanded;
        },
        // 是否有选中
        rowChecked (_index) {
            return this.rewriteTableData[_index] && this.rewriteTableData[_index]._isChecked;
        },
        // 是否禁用
        rowDisabled (_index) {
            return this.rewriteTableData[_index] && this.rewriteTableData[_index]._isDisabled;
        },
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
