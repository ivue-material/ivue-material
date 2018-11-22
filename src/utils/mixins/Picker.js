import  IVuePicker from '../../components/IVueDatePicker/IVuePicker';

export default {
      name: 'picker',
      methods: {
            genPickerTitle(){},
            genPicker(){
                  return this.$createElement(IVuePicker,{

                  },[
                        this.genPickerTitle()
                  ]);
            }
      }
}