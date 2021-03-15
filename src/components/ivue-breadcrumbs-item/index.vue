<template>
    <span :class="prefixCls">
        <span :class="linkClasses" @click="handleClick"><slot></slot></span>
        <span
            :class="separatorClasses"
            v-html="data.separator"
            v-if="!data.showHtmlSeparator"
        ></span>
        <span :class="separatorClasses" v-else>
            <slot name="separator"></slot>
        </span>
    </span>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    reactive,
    inject,
    onMounted,
    getCurrentInstance
} from 'vue';

const prefixCls = 'ivue-breadcrumbs-item';

interface BreadcrumbInject {
    separator: string
}

interface BreadcrumbItemProps {
    to: string | Record<string, unknown>
    replace: boolean
}

export default defineComponent({
    name: prefixCls,
    props: {
        /**
         * 导航后不会留下历史记录
         *
         * @type {Boolean}
         */
        replace: {
            type: Boolean,
            default: false,
        },

        /**
         * 跳转路由
         *
         * @type {Object, String}
         */
        to: {
            type: [Object, String],
            default: '',
        },
    },
    setup(props: BreadcrumbItemProps, { slots }) {

        const instance = getCurrentInstance();
        const router = instance.appContext.config.globalProperties.$router;

        // inject
        const separator: BreadcrumbInject = inject('separator');

        // data
        const data = reactive<{
            showHtmlSeparator: boolean,
            separator: any,
        }>({
            /**
             * 是否显示v-html的 showSeparator
             *
             * @type {Boolean}
             */
            showHtmlSeparator: false,
            /**
             * 标志符号
             *
             * @type {String}
             */
            separator: separator,
        });

        // computed
        const linkClasses = computed(() => {
            return [
                `${prefixCls}-text`,
                {
                    [`${prefixCls}-link`]: props.to
                }
            ]
        });

        const separatorClasses = computed(() => {
            return `${prefixCls}-separator`;
        });

        // methods

        const handleClick = () => {
            if (!props.to || !router) {
                return;
            }

            props.replace ? router.replace(props.to) : router.push(props.to);
        }

        onMounted(() => {
            data.showHtmlSeparator = slots.separator !== undefined
        });

        return {
            prefixCls,
            data,

            linkClasses,
            separatorClasses,
            handleClick
        }
    }
})
</script>
