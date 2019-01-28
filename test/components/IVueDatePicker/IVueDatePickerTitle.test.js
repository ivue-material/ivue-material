import IvueDatePickerTitle from '../../../src/components/ivue-date-picker/ivue-date-picker-title';
import { mount } from '@vue/test-utils';

describe('IvueDatePickerTitle', function () {
      it('should emit input event on year/date click', () => {
            const wrapper = mount(IvueDatePickerTitle, {
                  propsData: {
                        year: '1234',
                        yearIcon: 'year',
                        date: '2017-11-01'
                  }
            });

            let input;
            wrapper.vm.$on('update:selectingYear', function (value) {
                  input = value;

                  wrapper.setProps({ selectingYear: value });
            });

            wrapper.find('.ivue-date-picker-title--date').trigger('click');
            expect(input).to.be.equal(undefined);

            wrapper.find('.ivue-date-picker-title--year').trigger('click');
            expect(input).to.be.equal(true);
      });


      it('should have the correct transition', () => {
            const wrapper = mount(IvueDatePickerTitle, {
                  propsData: {
                        year: '2018',
                        date: 'Tue, Mar 3',
                        value: '2018-03-03'
                  }
            });

            expect(wrapper.vm.isReversing).to.be.equal(false);

            wrapper.setProps({
                  date: 'Wed, Mar 4',
                  value: '2018-03-04'
            });

            expect(wrapper.vm.isReversing).to.be.equal(false);

            wrapper.setProps({
                  date: 'Wed, Mar 3',
                  value: '2018-03-03'
            });

            expect(wrapper.vm.isReversing).to.be.equal(true);
      });

});