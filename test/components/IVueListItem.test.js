import IvueListItem from '../../src/components/ivue-list-item';
import { mount } from '@vue/test-utils';

describe('IvueListItem', function () {
      it('should render the list item', async () => {
            const wrapper = mount({
                  template: `
                        <IvueListItem @click="">list item</IvueListItem>
                  `,
                  components: {
                        IvueListItem
                  }
            }, {
                         
                  });

            expect(wrapper.classes()).to.contain('ivue-list-item');
            expect(wrapper.text().trim()).to.be.equal('list item');
      });
});
