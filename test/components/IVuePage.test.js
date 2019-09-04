import IvuePage from '../../src/components/ivue-page';

import { mount } from '@vue/test-utils';

describe('IvuePage', function () {
    it('should render the base IvuePage', async () => {
        const wrapper = mount({
            template: `
                        <IvuePage :total="10" ></IvuePage>
                  `,
            components: {
                IvuePage
            }
        });

        expect(wrapper.findAll('.ivue-page-item--active').length).to.be.equal(1);
    });

    it('should render the page 2 IvuePage', async () => {
        const wrapper = mount({
            template: `
                        <IvuePage :total="10" :value="2"></IvuePage>
                  `,
            components: {
                IvuePage
            }
        });


        expect(wrapper.findAll('.ivue-page-item--active').wrappers[0].element.innerText).to.be.equal('2');
    });


    it('should render the page circle IvuePage', async () => {
        const wrapper = mount({
            template: `
                     <IvuePage :total="10" circle></IvuePage>
                  `,
            components: {
                IvuePage
            }
        });

        expect(wrapper.findAll('.ivue-page-item--circle').length > 0).to.be.equal(true);
    });

    it('should render the page showElevator input IvuePage', async () => {
        const wrapper = mount({
            template: `
                     <IvuePage :total="10" showElevator></IvuePage>
                  `,
            components: {
                IvuePage
            }
        });

        const textInput = wrapper.find('input[type="text"]')
        textInput.setValue('2');
        textInput.trigger('keyup.enter');


        expect(wrapper.findAll('.ivue-page-item--active').wrappers[0].element.innerText).to.be.equal('2');
    });


    it('should render the page select pageSizeOpts IvuePage', async () => {
        const wrapper = mount({
            template: `
                     <IvuePage :total="100" :pageSizeOpts="[10,20,30]"></IvuePage>
                  `,
            components: {
                IvuePage
            }
        });

        const select = wrapper.find('.ivue-select-selection')
        select.trigger('click');


        const item = wrapper.find('.ivue-select-item')
        item.trigger('click');


        expect(wrapper.findAll('.ivue-select-selection-value').wrappers[0].element.innerText).to.be.equal('10 条/页');

    });


});
