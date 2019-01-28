import IvueDatePicker from '../../../src/components/ivue-date-picker/ivue-date-picker';
import { mount } from '@vue/test-utils';


describe('IvueDatePicker', function () {
      it('should change tableDate when touch is called', () => {
            const wrapper = mount(IvueDatePicker, {
                  propsData: {
                        value: '2017-05-02'
                  }
            })


            wrapper.vm.$refs.table.touch(-1);
            expect(wrapper.vm.inputMonth).to.be.equal(4);

      })
});