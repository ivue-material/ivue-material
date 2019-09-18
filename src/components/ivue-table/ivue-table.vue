<script>
import { getRandomStr, getAllColumns, convertColumnOrder } from '../../utils/helpers.js';
import { deepCopy, getStyle, getScrollBarSize } from '../../utils/assist.js';
import { on, off } from '../../utils/dom.js';

import IvueTableHeader from './ivue-table-header';
import IvueTableContent from './ivue-table-content';

const prefixCls = 'ivue-table';

let columnKey = 1;
let rowKey = 1;

export default {
    name: prefixCls,
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
         * 表格数据
         *
         * @type {Array}
         */
        tableData: {
            type: Array,
            default: () => {
                return [];
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
                return [];
            }
        },
        /**
         * 是否显示边框
         *
         * @type {Boolean}
         */
        border: {
            type: Boolean
        },
        /**
         * 设置某一行的样式
         *
         * @type {Function}
         */
        rowClassName: {
            type: Function,
            default: () => {
                return ''
            }
        },
        /**
         * 表格高度
         *
         * @type {Number,String}
         */
        height: {
            type: [Number, String]
        },
        /**
         * 表格宽度
         *
         * @type {Number, String}
         */
        width: {
            type: [Number, String]
        },
        /**
         * 是否开启高亮行
         *
         * @type {Boolean}
         */
        highlightRow: {
            type: Boolean
        }
    },
    data () {
        return {
            /**
             * 表格头部数据
             *
             * @type {Array}
             */
            _tableHeader: [],
            /**
             * 每列的宽度
             *
             * @type {Object}
             */
            columnsWidth: {},
            /**
             * 表格宽度
             *
             * @type {Number}
             */
            tableWidth: 0,
            /**
             * 序列化数据
             *
             * @type {Array}
             */
            sequenceTableData: [],
            /**
             * 重写表格数据
             *
             * @type {Object}
             */
            rewriteTableData: this.makeRewriteTableData(),
            /**
             * 内容高度
             *
             * @type {Number}
             */
            contentHeight: 0,
            /**
             * 是否显示竖向滚动条
             *
             * @type {Boolean}
             */
            showVerticalScrollBar: false,
            /**
             * 是否显示横向滚动条
             *
             * @type {Boolean}
             */
            showHorizontalScrollBar: false,
            /**
             * 滚动条宽度
             *
             * @type {Object}
             */
            scrollBarWidth: getScrollBarSize(),
            /**
             * 左边固定的列
             *
             * @type {Array}
             */
            leftFixedColumns: [],
            /**
             * 右边固定的列
             *
             * @type {Array}
             */
            rightFixedColumns: [],
            /**
             * 头部宽度
             *
             * @type {Number}
             */
            headerWidth: 0,
            /**
             * 头部高度
             *
             * @type {Number}
             */
            headerHeight: 0
        }
    },
    mounted () {
        this.sequenceTableData = this.makeSequenceTableData();

        this.handleResize();

        on(window, 'resize', this.handleResize);
    },
    computed: {
        wrapperClass () {
            return [
                `${prefixCls}-wrapper`
            ]
        },
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-border`]: this.border,
                    [`${prefixCls}-with-fixed-top`]: !!this.height
                }
            ]
        },
        // 外层样式
        wrapperStyle () {
            let style = {};

            if (this.height) {
                const height = parseInt(this.height);
                style.height = `${height}px`;
            }

            if (this.width) {
                style.width = `${this.width}px`;
            }

            return style
        },
        // 表格样式
        tableStyle () {
            let style = {};

            if (this.tableWidth !== 0) {
                let width = 0;

                if (this.contentHeight === 0) {
                    width = this.tableWidth;
                }
                else {
                    width = this.tableWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0);
                }

                style.width = `${width}px`;
            }


            return style;
        },
        // 固定右侧样式
        fixedRightTableStyle () {
            let style = {};
            let width = 0;

            this.rightFixedColumns.forEach((col) => {
                if (col.fixed && col.fixed === 'right') {
                    width += col._width;
                }
            });

            style.width = `${width}px`;
            style.right = `${this.showVerticalScrollBar ? this.scrollBarWidth : 0}px`;

            return style;
        },
        // 内容样式
        contentStyle () {
            let style = {};

            const {
                contentHeight,
                showHorizontalScrollBar,
                scrollBarWidth
            } = this;

            if (contentHeight !== 0) {
                const height = contentHeight;

                style.height = `${height}px`;
            }

            return style;
        },
        // 内容样式
        fixedContentStyle () {
            let style = {};

            const {
                contentHeight,
                showHorizontalScrollBar,
                scrollBarWidth
            } = this;

            // 设置内容高度
            if (contentHeight !== 0) {
                const height = contentHeight - (showHorizontalScrollBar ? scrollBarWidth : 0);
                style.height = showHorizontalScrollBar ? `${height}px` : `${height - 1}px`;
            }

            return style;
        },
        // 固定头部样式
        fixedHeaderClass () {
            return [
                `${prefixCls}-fixed--header`,
            ];
        },
        // 固定内容样式
        fixedContentClass () {
            return [
                `${prefixCls}-fixed--content`,
            ];
        },
        // 固定的样式
        fixedTableStyle () {
            let style = {};
            let width = 0;

            this.leftFixedColumns.forEach((col) => {

                if (col.fixed && col.fixed === 'left') {
                    width += col._width;
                }
            });


            style.width = `${width}px`;

            return style;
        },
        // 右边滚动右上角
        fixedRightHeaderStyle () {
            let style = {};
            let width = 0;

            let height = this.headerHeight + 1;

            if (this.showVerticalScrollBar) {
                width = this.scrollBarWidth;
            }

            style.width = `${width}px`;
            style.height = `${height}px`;

            return style;
        },
        // 左侧固定
        isLeftFixed () {
            return this.tableHeader.some((header) => header.fixed && header.fixed === 'left');
        },
        // 右侧固定
        isRightFixed () {
            return this.tableHeader.some((header) => header.fixed && header.fixed === 'right');
        },
    },
    methods: {
        // 渲染头部
        genHeader (h) {
            const {
                _tableHeader,
                columnsWidth,
                headerColor,
                tableStyle,
                handleMouseWheel
            } = this;

            return h('div', {
                class: `${prefixCls}-header`,
                ref: 'header',
                on: {
                    mousewheel: handleMouseWheel
                }
            }, [
                    h(IvueTableHeader, {
                        props: {
                            columnsWidth,
                            headerColor,
                            tableHeader: _tableHeader,
                            tableStyle
                        }
                    })
                ]);
        },
        // 渲染内容
        genContent (h) {
            const {
                tableStyle,
                _tableHeader,
                columnsWidth,
                sequenceTableData,
                rewriteTableData,
                contentStyle,
                handleContentScroll
            } = this;

            return h('div', {
                style: contentStyle,
                class: `${prefixCls}-content--wrapper`,
                on: {
                    scroll: handleContentScroll
                },
                ref: 'contentWrapper',
            }, [
                    h(IvueTableContent, {
                        class: `${prefixCls}-content`,
                        ref: 'content',
                        props: {
                            tableStyle,
                            columnsWidth,
                            rewriteTableData,
                            tableHeader: _tableHeader,
                            data: sequenceTableData
                        }
                    })
                ]);

        },
        // 渲染左侧固定
        genLeftFixed (h) {
            const {
                fixedTableStyle,
                fixedContentStyle,
                fixedHeaderClass,
                fixedContentClass,
                columnsWidth,
                headerColor,
                leftFixedColumns,
                tableStyle,
                rewriteTableData,
                sequenceTableData,
                handleFixedMousewheel
            } = this;

            return h('div', {
                class: `${prefixCls}-fixed`,
                style: fixedTableStyle
            }, [
                    // 头部
                    h('div', {
                        class: fixedHeaderClass
                    }, [
                            h(IvueTableHeader, {
                                props: {
                                    fixed: 'left',
                                    columnsWidth,
                                    headerColor,
                                    tableHeader: leftFixedColumns,
                                    tableStyle: tableStyle
                                }
                            })
                        ]),
                    // 内容
                    h('div', {
                        class: fixedContentClass,
                        style: fixedContentStyle,
                        ref: 'fixedLeftBody',
                        on: {
                            mousewheel: handleFixedMousewheel
                        },
                        nativeOn: {
                            DOMMouseScroll: handleFixedMousewheel
                        }
                    }, [
                            h(IvueTableContent, {
                                props: {
                                    fixed: 'left',
                                    tableStyle: fixedTableStyle,
                                    columnsWidth,
                                    rewriteTableData,
                                    tableHeader: leftFixedColumns,
                                    data: sequenceTableData
                                }
                            })
                        ])
                ])
        },
        // 渲染右侧固定
        genRightFixed (h) {
            const {
                fixedRightTableStyle,
                fixedContentStyle,
                fixedTableStyle,
                fixedHeaderClass,
                fixedContentClass,
                columnsWidth,
                headerColor,
                rightFixedColumns,
                tableStyle,
                rewriteTableData,
                sequenceTableData,
                handleFixedMousewheel
            } = this;

            return h('div', {
                class: [
                    `${prefixCls}-fixed`,
                    `${prefixCls}-fixed--right`,
                ],
                style: fixedRightTableStyle
            }, [
                    // 头部
                    h('div', {
                        class: fixedHeaderClass
                    }, [
                            h(IvueTableHeader, {
                                props: {
                                    fixed: 'right',
                                    columnsWidth,
                                    headerColor,
                                    tableHeader: rightFixedColumns,
                                    tableStyle: fixedRightTableStyle
                                }
                            })
                        ]),
                    // 内容
                    h('div', {
                        class: fixedContentClass,
                        style: fixedContentStyle,
                        ref: 'fixedRightBody',
                        on: {
                            mousewheel: handleFixedMousewheel
                        },
                        // nativeOn: {
                        //     DOMMouseScroll: handleFixedMousewheel
                        // }
                    }, [
                            h(IvueTableContent, {
                                props: {
                                    fixed: 'right',
                                    tableStyle: fixedTableStyle,
                                    columnsWidth,
                                    rewriteTableData,
                                    tableHeader: rightFixedColumns,
                                    data: sequenceTableData
                                }
                            })
                        ])

                ])
        },
        // 右边滚动右上角
        genRightHeader (h) {
            return h('div', {
                class: `${prefixCls}-fixed--rightheader`,
                style: this.fixedRightHeaderStyle
            })
        },
        // 设置表头id
        setTableHeaderId (tableHeader) {
            return tableHeader.map((item) => {
                if ('children' in item) {
                    this.setTableHeaderId(item.children);
                }

                item.__id = getRandomStr(6);

                return item;
            })
        },
        // 设置表头
        setTableHeader (data) {
            let columns = deepCopy(getAllColumns(data));
            let left = [];
            let right = [];
            let center = [];

            columns.forEach((column, index) => {
                column._index = index;
                column._columnKey = columnKey;
                column._width = column.width ? column.width : '';
                // 需要过滤的数组
                column._filterChecked = [];

                // 固定的位置
                if (column.fixed && column.fixed === 'left') {
                    left.push(column);
                }
                else if (column.fixed && column.fixed === 'right') {
                    right.push(column);
                }
                else {
                    center.push(column);
                }
            });

            return left.concat(center).concat(right);
        },
        // 监听 size
        handleResize () {
            // 表单宽度
            let tableWidth = this.$el.offsetWidth - 1;
            // 每列宽度
            let columnsWidth = {};
            // 总和最小宽度
            let sumMinWidth = 0;
            // 有宽度的列
            let hasWidthColumns = [];
            // 没有宽度的列
            let noWidthColumns = [];

            // 初始化列表宽度
            this._tableHeader.forEach((col) => {
                if (col.width) {
                    hasWidthColumns.push(col);
                }
                else {
                    noWidthColumns.push(col);
                }

                col._width = null;
            });

            // 一列的宽度
            let columnWidth = 0;
            // 累加宽度
            let reduceWidth = hasWidthColumns.map(cell => cell.width).reduce((a, b) => a + b, 0);
            // 可以使用的宽度
            let usableWidth = tableWidth - reduceWidth - sumMinWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0);
            // 可以使用的长度
            let usableLength = noWidthColumns.length;

            // 平均分布表格的宽度
            if (usableWidth > 0 && usableLength > 0) {
                columnWidth = parseInt(usableWidth / usableLength);
            }

            for (let i = 0; i < this._tableHeader.length; i++) {
                // 一列
                const column = this._tableHeader[i];

                let width = columnWidth;

                if (column.width) {
                    width = column.width;
                }
                else {
                    if (column._width) {
                        width = column._width;
                    }
                    else {

                        if (usableWidth > 0) {
                            usableWidth -= width;
                            usableLength--;

                            if (usableLength > 0) {
                                columnWidth = parseInt(usableWidth / usableLength);
                            }
                            else {
                                columnWidth = 0
                            }
                        }
                        else {
                            columnWidth = 0;
                        }
                    }
                }

                column._width = width;

                // 为对应列设置宽度
                columnsWidth[column._index] = {
                    width: width
                };
            }


            // 表格宽度
            this.tableWidth = this._tableHeader.map((header) => header._width).reduce((a, b) => a + b, 0) + (this.showVerticalScrollBar ? this.scrollBarWidth : 0);
            // 每列的宽度
            this.columnsWidth = columnsWidth;
            // 固定头部
            this.fixedHeader();

            // 左边固定的列
            this.leftFixedColumns = convertColumnOrder(this._tableHeader, 'left');
            // 右边固定的列
            this.rightFixedColumns = convertColumnOrder(this._tableHeader, 'right');
        },
        // 过滤数据
        filterData (data, column) {
            return data.filter((row) => {
                let status = !column._filterChecked.length;

                for (let i = 0; i < column._filterChecked.length; i++) {
                    status = column.filterMethod(column._filterChecked[i], row);
                    if (status) {
                        break;
                    }
                }

                return status;
            });
        },
        // 深拷贝数据
        makeData () {
            let data = deepCopy(this.tableData);
            data.forEach((row, index) => {
                row._index = index;
                // 行数
                row._rowKey = rowKey++
            });

            return data;
        },
        // 使数据排序
        makeDataWithSort () {
            let data = this.makeData();
            let sortType = 'normal';
            let sortIndex = -1;

            return data;
        },
        // 序列化数据
        makeSequenceTableData () {
            let data = this.makeDataWithSort();

            this._tableHeader.forEach((header) => {
                return data = this.filterData(data, header)
            });

            return data;
        },
        // 重写表格数据
        makeRewriteTableData () {
            let data = {};

            this.tableData.forEach((row, index) => {
                const newRow = deepCopy(row);

                // 鼠标悬浮
                newRow._isHover = false;

                // 高亮行
                newRow._isHighlight = false;

                data[index] = newRow;
            });

            return data;
        },
        // 鼠标进入
        handleMouseIn (_index) {
            this.rewriteTableData[_index]._isHover = true;
        },
        // 鼠标离开
        handleMouseOut (_index) {
            this.rewriteTableData[_index]._isHover = false;
        },
        // 点击当前行
        clickCurrentRow (_index) {
            this.highlightCurrentRow(_index);
        },
        // 清除当前行
        clearCurrentRow () {
            if (!this.highlightRow) {
                return;
            }
    
            this.handleCurrentRow('clear');
        },
        // 某行的样式
        _rowClassName (index) {
            return this.rowClassName(this.tableData[index], index);
        },
        // 高亮当前行
        highlightCurrentRow (_index) {
            // 是否开启高亮行
            if (!this.highlightRow || this.rewriteTableData[_index]._isHighlight) {
                return;
            }

            this.handleCurrentRow('highlight', _index);
        },
        // 处理当前行
        handleCurrentRow (type, _index) {
            let oldIndex = -1;

            for (let i in this.rewriteTableData) {
                if (this.rewriteTableData[i]._isHighlight) {
                    oldIndex = parseInt(i);

                    // 初始化高亮
                    this.rewriteTableData[i]._isHighlight = false;
                }
            }

            // 是否高亮
            if (type === 'highlight') {
                this.rewriteTableData[_index]._isHighlight = true;
            }
        },
        // 固定头部
        fixedHeader () {
            if (this.height) {
                this.$nextTick(() => {
                    const headerHeight = parseInt(getStyle(this.$refs.header, 'height')) || 0;

                    this.contentHeight = this.height - headerHeight;

                    // 固定内容
                    this.$nextTick(() => {
                        this.fixedContent();
                    })
                });
            }
        },
        // 固定内容
        fixedContent () {
            if (this.$refs.header) {
                this.headerWidth = this.$refs.header.children[0].offsetWidth;
                this.headerHeight = this.$refs.header.children[0].offsetHeight;
            }

            if (!this.$refs.content || !this.tableData || this.tableData.length === 0) {
                this.showVerticalScrollBar = false;
            }
            else {
                // 内容元素
                let contentEl = this.$refs.content.$el;
                // 内容外层元素
                let contentWrapperEl = contentEl.parentElement;

                // 内容高度
                let contentHeight = contentEl.offsetHeight;
                // 内容宽度
                let contentWidth = contentEl.offsetWidth;

                // 内容外层高度
                let contentWrapperHeight = contentWrapperEl.offsetHeight;
                // 内容外层宽度
                let contentWrapperWidth = contentWrapperEl.offsetWidth;

                // 是否开启横向滚动
                this.showHorizontalScrollBar = contentWrapperWidth < contentWidth + (this.showVerticalScrollBar ? this.scrollBarWidth : 0);
                // 是否开启竖向滚动
                this.showVerticalScrollBar = this.contentHeight ? contentWrapperHeight - (this.showHorizontalScrollBar ? this.scrollBarWidth : 0) < contentHeight : false;

                // 是否开启竖向滚动
                if (this.showVerticalScrollBar) {
                    contentWrapperEl.classList.add(`${prefixCls}-overflowY`);
                } else {
                    contentWrapperEl.classList.remove(`${prefixCls}-overflowY`);
                }

            }
        },
        // 内容滚动
        handleContentScroll (event) {
            if (this.isLeftFixed) {
                this.$refs.fixedLeftBody.scrollTop = event.target.scrollTop;
            }

            if (this.isRightFixed) {
                this.$refs.fixedRightBody.scrollTop = event.target.scrollTop;
            }

            this.$refs.header.scrollLeft = event.target.scrollLeft;

        },
        // 鼠标滚动
        handleFixedMousewheel (event) {
            let deltaY = event.deltaY;

            // 是否是Y轴滚动
            if (!deltaY && event.detail) {
                deltaY = event.detail * 48;
            }

            // 向上滚动
            if (!deltaY && event.wheelDeltaY) {
                deltaY = -event.wheelDeltaY
            }

            if (!deltaY && event.wheelDelta) {
                deltaY = -event.wheelDelta;
            }


            if (!deltaY) {
                return;
            }

            const content = this.$refs.contentWrapper;
            // 当前滚动到顶部的位置
            const currentScrollTop = content.scrollTop;

            // 向下滚动
            if (deltaY < 0 && currentScrollTop !== 0) {
                event.preventDefault();
            }

            // 向上滚动
            if (deltaY > 0 && content.scrollHeight - content.clientHeight > currentScrollTop) {
                event.preventDefault();
            }

            // content.scrollTop += deltaY;
            let step = 0;

            let timeId;
            timeId = setInterval(() => {
                step += 5;
                if (deltaY > 0) {
                    content.scrollTop += 2;
                }
                else {
                    content.scrollTop -= 2;
                }

                if (step >= Math.abs(deltaY)) {
                    clearInterval(timeId);
                }
            }, 5);
        },
        // 横向滚动
        handleMouseWheel (event) {
            const deltaX = event.deltaX;
            const content = this.$refs.contentWrapper;

            if (deltaX > 0) {
                content.scrollLeft = content.scrollLeft + 10;
            }
            else {
                content.scrollLeft = content.scrollLeft - 10;
            }

        }
    },
    beforeDestroy () {
        off(window, 'resize', this.handleResize);
    },
    components: {
        IvueTableHeader,
        IvueTableContent
    },
    watch: {
        // 监听是否开启横向滚动
        showHorizontalScrollBar () {
            this.handleResize();
        },
        // 监听是否开启竖向滚动
        showVerticalScrollBar () {
            this.handleResize();
        }
    },
    render (h) {
        const {
            wrapperClass,
            wrapperStyle,
            classes,
            isLeftFixed,
            isRightFixed,
            genHeader,
            genContent,
            genLeftFixed,
            genRightFixed,
            genRightHeader
        } = this;


        const colsWithId = this.setTableHeaderId(this.tableHeader);
        this._tableHeader = this.setTableHeader(colsWithId);

        return h('div', {
            class: wrapperClass,
            style: wrapperStyle
        }, [
                h('div', {
                    class: classes
                }, [
                        genHeader(h),
                        genContent(h),
                        isLeftFixed ? genLeftFixed(h) : '',
                        isRightFixed ? genRightFixed(h) : '',
                        isRightFixed ? genRightHeader(h) : ''
                    ])
            ]);
    }
}
</script>
