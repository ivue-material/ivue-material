import IVueAvatar from '../../src/components/ivue-avatar';
import { mount } from '@vue/test-utils';

describe('IVueAvatar', function () {
    it('should render the base IVueAvatar', async () => {
        const wrapper = mount({
            template: `
                        <IVueAvatar>avatar</IVueAvatar>
                  `,
            components: {
                IVueAvatar
            }
        });


        expect(wrapper.classes('ivue-avatar')).to.be.equal(true);
        expect(wrapper.text()).to.be.equal('avatar');
    });


    it('should render the size IVueAvatar', async () => {
        const wrapper = mount({
            template: `
                        <IVueAvatar size="50">avatar</IVueAvatar>
                  `,
            components: {
                IVueAvatar
            }
        });

        expect(wrapper.element.style['width']).to.be.equal('50px');
    });


    it('should render the square IVueAvatar', async () => {
        const wrapper = mount({
            template: `
                        <IVueAvatar  shape="square">avatar</IVueAvatar>
                  `,
            components: {
                IVueAvatar
            }
        });

        expect(wrapper.classes('ivue-avatar-square')).to.be.equal(true);
    });


    it('should render the icon IVueAvatar', async () => {
        const wrapper = mount({
            template: `
                        <IVueAvatar icon="menu"></IVueAvatar>
                  `,
            components: {
                IVueAvatar
            }
        });

        expect(wrapper.find('.ivue-icon').text()).to.be.equal('menu');
    });

});
