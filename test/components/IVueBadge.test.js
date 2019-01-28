import IvueBadge from '../../src/components/ivue-badge';

import { mount } from '@vue/test-utils';

describe('IvueBadge', function () {
      it('should render the base IvueBadge', async () => {
            const wrapper = mount({
                  template: `
                        <IvueBadge :count="3" >
                              hello
                        </IvueBadge>
                  `,
                  components: {
                        IvueBadge
                  }
            }, {
                         
                  });

            expect(wrapper.vm.$children[0].count).to.be.equal(3);
      });


      it('should render the max count', async () => {
            const wrapper = mount({
                  template: `
                        <IvueBadge :count="9999" >
                              hello
                        </IvueBadge>
                  `,
                  components: {
                        IvueBadge
                  }
            }, {
                         
                  });

           expect(wrapper.vm.$children[0].$children[0].$el.innerText).to.be.equal('99+');

      });

      it('should render the showZero', async () => {
            const wrapper = mount({
                  template: `
                        <IvueBadge  :count="0" :showZero="true">
                              hello
                        </IvueBadge>
                  `,
                  components: {
                        IvueBadge
                  }
            }, {
                         
                  });

           expect(wrapper.vm.$children[0].showZero).to.be.equal(true);
      });
});
