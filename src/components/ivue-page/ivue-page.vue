<script>
const prefixCls = 'ivue-page';
import Colorable from '../../utils/mixins/colorable';
import IvueIcon from '../ivue-icon/ivue-icon';
import IvueOptions from './ivue-options';

export default {
    name: prefixCls,
    mixins: [Colorable],
    props: {
        /**
         * 圆形
         *
         * @type {Boolean}
         */
        circle: {
            type: Boolean,
            default: false
        },
        /**
         * 数据总数
         *
         * @type {Number}
         */
        total: {
            type: Number,
            default: 0
        },
        /**
         * 每页条数
         *
         * @type {Number}
         */
        pageSize: {
            type: Number,
            default: 1
        },
        /**
         * v-model
         *
         * @type {Number}
         */
        value: {
            type: Number,
            default: 1
        },
        /**
        * 背景颜色列表
        *
        * @type {Array}
        */
        bgList: {
            type: Array,
            default: () => {
                return []
            }
        },
        /**
         * 字体颜色列表
         *
         * @type {Array}
         */
        colorList: {
            type: Array,
            default: () => {
                return []
            }
        },
        /**
         * 上一页图标
         *
         * @type {String}
         */
        prevIcon: {
            type: String,
            default: 'keyboard_arrow_left'
        },
        /**
         * 下一页图标
         *
         * @type {String}
         */
        nextIcon: {
            type: String,
            default: 'keyboard_arrow_right'
        },
        /**
         * 页数选择选项
         *
         * @type {Array}
         */
        pageSizeOpts: {
            type: Array,
            default: () => {
                return []
            }
        },
        /**
         * 电梯文字
         *
         * @type {Object}
         */
        elevatorText: {
            type: Object,
            default: () => {
                return {
                    go: '跳至',
                    page: '页'
                }
            }
        },
        /**
         * 是否显示电梯
         *
         * @type {Boolean}
         */
        showElevator: {
            type: Boolean
        }
    },
    data () {
        return {
            // 当前页数
            currentPage: this.value,
            // 当前每页条数
            currentPageSize: this.pageSize
        }
    },
    computed: {
        // 外层样式
        wrapperClass () {
            return [
                prefixCls
            ]
        },
        // 选项样式
        itemClass () {
            return {
                [`${prefixCls}-item`]: true,
                [`${prefixCls}-item--circle`]: this.circle
            }
        },
        // 所有的页数
        allPages () {
            const allPage = Math.ceil(this.total / this.currentPageSize);

            return (allPage === 0) ? 1 : allPage;
        },
        // 上一页
        prevClass () {
            return [
                `${prefixCls}-prev`,
                {
                    [`${prefixCls}-disabled`]: this.currentPage === 1
                }
            ]
        },
        // 下一页
        nextClass () {
            return [
                `${prefixCls}-next`,
                {
                    [`${prefixCls}-disabled`]: this.currentPage === this.allPages
                }
            ]
        },
        // 修改v-model
        inputValue: {
            get () {
                return this.currentPage
            },
            set (val) {
                this.currentPage = val;

                this.$emit('input', val);
            }
        }
    },
    methods: {
        // 渲染翻页按钮
        genPrevBtn (h, icon) {
            return h('li', {
                class: [
                    this.itemClass,
                    ...this.prevClass
                ],
                on: {
                    click: this.handlePrev
                }
            }, [
                    h(IvueIcon, icon)
                ]);
        },
        // 渲染翻页按钮
        genNextBtn (h, icon) {
            return h('li', {
                class: [
                    this.itemClass,
                    ...this.nextClass
                ],
                on: {
                    click: this.handleNext
                }
            }, [
                    h(IvueIcon, icon)
                ]);
        },
        // 渲染选项
        genItems (h) {
            const {
                itemClass,
                allPages,
                currentPage,
                currentPageSize,
                total,
                handleChangePage,
                setRenderRange,
                handleFastNext
            } = this;

            let _currentPage = currentPage;
            let range = [];

            // 第一个
            const startItem = {
                tag: 'li',
                data: {
                    attrs: {
                        page: 1
                    },
                    class: {
                        ...itemClass,
                        [`${prefixCls}-item--active`]: currentPage === 1
                    },
                    on: {
                        click: () => {
                            handleChangePage(1)
                        }
                    }
                },
                content: 1
            };

            // 缩略符号
            const abbreviationPrev = {
                tag: 'li',
                data: {
                    class: {
                        ...itemClass,
                        [`${prefixCls}-item--abbreviation`]: true
                    },
                    on: {
                        click: this.handleFastPrev
                    }
                },
                content: [
                    h(IvueIcon, 'chevron_left'),
                    h(IvueIcon, 'chevron_left')
                ]
            };

            const abbreviationNext = {
                tag: 'li',
                data: {
                    class: {
                        ...itemClass,
                        [`${prefixCls}-item--abbreviation`]: true
                    },
                    on: {
                        click: this.handleFastNext
                    }
                },
                content: [
                    h(IvueIcon, 'chevron_right'),
                    h(IvueIcon, 'chevron_right')
                ]
            };

            range.push(startItem);


            // 7
            if (currentPage === 5) {
                range.push({
                    tag: 'li',
                    data: {
                        attrs: {
                            page: currentPage - 3
                        },
                        class: itemClass,
                        on: {
                            click: () => {
                                handleChangePage(currentPage - 3)
                            }
                        }
                    },
                    content: currentPage - 3
                });
            }

            // 8
            if (currentPage - 2 > 1) {
                range.push({
                    tag: 'li',
                    data: {
                        attrs: {
                            page: currentPage - 2
                        },
                        class: itemClass,
                        on: {
                            click: () => {
                                handleChangePage(currentPage - 2)
                            }
                        }
                    },
                    content: currentPage - 2
                });
            }

            // 9
            if (currentPage - 1 > 1) {
                range.push({
                    tag: 'li',
                    data: {
                        attrs: {
                            page: currentPage - 1
                        },
                        class: itemClass,
                        on: {
                            click: () => {
                                handleChangePage(currentPage - 1)
                            }
                        }
                    },
                    content: currentPage - 1
                });
            }

            // 激活的页数
            if (currentPage != 1 && currentPage != allPages) {
                range.push({
                    tag: 'li',
                    data: {
                        attrs: {
                            page: currentPage
                        },
                        class: {
                            ...itemClass,
                            [`${prefixCls}-item--active`]: true
                        }
                    },
                    content: currentPage
                });
            }

            // 2
            if (currentPage + 1 < allPages) {
                range.push({
                    tag: 'li',
                    data: {
                        attrs: {
                            page: currentPage + 1
                        },
                        class: {
                            ...itemClass
                        },
                        on: {
                            click: () => {
                                handleChangePage(currentPage + 1)
                            }
                        }
                    },
                    content: currentPage + 1
                });
            }

            // 3
            if (currentPage + 2 < allPages) {
                range.push({
                    tag: 'li',
                    data: {
                        attrs: {
                            page: currentPage + 2
                        },
                        class: itemClass,
                        on: {
                            click: () => {
                                handleChangePage(currentPage + 2)
                            }
                        }
                    },
                    content: currentPage + 2
                });
            }

            // 4
            if (allPages - currentPage === 4) {
                range.push({
                    tag: 'li',
                    data: {
                        attrs: {
                            page: currentPage + 3
                        },
                        class: itemClass,
                        on: {
                            click: () => {
                                handleChangePage(currentPage + 3)
                            }
                        }
                    },
                    content: currentPage + 3
                });
            }

            // 最后一个
            const endItem = {
                tag: 'li',
                data: {
                    attrs: {
                        page: allPages
                    },
                    class: {
                        ...itemClass,
                        [`${prefixCls}-item--active`]: currentPage === allPages
                    },
                    on: {
                        click: () => {
                            handleChangePage(allPages)
                        }
                    }
                },
                content: allPages
            };

            if (allPages > 1) {
                range.push(endItem);
            }

            return [
                ...setRenderRange(h, range, abbreviationPrev, abbreviationNext, currentPage, allPages)
            ]
        },
        // 改变页数
        handleChangePage (page) {
            if (this.currentPage != page) {
                this.currentPage = page;

                this.$emit('on-change', page);

                // 修改 v-modul
                this.inputValue = page
            }

        },
        // 设置渲染内容
        setRenderRange (h, range, abbreviationPrev, abbreviationNext, currentPage, allPages) {
            let ret = [];

            range.forEach((key, index) => {
                const bgListIndex = key.content % this.bgList.length;
                const colorListIndex = key.content % this.colorList.length;

                ret.push(h(key.tag, this.setTextColor(this.bgList[bgListIndex], key.data), [h('span', this.setTextColor(this.colorList[colorListIndex], {
                    class: `${prefixCls}-item--text`
                }), key.content)]));
            });

            // 缩略号
            if (currentPage > 5) {
                ret.splice(1, 0, h(abbreviationPrev.tag, abbreviationPrev.data, abbreviationPrev.content));
            }

            // 缩略号
            if (allPages - currentPage >= 5) {
                ret.splice(-1, 0, h(abbreviationNext.tag, abbreviationNext.data, abbreviationNext.content));
            }

            return ret;
        },
        // 上一页
        handlePrev () {
            const current = this.currentPage;
            if (current <= 1) {
                return false;
            }

            this.handleChangePage(current - 1)
        },
        // 下一页
        handleNext () {
            const current = this.currentPage;
            if (current >= this.allPages) {
                return false;
            }

            this.handleChangePage(current + 1)
        },
        // 快速前进
        handleFastNext () {
            const page = this.currentPage + 5;

            if (page > this.allPages) {
                this.handleChangePage(this.allPages);
            }
            else {
                this.handleChangePage(page)
            }
        },
        // 快速前进
        handleFastPrev () {
            const page = this.currentPage - 5;

            if (page > 0) {
                this.handleChangePage(page);
            }
            else {
                this.handleChangePage(1)
            }
        },
        // 选择页数
        handleSelectPage (pageSize) {
            this.currentPageSize = pageSize;

            this.$emit('on-change-page-size', pageSize);

            this.handleChangePage(1);
        },
        // 电梯页数
        handleElevatorPage (page) {
            this.handleChangePage(page);
        }
    },
    watch: {
        // 监听总页数变化
        total (total) {
            let maxPage = Math.ceil(total / this.currentPageSize);

            if (maxPage < this.currentPage) {
                this.currentPage = (maxPage === 0 ? 1 : maxPage);
            }
        },
        // 监听值变化
        value (value) {
            this.currentPage = value;
        },
        // 监听页数
        pageSize (val) {
            this.currentPageSize = val;
        }
    },
    components: {
        IvueIcon,
        IvueOptions
    },
    render (h) {
        const {
            wrapperClass,
            genItems,
            genNextBtn,
            genPrevBtn,
            prevIcon,
            nextIcon,
            pageSizeOpts,
            currentPageSize,
            handleSelectPage,
            currentPage,
            allPages,
            elevatorText,
            showElevator,
            handleElevatorPage
        } = this;

        return h('ul', {
            class: wrapperClass
        }, [
                genPrevBtn(h, prevIcon),
                genItems(h),
                genNextBtn(h, nextIcon),
                h(IvueOptions, {
                    props: {
                        pageSizeOpts,
                        currentPage,
                        allPages,
                        elevatorText,
                        showElevator,
                        pageSize: currentPageSize
                    },
                    on: {
                        ['on-select']: handleSelectPage,
                        ['on-elevator']: handleElevatorPage
                    }
                })
            ]);
    }
}
</script>
