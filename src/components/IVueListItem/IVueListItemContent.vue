<template>
      <IVueRipple class="ivue-list-item-content" :ivueDisabled="ivueDisabled">
            <slot></slot>
      </IVueRipple>
</template>

<script>
import IVueRipple from '../IVueRipple/IVueRipple';

export default {
      name: 'IVueListItemContent',
      props: {
            ivueDisabled: {
                  type: Boolean,
                  default: false
            }
      },
      components: {
            IVueRipple
      }
}
</script>

<style>
</style>
