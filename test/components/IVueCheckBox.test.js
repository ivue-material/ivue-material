import IvueCheckbox from '../../src/components/ivue-checkbox/ivue-checkbox';
import IvueCheckboxGroup from '../../src/components/ivue-checkbox/ivue-checkbox-group';
import { mount } from '@vue/test-utils';

describe('IvueCheckbox', function () {
    it('should render the base IvueCheckbox', async () => {
        const wrapper = mount({
            template: `<IvueCheckbox :value="active">default</IvueCheckbox>`,
            data () {
                return {
                    active: true
                }
            },
            components: {
                IvueCheckbox
            }
        });


        expect(wrapper.find('.ivue-checkbox').classes('ivue-checkbox-checked')).to.be.equal(true);
    });


    it('should render the disabled IvueCheckbox', async () => {
        const wrapper = mount({
            template: `<IvueCheckbox :value="active" disabled>default</IvueCheckbox>`,
            data () {
                return {
                    active: true
                }
            },
            components: {
                IvueCheckbox
            }
        });


        expect(wrapper.find('.ivue-checkbox').classes('ivue-checkbox-disabled')).to.be.equal(true);
    });

    it('should render the label IvueCheckbox', async () => {
        const wrapper = mount({
            template: `
                  <IvueCheckbox :value="active" label="checkbox"></IvueCheckbox>
                  `,
            data () {
                return {
                    active: true
                }
            },
            components: {
                IvueCheckbox
            }
        });

        expect(wrapper.text()).to.be.equal('checkbox');
    });


    it('should render the label IvueCheckboxGroup', async () => {
        const wrapper = mount({
            template: `
                <IvueCheckboxGroup :value="active">
                  <IvueCheckbox label="checkbox"></IvueCheckbox>
                </IvueCheckboxGroup>
                  `,
            data () {
                return {
                    active: ['checkbox']
                }
            },
            components: {
                IvueCheckbox,
                IvueCheckboxGroup
            }
        });


        expect(wrapper.find('.ivue-checkbox').classes('ivue-checkbox-checked')).to.be.equal(true);
    });

});
