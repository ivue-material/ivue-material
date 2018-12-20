<template>
  <router-link class="ivue-list-item-router" v-bind="routerProps">
    <IvueListItemContent :ivueDisabled="isDisabled">
      <slot></slot>
    </IvueListItemContent>
  </router-link>
</template>

<script>
import IvueListItemMixin from './IvueListItemMixin';

export default {
  name: 'ivue-list-item-router',
  mixins: [IvueListItemMixin],
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
