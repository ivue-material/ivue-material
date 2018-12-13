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
      computed: {
            // 设置参数
            routerProps () {
                  return this.$props
            }
      }
}
</script>
