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
            landscape: Boolean,
            /*
            * 头部颜色
            * 
            * @type {String}
            */
            headerColor: String
      },
      methods: {
            genPickerTitle () { },
            genPickerBody () { },
            genPicker () {
                  return this.$createElement(IVuePicker, {
                        props:{
                              color: this.headerColor || this.color
                        }
                  }, [
                              this.genPickerTitle(),
                              this.genPickerBody()
                        ]);
            }
      }
}