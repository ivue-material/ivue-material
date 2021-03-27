<template>
    <li :class="[`${prefixCls}-wrap`]">
        <!-- 标题 -->
        <div :class="[`${prefixCls}-title`]">{{ label }}</div>
        <!-- 选项 -->
        <ul>
            <li :class="[`${prefixCls}`]" ref="options">
                <slot></slot>
            </li>
        </ul>
    </li>
</template>

<script lang='ts'>
import {
    defineComponent,
    reactive,
    getCurrentInstance,
    computed,
    inject,
    toRefs
} from 'vue';

const prefixCls = 'ivue-select-group';

export default defineComponent({
    name: 'ivue-option-group',
    props: {
        /**
         * 选项grop标题
         *
         * @type {String}
         */
        label: {
            type: String,
            default: ''
        }
    },
    setup() {
        return {
            prefixCls
        }
    },
    // mounted() {
    //     this.$on('on-filter-query-change', () => {
    //         this.queryChange();
    //         return true;
    //     })
    // },
    // methods: {
    //     queryChange() {
    //         this.$nextTick(() => {
    //             const options = this.$refs.options.querySelectorAll('.ivue-select-item');
    //             let showOption = false;

    //             for (let i = 0; i < options.length; i++) {
    //                 if (options[i].style.display !== 'none') {
    //                     showOption = true;
    //                     break;
    //                 }
    //             }
    //             this.hidden = showOption;
    //         });
    //     }
    // }
})
</script>
