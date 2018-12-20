import IvueInput from '../../src/components/IvueInput';
import { mount } from '@vue/test-utils';


describe('IvueInput', function () {
      it('should render the base text i-vue-input', async () => {
            const wrapper = mount({
                  template: `
                        <IvueInput placeholder="someing messasge">
                        </IvueInput>
                  `,
                  components: {
                        IvueInput
                  }
            }, {
                         
                  });

            expect(wrapper.classes()).to.contain('ivue-input-wrapper');
            expect(wrapper.contains('input')).to.be.equal(true);
      });


      it('should render the base textarea i-vue-input', async () => {
            const wrapper = mount({
                  template: `
                        <IvueInput placeholder="someing messasge" type="textarea" disabled>
                        </IvueInput>
                  `,
                  components: {
                        IvueInput
                  }
            }, {
                         
                  });

            expect(wrapper.classes()).to.contain('ivue-input-wrapper');
            expect(wrapper.contains('textarea')).to.be.equal(true);
            expect(wrapper.find('textarea').attributes('disabled')).to.be.equal('disabled');
      });
})