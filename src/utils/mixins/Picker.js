import IVuePicker from '../../components/IVueDatePicker/IVuePicker';

export default {
      name: 'picker',
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
            genPickerBody () {},
            genPicker () {
                  return this.$createElement(IVuePicker, {

                  }, [
                              this.genPickerTitle(),
                              this.genPickerBody()
                        ]);
            }
      }
}