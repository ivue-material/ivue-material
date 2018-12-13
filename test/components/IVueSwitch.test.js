import IVueSwitch from '../../src/components/IVueSwitch';
import { mount } from '@vue/test-utils';

describe('IVueListItem', function () {
      it('should render the switch theme', async () => {
            const wrapper = mount({
                  template: `
                        <IVueSwitch class="red-accent-4" :value="true" ></IVueSwitch>
                  `,
                  components: {
                        IVueSwitch
                  }
            }, {
                  });

            expect(wrapper.classes()).to.contain('red-accent-4');
      });

      it('should render the switch disabled', async () => {
            const wrapper = mount({
                  template: `
                        <IVueSwitch :disabled="true"></IVueSwitch>
                  `,
                  components: {
                        IVueSwitch
                  }
            }, {
                  });

            expect(wrapper.classes()).to.contain('ivue-switch-disabled');
      });

      it('should render the switch loading theme', async () => {
            const wrapper = mount({
                  template: `
                        <IVueSwitch loading :value="true" class="red-accent-4"></IVueSwitch>
                  `,
                  components: {
                        IVueSwitch
                  }
            }, {
                  });

            expect(wrapper.classes()).to.contain('red-accent-4');
            expect(wrapper.classes()).to.contain('ivue-switch-loading');
      });

      it('should render the switch text', async () => {
            const wrapper = mount({
                  template: `
                        <IVueSwitch>
                              <span slot="open">开</span>
                              <span slot="close">关</span>
                        </IVueSwitch>
                  `,
                  components: {
                        IVueSwitch
                  }
            }, {
                  });

            expect(wrapper.text()).to.be.equal('关');
      });
});
