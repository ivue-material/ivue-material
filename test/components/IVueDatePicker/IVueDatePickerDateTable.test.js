import IVueDatePicker from '../../../src/components/IVueDatePicker/IVueDatePicker';
import { mount } from '@vue/test-utils';


describe('IVueDatePicker', function () {
      it('should watch tableDate value and run transition', async () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        current: '2018-07',
                        value: '2018-11-03',
                  },
                  data () {
                        return {
                              tableDate: '2018-05'
                        }
                  }
            });

            wrapper.setData({ tableDate: '2018-12' });
            await wrapper.vm.$nextTick();
            expect(wrapper.find('table').element.className).to.be.equal('tab-transition-enter tab-transition-enter-active');
      });

      it('should watch tableDate value and run reverse transition', async () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        current: '2018-07',
                        value: '2018-11-02'
                  },
                  data () {
                        return {
                              tableDate: '2018-05'
                        }
                  }
            });

            wrapper.setData({ tableDate: '2018-01' });
            await wrapper.vm.$nextTick();
            expect(wrapper.find('table').element.className).to.be.equal('tab-reverse-transition-enter tab-reverse-transition-enter-active');
      });


      it('should change tableDate when touch is called', () => {
            const wrapper = mount(IVueDatePicker, {
                  propsData: {
                        value: '2017-05-02'
                  }
            })

            wrapper.vm.$refs.table.touch(1);
            expect(wrapper.vm.tableDate).to.be.equal('2017-06');

            wrapper.vm.$refs.table.touch(-1);
            expect(wrapper.vm.tableDate).to.be.equal('2017-04');

      })
});