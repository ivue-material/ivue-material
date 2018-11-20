import IVueBadge from '../../src/components/IVueBadge';

import { mount } from '@vue/test-utils';

describe('IVueBadge', function () {
      it('should render the base IVueBadge', async () => {
            const wrapper = mount({
                  template: `
                        <IVueBadge :count="3" >
                              hello
                        </IVueBadge>
                  `,
                  components: {
                        IVueBadge
                  }
            }, {
                        attachToDocument: true
                  });

            expect(wrapper.vm.$children[0].count).to.be.equal(3);
      });


      it('should render the max count', async () => {
            const wrapper = mount({
                  template: `
                        <IVueBadge :count="9999" >
                              hello
                        </IVueBadge>
                  `,
                  components: {
                        IVueBadge
                  }
            }, {
                        attachToDocument: true
                  });

           expect(wrapper.vm.$children[0].$children[0].$el.innerText).to.be.equal('99+');

      });

      it('should render the showZero', async () => {
            const wrapper = mount({
                  template: `
                        <IVueBadge  :count="0" :showZero="true">
                              hello
                        </IVueBadge>
                  `,
                  components: {
                        IVueBadge
                  }
            }, {
                        attachToDocument: true
                  });

           expect(wrapper.vm.$children[0].showZero).to.be.equal(true);
      });
});
