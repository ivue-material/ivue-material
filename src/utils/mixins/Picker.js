import IvuePicker from '../../components/IvueDatePicker/IvuePicker';
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
            headerColor: String,
            /*
            * 选择框宽度
            * 
            * @type {Boolean}
            */
            width: {
                  type: [Number, String],
                  default: 290,
                  validator: value => parseInt(value, 10) > 0
            },
            /*
            * 强制100％宽度
            * 
            * @type {Boolean}
            */
            fullWidth: Boolean,
            /*
            * 隐藏日历头部
            * 
            * @type {Boolean}
            */
            noTitle: Boolean
      },
      methods: {
            genPickerTitle () { },
            genPickerBody () { },
            genPicker (staticClass) {
                  return this.$createElement(IvuePicker, {
                        staticClass,
                        class: this.fullWidth ? ['ivue-picker--fullWidth'] : [],
                        props: {
                              color: this.headerColor || this.color,
                              landscape: this.landscape,
                              width: this.width,
                              fullWidth: this.fullWidth
                        }
                  }, [
                              this.noTitle ? null : this.genPickerTitle(),
                              this.genPickerBody()
                        ]);
            }
      }
}