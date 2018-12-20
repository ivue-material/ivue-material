<template>
      <button type="button" class="ivue-list-item-button"  :disabled="disabled">
             <IvueListItemContent :ivueDisabled="isDisabled">
                  <slot></slot>
            </IvueListItemContent> 
      </button>
</template>

<script>
import IvueListItemMixin from './IvueListItemMixin';

export default {
      name: 'ivue-list-item-button',
      mixins: [IvueListItemMixin]
}
</script>

