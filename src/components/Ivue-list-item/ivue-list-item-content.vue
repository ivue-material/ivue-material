<template>
    <div class="ivue-list-item-content" v-ripple="!rippleDisabled">
        <slot></slot>
    </div>
</template>

<script>
import ripple from '../../utils/directives/ripple';

export default {
    name: 'ivue-list-item-content',
    directives: {
        ripple
    },
    props: {
        rippleDisabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>
