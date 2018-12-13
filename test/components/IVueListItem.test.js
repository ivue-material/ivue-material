import IVueListItem from '../../src/components/IVueListItem';
import { mount } from '@vue/test-utils';

describe('IVueListItem', function () {
      it('should render the list item', async () => {
            const wrapper = mount({
                  template: `
                        <IVueListItem @click="">list item</IVueListItem>
                  `,
                  components: {
                        IVueListItem
                  }
            }, {
                         
                  });

            expect(wrapper.classes()).to.contain('ivue-list-item');
            expect(wrapper.text().trim()).to.be.equal('list item');
      });
});
