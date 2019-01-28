import IvueDatePickerMonth from '../../../src/components/ivue-date-picker/ivue-date-picker-month';
import { mount } from '@vue/test-utils';

describe('IvueDatePickerMonth', function () {
      it('should emit event when month button is clicked', () => {
            const wrapper = mount(IvueDatePickerMonth, {
                  propsData: {
                        tableDate: '2017',
                        current: '2017-05',
                        value: '2017-11'
                  }
            })

            let input;
            wrapper.vm.$on('input', function (e) {
                  input = e
            });

            wrapper.findAll('tbody button').at(0).trigger('click')
            expect(input).to.be.equal('2017-01');
      });

      it('should not emit event when disabled month button is clicked', () => {
            const wrapper = mount(IvueDatePickerMonth, {
                  propsData: {
                        tableDate: '2017',
                        current: '2017-05',
                        value: '2017-11',
                        allowedDates: () => false
                  }
            })

            let input;
            wrapper.vm.$on('input', function (e) {
                  input = e
            });

            wrapper.findAll('tbody button').at(0).trigger('click')
            expect(input).to.be.equal(undefined);
      });

      it('should change tableDate when touch is called', () => {
            const wrapper = mount(IvueDatePickerMonth, {
                  propsData: {
                        tableDate: '2017'
                  }
            })

            let tableDate;
            wrapper.vm.$on('table-date', function (e) {
                  tableDate = e
            });
            wrapper.vm.touch(1);
            expect(tableDate).to.be.equal('2018');
            wrapper.vm.touch(-1);
            expect(tableDate).to.be.equal('2016');
      });
});