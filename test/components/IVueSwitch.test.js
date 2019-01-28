import IvueSwitch from '../../src/components/ivue-switch';
import { mount } from '@vue/test-utils';

describe('IvueListItem', function () {
      it('should render the switch theme', async () => {
            const wrapper = mount({
                  template: `
                        <IvueSwitch class="red-accent-4" :value="true" ></IvueSwitch>
                  `,
                  components: {
                        IvueSwitch
                  }
            }, {
                  });

            expect(wrapper.classes()).to.contain('red-accent-4');
      });

      it('should render the switch disabled', async () => {
            const wrapper = mount({
                  template: `
                        <IvueSwitch :disabled="true"></IvueSwitch>
                  `,
                  components: {
                        IvueSwitch
                  }
            }, {
                  });

            expect(wrapper.classes()).to.contain('ivue-switch-disabled');
      });

      it('should render the switch loading theme', async () => {
            const wrapper = mount({
                  template: `
                        <IvueSwitch loading :value="true" class="red-accent-4"></IvueSwitch>
                  `,
                  components: {
                        IvueSwitch
                  }
            }, {
                  });

            expect(wrapper.classes()).to.contain('red-accent-4');
            expect(wrapper.classes()).to.contain('ivue-switch-loading');
      });

      it('should render the switch text', async () => {
            const wrapper = mount({
                  template: `
                        <IvueSwitch>
                              <span slot="open">开</span>
                              <span slot="close">关</span>
                        </IvueSwitch>
                  `,
                  components: {
                        IvueSwitch
                  }
            }, {
                  });

            expect(wrapper.text()).to.be.equal('关');
      });
});
