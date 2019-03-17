<template>
    <router-link class="ivue-list-item-router" v-bind="routerProps">
        <IvueListItemContent rippleDisabled>
            <slot></slot>
        </IvueListItemContent>
    </router-link>
</template>

<script>
import IvueListItemMixin from './ivue-list-item-mixin';

export default {
    name: 'ivue-list-item-router',
    mixins: [IvueListItemMixin],
    // router-link 参数
    props: {
        to: [String, Object],
        replace: Boolean,
        append: Boolean,
        tag: String,
        activeClass: String,
        exact: {
            type: Boolean,
            default: undefined
        },
        event: [String, Array],
        exactActiveClass: String,
        href: [String, Object],
        disabled: Boolean,
        nuxt: Boolean,
        target: String
    },
    computed: {
        // 设置参数
        routerProps () {
            return this.$props
        }
    }
}
</script>
