<template>
    <div :class="optionsClass" v-if="(pageSizeOpts.length > 0) || showElevator">
        <div :class="selectClass" v-if="pageSizeOpts.length > 0">
            <IvueSelect v-model="currentPageSize" @on-change="handleChange">
                <IvueOption v-for="item in pageSizeOpts" :key="item" :value="item">{{ item }} 条/页</IvueOption>
            </IvueSelect>
        </div>
        <!-- 电梯 -->
        <div :class="elevatorClass" v-if="showElevator">
            {{elevatorText.go}}
            <input
                type="text"
                :value="currentPage"
                autocomplete="off"
                spellcheck="false"
                @keyup.enter="handleChangePage"
            >
            {{elevatorText.page}}
        </div>
    </div>
</template>

<script>
import IvueSelect from '../ivue-select/ivue-select';
import IvueOption from '../ivue-select/ivue-option';

// 是否是纯数字
function isValueNumber (value) {
    return (/^[1-9][0-9]*$/).test(value + '');
}

const prefixCls = 'ivue-page-options';

export default {
    name: prefixCls,
    props: {
        /**
         * 是否显示电梯
         *
         * @type {Boolean}
         */
        showElevator: {
            type: Boolean
        },
        /**
         * 页数选项
         *
         * @type {Array}
         */
        pageSizeOpts: {
            type: Array
        },
        /**
         * 页数
         *
         * @type {Number}
         */
        pageSize: {
            type: Number
        },
        /**
         * 当前页数
         *
         * @type {Number}
         */
        currentPage: {
            type: Number
        },
        /**
         * 总页数
         *
         * @type {Number}
         */
        allPages: {
            type: Number
        },
        /**
         * 电梯文字
         *
         * @type {Object}
         */
        elevatorText: {
            type: Object
        }
    },
    data () {
        return {
            // 当前的页数
            currentPageSize: this.pageSize,
        }
    },
    computed: {
        optionsClass () {
            return [
                prefixCls
            ];
        },
        selectClass () {
            return [
                `${prefixCls}--select`
            ];
        },
        elevatorClass () {
            return [
                `${prefixCls}--elevator`
            ];
        }
    },
    methods: {
        // 选择页数
        handleChange () {
            this.$emit('on-select', this.currentPageSize);
        },
        // 改变页数
        handleChangePage (event) {
            let value = event.target.value.trim();
            let page = 0;

            // 是否是纯数字
            if (isValueNumber(value)) {
                value = Number(value);

                if (value != this.currentPage) {
                    const allPages = this.allPages;

                    if (value > allPages) {
                        page = allPages;
                    }
                    else {
                        page = value;
                    }
                }
            }
            else {
                page = 1;
            }

            if (page) {
                this.$emit('on-elevator', page);

                event.target.value = page
            }
        }
    },
    watch: {
        // 监听页数变化
        pageSize (pageSize) {
            this.currentPageSize = pageSize;
        }
    },
    components: {
        IvueSelect,
        IvueOption
    }
}
</script>
