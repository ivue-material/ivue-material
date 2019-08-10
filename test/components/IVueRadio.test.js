import IvueRadio from '../../src/components/ivue-radio/ivue-radio';
import IvueRadioGroup from '../../src/components/ivue-radio/ivue-radio-group';
import { mount } from '@vue/test-utils';

describe('IVueRadio', function () {
    it('should render the base IVueRadio', async () => {
        const wrapper = mount({
            template: `
                  <ivue-radio :value="active">Radio</ivue-radio>
                  `,
            data () {
                return {
                    active: true
                }
            },
            components: {
                IvueRadio
            }
        });


        expect(wrapper.find('.ivue-radio').classes('ivue-radio-checked')).to.be.equal(true);
    });

    it('should render the disabled IVueRadio', async () => {
        const wrapper = mount({
            template: `
                  <ivue-radio :value="active" disabled>Radio</ivue-radio>
                  `,
            data () {
                return {
                    active: true
                }
            },
            components: {
                IvueRadio
            }
        });


        expect(wrapper.find('.ivue-radio').classes('ivue-radio-disabled')).to.be.equal(true);
    });

    it('should render the label IVueRadio', async () => {
        const wrapper = mount({
            template: `
                  <ivue-radio :value="active" label="radio"></ivue-radio>
                  `,
            data () {
                return {
                    active: true
                }
            },
            components: {
                IvueRadio
            }
        });

        expect(wrapper.text()).to.be.equal('radio');
    });

    it('should render the label IvueRadioGroup', async () => {
        const wrapper = mount({
            template: `
                <ivue-radio-group :value="active">
                  <ivue-radio label="radio"></ivue-radio>
                </ivue-radio-group>
                  `,
            data () {
                return {
                    active: 'radio'
                }
            },
            components: {
                IvueRadio,
                IvueRadioGroup
            }
        });


        expect(wrapper.find('.ivue-radio').classes('ivue-radio-checked')).to.be.equal(true);
    });
});
