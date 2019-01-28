import IvueList from '../../src/components/ivue-list';
import { mount } from '@vue/test-utils';

describe('IvueList', function () {
      it('should render the list', async () => {
            const wrapper = mount({
                  template: `
                        <IvueList>list</IvueList>
                  `,
                  components: {
                        IvueList
                  }
            }, {
                         
                  });

            expect(wrapper.classes()).to.contain('ivue-list');
            expect(wrapper.text()).to.be.equal('list');
      });
})