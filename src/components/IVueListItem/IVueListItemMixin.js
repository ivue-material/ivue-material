import IvueRipple from '../../utils/mixins/IvueRipple';
import IvueListItemContent from './IvueListItemContent';


export default {
      mixins: [IvueRipple],
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
            IvueListItemContent
      }
}