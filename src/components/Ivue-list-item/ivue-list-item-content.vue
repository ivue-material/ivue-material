<template>
      <IvueRipple class="ivue-list-item-content" :ivueDisabled="ivueDisabled">
            <slot></slot>
      </IvueRipple>
</template>

<script>
import IvueRipple from '../ivue-ripple/ivue-ripple';

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
