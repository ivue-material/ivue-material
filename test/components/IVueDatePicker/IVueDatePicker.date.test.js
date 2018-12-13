import IVueDatePicker from '../../../src/components/IVueDatePicker/IVueDatePicker';
import { mount } from '@vue/test-utils';


describe('IVueDatePicker', function () {
      it('should display the correct date in title and header', () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        value: '2018-11-10'
                  }
            });

            const title = wrapper.find('.ivue-date-picker-title--date').text();
            const header = wrapper.find('.ivue-date-picker-header--value strong').text();

            expect(title).to.be.equal('Sat, Nov 10');
            expect(header).to.be.equal('November 2018');

      });

      it('should render readonly picker', () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        value: '2018-11-10',
                        readonly: true
                  }
            });

            expect(wrapper.props().readonly).to.be.equal(true)

      });


      it('should emit input event on date click', async () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        value: '2018-12-10'
                  }
            });


            let input;
            wrapper.vm.$on('input', function (msg) {
                  input = msg;
            });

            wrapper.find('.ivue-date-picker-date--table tbody tr+tr td:first-child button').trigger('click');


            expect(input).to.equal('2018-12-02');

      });

      it('should not emit input event on month click if date is not allowed', async () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        value: '2018-12-10',
                        allowedDates: () => false,
                        type: 'month'
                  }
            });

            let input;
            wrapper.vm.$on('input', function (msg) {
                  input = msg;
            });

            wrapper.find('.ivue-date-picker-month--table tbody tr+tr td:first-child button').trigger('click');
            expect(input).to.equal(undefined);
      });

      it('should emit input event no year click (reactive picker)', async () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        value: '2018-05-13',
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


            wrapper.find('.ivue-date-picker-years--table tbody tr+tr td:first-child button').trigger('click');

            expect(input).to.equal('2013-05-13');
      });

      it('should not emit input event no year click if date is not allowed', async () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        value: '2018-05-13',
                        allowedDates: () => false
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


            wrapper.find('.ivue-date-picker-years--table tbody tr+tr td:first-child button').trigger('click');

            expect(input).to.equal(undefined);
      });


      it('should emit input event with selected dates after click', async () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        multiple: true,
                        value: ['2018-05-07', '2018-05-08']
                  }
            });


            let input;
            wrapper.vm.$on('input', function (msg) {
                  input = msg;
            });

            wrapper.find('.ivue-date-picker-date--table tbody tr+tr td:first-child button').trigger('click');

            expect(input).to.include.members(["2018-05-07", "2018-05-08", "2018-05-06"]);
      });


      it('should emit update:pickerDate event when tableDate changes', async () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        value: '2018-12'
                  }
            });


            let input;
            wrapper.vm.$on('update:pickerDate', function (msg) {
                  input = msg;
            });

            wrapper.vm.tableDate = '2018-11'
            await wrapper.vm.$nextTick();
            expect(input).to.be.equal('2018-11')


      });


      it('should set tableDate to pickerDate', async () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        value: '2018-12',
                        pickerDate: '2018-02'
                  }
            });


            expect(wrapper.vm.tableDate).to.be.equal('2018-02')
      });


      it('should update pickerDate to the selected month after setting it to null', async () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        value: '2018-09-13',
                        pickerDate: '2017-11'
                  }
            })

            let input;
            wrapper.vm.$on('update:pickerDate', function (msg) {
                  input = msg;
            });

            await wrapper.vm.$nextTick()

            wrapper.setProps({
                  pickerDate: null
            })

            await wrapper.vm.$nextTick()
            expect(input).to.be.equal('2018-09');
      });
});