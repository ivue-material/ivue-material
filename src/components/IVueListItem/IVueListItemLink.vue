<template>
      <a class="ivue-list-item-link" v-bind="$props">
            <IvueListItemContent :ivueDisabled="isDisabled">
                  <slot></slot>
            </IvueListItemContent>
      </a>
</template>

<script>
import IvueListItemMixin from './IvueListItemMixin';

export default {
      name: 'ivue-list-item-link',
      mixins: [IvueListItemMixin],
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
