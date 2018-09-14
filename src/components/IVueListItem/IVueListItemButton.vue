<template>
      <button type="button" class="ivue-list-item-button"  :disabled="disabled">
             <IVueListItemContent :ivueDisabled="isDisabled">
                  <slot></slot>
            </IVueListItemContent> 
      </button>
</template>

<script>
import IVueListItemMixin from './IVueListItemMixin';

export default {
      name: 'IVueListItemButton',
      mixins: [IVueListItemMixin]
}
</script>

<style>
</style>
