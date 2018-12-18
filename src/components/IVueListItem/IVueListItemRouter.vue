<template>
  <router-link class="ivue-list-item-router" v-bind="routerProps">
    <IVueListItemContent :ivueDisabled="isDisabled">
      <slot></slot>
    </IVueListItemContent>
  </router-link>
</template>

<script>
import IVueListItemMixin from './IVueListItemMixin';

export default {
  name: 'IVueListItemRouter',
  mixins: [IVueListItemMixin],
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
