<template>
      <div class="ivue-list-item-default">
            <IvueListItemContent ivueDisabled>
                  <slot></slot>
            </IvueListItemContent>
      </div>
</template>

<script>
import IvueListItemMixin from './IvueListItemMixin';

export default {
      name: 'ivue-list-item-default',
      mixins: [IvueListItemMixin]
}
</script>
