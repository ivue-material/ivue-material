import IvueDatePickerYears from '../../../src/components/ivue-date-picker/ivue-date-picker-years';
import { mount } from '@vue/test-utils';

describe('IvueDatePickerYears', function () {
      it('should respect min/max props', async () => {
            const wrapper = mount(IvueDatePickerYears, {
                  propsData: {
                        tableDate: '2017',
                        current: '2017-05',
                        value: '2017-11',
                        min: '2011',
                        max: '2018'
                  }
            });

            expect(wrapper.findAll('.ivue-button').at(1).element.textContent).to.be.equal('2011');
            expect(wrapper.findAll('.ivue-button').at(8).element.textContent).to.be.equal('2018');
      });

      it('should emit event on year click', async () => {
            const wrapper = mount(IvueDatePickerYears, {
                  propsData: {
                        tableDate: '2017',
                        current: '2017-05',
                        value: '2017-11'
                  }
            });

            let input;
            wrapper.vm.$on('input', function (value) {
                  input = value;
            });

            wrapper.find('.ivue-button').trigger('click');

            expect(input).to.be.equal('2010');
      });
});