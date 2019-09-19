<script>
import Mixin from './mixin.js';
import Colorable from '../../utils/mixins/colorable';
import { typeOf } from '../../utils/assist.js';
import renderHeader from './render-header';
import IvueCheckbox from '../ivue-checkbox/ivue-checkbox';

const prefixCls = 'ivue-table-header';

export default {
    name: prefixCls,
    mixins: [Mixin, Colorable],
    props: {
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
            default: () => {
                return {}
            }
        },
        /**
         * 头部颜色
         *
         * @type {Array}
         */
        headerColor: {
            type: Array,
            default: () => {
                return []
            }
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
         * table 样式
         *
         * @type {Object}
         */
        tableStyle: {
            type: Object,
            default: () => {
                return {}
            }
        },
        /**
         * 序列化数据
         *
         * @type {Array}
         */
        sequenceTableData: {
            type: Array,
            default: () => {
                return [];
            }
        },
        /**
         * 重写的数据
         *
         * @type {Array,Object}
         */
        rewriteTableData: {
            type: [Array, Object]
        }
    },
    data () {
        return {
            prefixCls: 'ivue-table'
        }
    },
    computed: {
        // 渲染头部
        headRows () {
            return [this.tableHeader];
        },
        // table style
        tableStyles () {
            const style = Object.assign({}, this.tableStyle);
            const width = parseInt(this.tableStyle.width);
            style.width = `${width}px`;

            return style;
        },
        // 是否选择全部
        isSelectAll () {
            let isSelectAll = true;
            const { sequenceTableData, rewriteTableData } = this;

            // 是否有数据
            if (!sequenceTableData.length) {
                isSelectAll = false;
            }

            // 是否禁用
            if (!sequenceTableData.find((item) => !item._disabled)) {
                isSelectAll = false;
            }

            // 是否有选中
            for (let i = 0; i < sequenceTableData.length; i++) {
                if (!rewriteTableData[sequenceTableData[i]._index]._isChecked && !rewriteTableData[sequenceTableData[i]._index]._isDisabled) {
                    isSelectAll = false;

                    break;
                }
            }

            return isSelectAll;
        }
    },
    methods: {
        // 渲染 colgroup
        genColgroup (h) {
            const scrollBarCol = h('col', {
                attrs: {
                    width: this.$parent.scrollBarWidth
                }
            });

            return h('colgroup', [
                this.tableHeader.map((header) => {
                    return h('col', {
                        attrs: {
                            width: this.setHeaderWidth(header)
                        }
                    })
                }),
                this.$parent.showVerticalScrollBar ? scrollBarCol : ''
            ]);
        },
        // 渲染 thead
        genThead (h) {
            const {
                cellClasses,
                headerColor,
                setBackgroundColor,
                setTextColor,
                headRows,
                scrollBarCellClass,
                alignClass,
                sequenceTableData,
                isSelectAll,
                handleSelectAll
            } = this;

            return h('thead', headRows.map((cols, rowIndex) => {
                const scrollBarTh = h('th', setBackgroundColor(headerColor[headerColor.length - 2] && headerColor[headerColor.length - 2].bg, {
                    attrs: {
                        rowspan: headRows.length
                    },
                    class: {
                        [`${prefixCls}--th`]: true,
                        ...scrollBarCellClass()
                    }
                }));

                // 渲染 tr
                return h('tr', [cols.map((column, index) => {
                    // 颜色下标
                    const colorIndex = index % headerColor.length;
                    const bg = headerColor[colorIndex] && headerColor[colorIndex].bg || '';
                    const color = headerColor[colorIndex] && headerColor[colorIndex].color || '';

                    // 正常显示
                    let base = h('span', setTextColor(color, {}), [column.title || '#']);

                    // render 显示头部
                    let tableRenderHeader;
                    if (column.renderHeader) {
                        tableRenderHeader = h(renderHeader, setTextColor(color, {
                            props: {
                                render: column.renderHeader,
                                column,
                                index
                            }
                        }));
                    }

                    // 是否开启了扩展
                    if (column.type === 'expand') {
                        base = h('span', setTextColor(color, {}), [column.title || '']);
                    }

                    // 是否开启多选
                    if (column.type === 'selection') {
                        base = h(IvueCheckbox, {
                            props: {
                                disabled: !sequenceTableData.length,
                                color: column.checkBoxColor,
                                value: isSelectAll
                            },
                            on: {
                                'on-change': handleSelectAll
                            }
                        })
                    }

                    // 是否有颜色
                    if (headerColor[colorIndex] && typeOf(headerColor[colorIndex]) !== 'object') {
                        console.error(`headerColor ${colorIndex} need one object`)
                    }

                    // 渲染 th
                    return h('th', setBackgroundColor(bg, {
                        class: {
                            [`${prefixCls}--th`]: true,
                            ...alignClass(column)
                        },
                        attrs: {
                            colSpan: column.colSpan,
                            rowspan: column.rowspan
                        }
                    }), [
                            h('div', {
                                class: cellClasses(column)
                            }, [
                                    column.renderHeader ? tableRenderHeader : base
                                ])
                        ]);
                }),
                this.$parent.showVerticalScrollBar && rowIndex === 0 ? scrollBarTh : ''
                ]);
            }))
        },

        // 列样式
        cellClasses (column) {
            return [
                `${prefixCls}--cell`,
                {
                    [`${prefixCls}--hidden`]: !this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right'),
                    [`${prefixCls}--selection`]: column.type === 'selection'
                }
            ]
        },
        // 滚动条样式
        scrollBarCellClass () {
            let hasRightFixed = false;
            for (let i in this.headRows) {
                for (let j in this.headRows[i]) {
                    if (this.headRows[i][j].fixed === 'right') {
                        hasRightFixed = true;
                        break;
                    }

                    if (hasRightFixed) {
                        break;
                    }
                }
            }

            return {
                [`${prefixCls}--hidden`]: hasRightFixed
            }
        },
        // 选择全部选项
        handleSelectAll () {
            const status = !this.isSelectAll;

            this.$parent.handleSelectAll(status);
        }
    },
    components: {
        renderHeader
    },
    render (h) {
        const {
            genColgroup,
            genThead,
            tableStyles
        } = this;

        return h('table', {
            style: tableStyles,
            attrs: {
                cellspacing: '0',
                cellpadding: '0',
                border: '0'
            }
        }, [
                genColgroup(h),
                genThead(h)
            ])
    }
}
</script>
