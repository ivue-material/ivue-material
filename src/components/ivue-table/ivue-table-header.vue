<script>
import Mixin from './mixin.js';
import Colorable from '../../utils/mixins/colorable';
import { typeOf } from '../../utils/assist.js';

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
        }
    },
    computed: {
        // 渲染头部
        headRows () {
            return [this.tableHeader]
        },
        // table style
        tableStyles () {
            const style = Object.assign({}, this.tableStyle);
            const width = parseInt(this.tableStyle.width);
            style.width = `${width}px`;

            return style;
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
                headRows
            } = this;

            return h('thead', headRows.map((cols, rowIndex) => {
                const scrollBarTh = h('th', setBackgroundColor(headerColor[headerColor.length - 2] && headerColor[headerColor.length - 2].bg, {
                    attrs: {
                        rowspan: headRows.length
                    }
                }));

                // 渲染 tr
                return h('tr', [cols.map((column, index) => {
                    // 颜色下标
                    const colorIndex = index % headerColor.length;
                    const bg = headerColor[colorIndex] && headerColor[colorIndex].bg || '';
                    const color = headerColor[colorIndex] && headerColor[colorIndex].color || '';

                    // 正常显示
                    const base = h('span', setTextColor(color, {}), [column.title || '#']);

                    if (headerColor[colorIndex] && typeOf(headerColor[colorIndex]) !== 'object') {
                        console.error(`headerColor ${colorIndex} need one object`)
                    }

                    // 渲染 th
                    return h('th', setBackgroundColor(bg, {
                        class: {
                            [`${prefixCls}--th`]: true
                        },
                        attrs: {
                            colSpan: column.colSpan,
                            rowspan: column.rowspan
                        }
                    }), [
                            h('div', {
                                class: cellClasses(column)
                            }, [base])
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
                }
            ]
        }
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
