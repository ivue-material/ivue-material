import IvueListItemContent from './ivue-list-item-content';

import IvueRipple from '../../utils/mixins/ivue-ripple';

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