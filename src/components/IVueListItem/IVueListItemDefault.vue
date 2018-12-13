<template>
      <div class="ivue-list-item-default">
            <IVueListItemContent ivueDisabled>
                  <slot></slot>
            </IVueListItemContent>
      </div>
</template>

<script>
import IVueListItemMixin from './IVueListItemMixin';

export default {
      name: 'IVueListItemDefault',
      mixins: [IVueListItemMixin]
}
</script>
