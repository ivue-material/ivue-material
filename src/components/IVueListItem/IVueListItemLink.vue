<template>
      <a class="ivue-list-item-link" v-bind="$props">
            <IVueListItemContent :ivueDisabled="isDisabled">
                  <slot></slot>
            </IVueListItemContent>
      </a>
</template>

<script>
import IVueListItemMixin from './IVueListItemMixin';

export default {
      name: 'IVueListItemLink',
      mixins: [IVueListItemMixin],
      props: {
            download: {
                  type: String,
                  default: null
            },
            href: {
                  type: String,
                  default: null
            },
            hreflang: {
                  type: String,
                  default: null
            },
            ping: {
                  type: String,
                  default: null
            },
            rel: {
                  type: String,
                  default: null
            },
            target: {
                  type: String,
                  default: null
            },
            type: {
                  type: String,
                  default: null
            }
      }
}
</script>
