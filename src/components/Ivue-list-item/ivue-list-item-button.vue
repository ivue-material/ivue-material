<template>
    <button type="button" class="ivue-list-item-button" :disabled="disabled">
        <IvueListItemContent :rippleDisabled="disabled">
            <slot></slot>
        </IvueListItemContent>
    </button>
</template>

<script>
import IvueListItemMixin from './ivue-list-item-mixin';

export default {
    name: 'ivue-list-item-button',
    mixins: [IvueListItemMixin]
}
</script>
