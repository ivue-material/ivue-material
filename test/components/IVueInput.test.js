import IVueInput from '../../src/components/IVueInput';
import { mount } from '@vue/test-utils';


describe('IVueInput', function () {
      it('should render the base text i-vue-input', async () => {
            const wrapper = mount({
                  template: `
                        <IVueInput placeholder="someing messasge">
                        </IVueInput>
                  `,
                  components: {
                        IVueInput
                  }
            }, {
                         
                  });

            expect(wrapper.classes()).to.contain('ivue-input-wrapper');
            expect(wrapper.contains('input')).to.be.equal(true);
      });


      it('should render the base textarea i-vue-input', async () => {
            const wrapper = mount({
                  template: `
                        <IVueInput placeholder="someing messasge" type="textarea" disabled>
                        </IVueInput>
                  `,
                  components: {
                        IVueInput
                  }
            }, {
                         
                  });

            expect(wrapper.classes()).to.contain('ivue-input-wrapper');
            expect(wrapper.contains('textarea')).to.be.equal(true);
            expect(wrapper.find('textarea').attributes('disabled')).to.be.equal('disabled');
      });
})