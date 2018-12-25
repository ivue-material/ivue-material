<script>
import Colorable from '../../utils/mixins/colorable';

export default {
      name: 'ivue-tabs-slider',
      mixins: [Colorable],
      render (h) {
            return h('div', this.setBackgroundColor(this.color, {
                  staticClass: 'ivue-tabs-slider'
            }));
      }
}
</script>

