<script>
const returnArrayFn = () => [];

export default {
      props: {
            options: {
                  type: Array,
                  default: returnArrayFn
            },
            slotOption: {
                  type: Array,
                  default: returnArrayFn
            },
            slotUpdateHook: {
                  type: Function,
                  default: () => { }
            }
      },
      functional: true,
      render (h, { props, parent }) {
            if (props.slotOption !== parent.$slots.default) {
                  props.slotUpdateHook();
            }

            return props.options;
      }
}
</script>

