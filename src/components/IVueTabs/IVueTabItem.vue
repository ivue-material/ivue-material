<script>
import Bootable from '../../utils/mixins/Bootable';
import { inject as RegistrableInject } from '../../utils/mixins/Registrable';
import Touch from '../../utils/directives/Touch';

export default {
      name: 'IVueTabItem',
      mixins: [
            Bootable,
            RegistrableInject('tabNavList', 'IVueTabItem', 'IVueTabsItems')
      ],
      directives: {
            Touch
      },
      props: {
            transition: {
                  type: [Boolean, String],
                  default: 'tab-transition'
            },
            reverseTransition: {
                  type: [Boolean, String],
                  default: 'tab-reverse-transition'
            }
      },
      data () {
            return {
                  // 是否激活
                  isActive: false,
                  reverse: false
            }
      },
      mounted () {
            // 更新tab导航
            this.tabNavList.register(this);
      },
      computed: {
            computedTransition () {
                  return this.reverse ? this.reverseTransition : this.transition;
            }
      },
      methods: {
            toggle (isActive, reverse, showTransition) {
                  this.isActive = isActive
                  this.reverse = reverse;
                  this.$el.style.transition = !showTransition ? 'none' : null;
            }
      },
      // 实例销毁之前调用
      beforeDestroy () {
            this.tabNavList.unregister(this);
      },
      render (h) {
            const div = h('div', {
                  staticClass: 'ivue-tabs-content',
                  directives: [{
                        name: 'show',
                        value: this.isActive
                  }],
                  on: this.$listeners
            }, this.showLazyContent(this.$slots.default));

            if (!this.computedTransition) {
                  return div;
            }

            return h('transition', {
                  props: { name: this.computedTransition }
            }, [div]);
      }
}
</script>
