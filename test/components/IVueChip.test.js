import IvueChip from '../../src/components/ivue-chip';
import IvueIcon from '../../src/components/ivue-icon';
import { mount } from '@vue/test-utils';

describe('IvueChip', function () {
    it('should render the display', async () => {
        const wrapper = mount({
            template: `
                <IvueChip disabled></IvueChip>
            `,
            components: {
                IvueChip
            }
        });


        expect(wrapper.classes('ivue-chip--disabled')).to.be.equal(true);
    });


    it('should render the color and text color', async () => {
        const wrapper = mount({
            template: `
                <IvueChip color="primary" text-color="#ffffff"></IvueChip>
            `,
            components: {
                IvueChip
            }
        });


        expect(wrapper.classes('primary')).to.be.equal(true);
        expect(wrapper.attributes().style.indexOf('color') > -1).to.be.equal(true);
    });


    it('should render the icon', async () => {
        const wrapper = mount({
            template: `
                <IvueChip><IvueIcon>build</IvueIcon></IvueChip>
            `,
            components: {
                IvueChip,
                IvueIcon
            }
        });


        expect(wrapper.find('.ivue-icon').is('i')).to.be.equal(true);
    });



    it('should render the outline', async () => {
        const wrapper = mount({
            template: `
                <IvueChip outline></IvueChip>
            `,
            components: {
                IvueChip
            }
        });

        expect(wrapper.classes('ivue-chip--outline')).to.be.equal(true);
    });

    it('should render the square', async () => {
        const wrapper = mount({
            template: `
                <IvueChip square></IvueChip>
            `,
            components: {
                IvueChip
            }
        });

        expect(wrapper.classes('ivue-chip--square')).to.be.equal(true);
    });


    it('should render the close', async () => {
        const wrapper = mount({
            template: `
                <IvueChip close></IvueChip>
            `,
            components: {
                IvueChip
            }
        });

        expect(wrapper.classes('ivue-chip--close')).to.be.equal(true);
    });

});
