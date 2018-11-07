<script>
import Colorable from '../../utils/mixins/Colorable';

export default {
      name: 'IVueTabsSlider',
      mixins: [Colorable],
      render (h) {
            return h('div', this.setBackgroundColor(this.color, {
                  staticClass: 'ivue-tabs-slider'
            }));
      }
}
</script>

