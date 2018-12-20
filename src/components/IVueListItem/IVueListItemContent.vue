<template>
      <IvueRipple class="ivue-list-item-content" :ivueDisabled="ivueDisabled">
            <slot></slot>
      </IvueRipple>
</template>

<script>
import IvueRipple from '../IvueRipple/IvueRipple';

export default {
      name: 'ivue-list-item-content',
      props: {
            ivueDisabled: {
                  type: Boolean,
                  default: false
            }
      },
      components: {
            IvueRipple
      }
}
</script>
