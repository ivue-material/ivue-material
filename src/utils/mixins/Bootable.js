export default {
      name: 'bootable',
      props: {
            lazy: Boolean
      },
      data () {
            return {
                  isBooted: false
            }
      },
      computed: {
            hasContent () {
                  return this.isBooted || !this.lazy || this.isActive;
            }
      },
      methods: {
            showLazyContent (content) {
                  return this.hasContent ? content : undefined;
            }
      },
      watch: {
            isActive () {
                  this.isBooted = true;
            }
      }
}