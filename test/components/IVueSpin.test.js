import IVueSpin from '../../src/components/IVueSpin';
import IVueIcon from '../../src/components/IVueIcon';
import { mount } from '@vue/test-utils';

describe('IVueSpin', function () {
      it('should render the spin size small', async () => {
            const wrapper = mount({
                  template: `
                         <IVueSpin size="small"></IVueSpin> 
                  `,
                  components: {
                        IVueSpin
                  }
            }, {
                  });


            expect(wrapper.classes()).to.contain('ivue-spin-small');
      });

      it('should render the spin size default', async () => {
            const wrapper = mount({
                  template: `
                         <IVueSpin></IVueSpin> 
                  `,
                  components: {
                        IVueSpin
                  }
            }, {
                  });


            expect(wrapper.classes()).to.contain('ivue-spin-default');
      });

      it('should render the spin size large ', async () => {
            const wrapper = mount({
                  template: `
                         <IVueSpin size="large"></IVueSpin> 
                  `,
                  components: {
                        IVueSpin
                  }
            }, {
                  });

            expect(wrapper.classes()).to.contain('ivue-spin-large');
      });

      it('should render the spin position middle center ', async () => {
            const wrapper = mount({
                  template: `
                        <div style="display: inline-block;
                                    width: 200px;
                                    height: 100px;
                                    position: relative;
                                    border: 1px solid #000;"
                        >
                              <IVueSpin fix></IVueSpin> 
                        </div>
                  `,
                  components: {
                        IVueSpin
                  }
            }, {
                  });


            expect(wrapper.element.children[0].className.indexOf('ivue-spin-fix') >= 0).to.be.equal(true);
      });


      it('should render the spin customize content', async () => {
            const wrapper = mount({
                  template: `
                        <div style="height: 100px;
                                    position: relative;
                                    border: 1px solid #eee;"
                        >
                              <IVueSpin fix>加载中...</IVueSpin> 
                        </div>
                  `,
                  components: {
                        IVueSpin
                  }
            }, {
                  });


            expect(wrapper.text()).to.be.equal('加载中...');
      });


      it('should render the spin customize content icon and text', async () => {
            const wrapper = mount({
                  template: `
                        <div style="height: 100px;
                                    position: relative;
                                    border: 1px solid #eee;"
                        >
                              <IVueSpin fix>
                                    <IVueIcon>donut_large</IVueIcon>
                                    <div>Loading</div>
                              </IVueSpin> 
                        </div>
                  `,
                  components: {
                        IVueSpin,
                        IVueIcon
                  }
            }, {
                  });

            expect(wrapper.text()).to.be.equal('donut_large Loading');
      });


      it('should render the spi customize content is svg', async () => {
            const wrapper = mount({
                  template: `
                        <div style="height: 100px;
                                    position: relative;
                                    border: 1px solid #eee;"
                        >
                              <IVueSpin fix>
                                    <div class="loader">
                                          <svg class="circular" viewBox="25 25 50 50">
                                                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
                                          </svg>
                                    </div>
                              </IVueSpin> 
                        </div>
                  `,
                  components: {
                        IVueSpin
                  }
            }, {
                  });

            expect(wrapper.findAll('svg').length).to.be.at.least(1);
      });
});
