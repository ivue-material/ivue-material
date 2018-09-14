import IVueRipple from '../../utils/mixins/IVueRipple';
import IVueListItemContent from './IVueListItemContent';


export default {
      mixins: [IVueRipple],
      props: {
            disabled: {
                  type: Boolean,
                  default: false
            }
      },
      computed: {
            isDisabled () {
                  return !this.ivueRipple || this.disabled
            }
      },
      components:{
            IVueListItemContent
      }
}