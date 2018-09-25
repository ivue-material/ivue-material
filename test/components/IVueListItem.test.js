import IVueListItem from '../../src/components/IVueListItem';
import { mount, createLocalVue } from '@vue/test-utils';

describe('IVueListItem', function () {
      it('should render the list item', async () => {
            const wrapper = mount({
                  template: `
                        <IVueListItem>list</IVueListItem>
                  `,
                  components: {
                        IVueListItem
                  }
            }, {
                        attachToDocument: true
                  });

            expect(wrapper.classes()).to.contain('ivue-list');
            expect(wrapper.text()).to.be.equal('list');
      });
})