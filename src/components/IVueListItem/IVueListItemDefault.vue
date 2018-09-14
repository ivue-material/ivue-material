<template>
      <div class="ivue-list-item-default">
            <IVueListItemContent>
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

<style>

</style>
