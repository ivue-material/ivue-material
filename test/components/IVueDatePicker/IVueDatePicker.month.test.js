import IVueDatePicker from '../../../src/components/IVueDatePicker/IVueDatePicker';
import { mount } from '@vue/test-utils';


describe('IVueDatePicker', function () {
      it('should emit input event on year click (reactive picker)', async () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        value: '2018-05',
                        type: 'month',
                        reactive: true
                  },
                  data () {
                        return {
                              activeType: 'YEAR'
                        }
                  }
            })

            let input;
            wrapper.vm.$on('input', function (msg) {
                  input = msg;
            });

            let change;
            wrapper.vm.$on('change', function (msg) {
                  change = msg;
            });
            wrapper.find('.ivue-date-picker-years--table tbody tr+tr td:first-child button').trigger('click');
            expect(input).to.equal('2013-05');
            expect(change).to.equal(undefined);

      });

      it('should not emit input event on year click if month is not allowed', async () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        value: '2018-05',
                        type: 'month',
                        allowedDates: () => false
                  },
                  data () {
                        return {
                              activeType: 'YEAR'
                        }
                  }
            });

            let input;
            wrapper.vm.$on('input', function (msg) {
                  input = msg;
            });

            wrapper.find('.ivue-date-picker-years--table tbody tr+tr td:first-child button').trigger('click');
            expect(input).to.equal(undefined);
      });

      it('should emit input event on month click', async () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        value: '2018-05',
                        type: 'month'
                  }
            });

            let input;
            wrapper.vm.$on('input', function (msg) {
                  input = msg;
            });

            wrapper.find('.ivue-date-picker-month--table tbody tr+tr td:first-child button').trigger('click');

            expect(input).to.equal('2018-04');
      });


      it('should match change month when clicked on header arrow button', () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        value: '2018-05',
                        type: 'month'
                  }
            });

            const leftButton = wrapper.findAll('.ivue-date-picker-header button').at(0);
            const rightButton = wrapper.findAll('.ivue-date-picker-header button').at(1);

            leftButton.trigger('click');
            expect(wrapper.vm.tableDate).to.equal('2017');

            rightButton.trigger('click');
            expect(wrapper.vm.tableDate).to.equal('2019');
      });

      it('should match change active picker when clicked on month button', () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        value: '2018-05-02',
                        type: 'month'
                  }
            });

            wrapper.find('.ivue-date-picker-header--value strong').trigger('click');

            expect(wrapper.vm.activeType).to.equal('YEAR');
      });


      it('should set the table date when tableDate has changed', () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        type: 'month'
                  },
                  date () {
                        return {
                              tableDate: null
                        }
                  }
            });

            wrapper.setData({ tableDate: '2017-12' });
            expect(wrapper.vm.tableDate).to.equal('2017-12');
      });
});