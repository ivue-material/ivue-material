import IVueList from '../../src/components/IVueList';
import { mount } from '@vue/test-utils';

describe('IVueList', function () {
      it('should render the list', async () => {
            const wrapper = mount({
                  template: `
                        <IVueList>list</IVueList>
                  `,
                  components: {
                        IVueList
                  }
            }, {
                        attachToDocument: true
                  });

            expect(wrapper.classes()).to.contain('ivue-list');
            expect(wrapper.text()).to.be.equal('list');
      });
})