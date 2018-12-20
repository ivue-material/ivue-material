import IvueDatePickerHeader from '../../../src/components/IvueDatePicker/IvueDatePickerHeader';
import { mount } from '@vue/test-utils';


describe('IvueDatePickerHeader', function () {
      it('should render component with year value and match snapshot', () => {
            const wrapper = mount(IvueDatePickerHeader, {
                  propsData: {
                        value: '2017'
                  }
            });

            expect(wrapper.find('.ivue-date-picker-header--value strong').element.textContent).to.be.equal('2017');
      });


      it('should render prev/next icons', () => {
            const wrapper = mount(IvueDatePickerHeader, {
                  propsData: {
                        value: '2017',
                        nextIcon: 'next',
                        prevIcon: 'prev'
                  }
            });

            expect(wrapper.findAll('.ivue-icon').at(0).element.textContent).to.be.equal('prev');
            expect(wrapper.findAll('.ivue-icon').at(1).element.textContent).to.be.equal('next');
      });


      it('should render component with own formatter', () => {
            const wrapper = mount(IvueDatePickerHeader, {
                  propsData: {
                        value: '2017-12',
                        format: value => `(${value})`
                  }
            });

            expect(wrapper.find('.ivue-date-picker-header--value strong').element.textContent).to.be.equal('(2017-12)');
      });


      it('should render colored component', () => {
            const wrapper = mount(IvueDatePickerHeader, {
                  propsData: {
                        value: '2017-12',
                        color: 'red'
                  }
            });
            const strong = wrapper.find('.ivue-date-picker-header--value strong');
            expect(strong.classes('red--text')).to.be.equal(true)
      });

      it('should trigger event on arrows click', () => {
            const wrapper = mount(IvueDatePickerHeader, {
                  propsData: {
                        value: '2016-12'
                  }
            });

            let input;
            wrapper.vm.$on('input', function (e) {
                  input = e
            });


            wrapper.findAll('button').at(0).trigger('click')
            expect(input).to.be.equal('2016-11');

            wrapper.findAll('button').at(1).trigger('click');
            expect(input).to.be.equal('2017-01');
      });

      it('should calculate prev/next value', () => {
            const wrapper = mount(IvueDatePickerHeader, {
                  propsData: {
                        value: '2017-12'
                  }
            });

            expect(wrapper.vm.calculateChange(-1)).to.be.equal('2017-11');
            expect(wrapper.vm.calculateChange(+1)).to.be.equal('2018-01');

            wrapper.setProps({
                  value: '2016'
            });
            expect(wrapper.vm.calculateChange(-1)).to.be.equal('2015');
            expect(wrapper.vm.calculateChange(+1)).to.be.equal('2017');
      });
});