import IVuePicker from '../../components/IVueDatePicker/IVuePicker';
import Colorable from './Colorable'

export default {
      name: 'picker',
      mixins: [Colorable],
      props: {
            /*
            * 日历方向
            * 
            * @type {Boolean}
            */
            landscape: Boolean
      },
      methods: {
            genPickerTitle () { },
            genPickerBody () { },
            genPicker () {
                  return this.$createElement(IVuePicker, {

                  }, [
                              this.genPickerTitle(),
                              this.genPickerBody()
                        ]);
            }
      }
}