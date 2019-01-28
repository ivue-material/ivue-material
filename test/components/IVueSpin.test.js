import IvueSpin from '../../src/components/ivue-spin';
import IvueIcon from '../../src/components/ivue-icon';
import { mount } from '@vue/test-utils';

describe('IvueSpin', function () {
      it('should render the spin size small', async () => {
            const wrapper = mount({
                  template: `
                         <IvueSpin size="small"></IvueSpin> 
                  `,
                  components: {
                        IvueSpin
                  }
            }, {
                  });


            expect(wrapper.classes()).to.contain('ivue-spin-small');
      });

      it('should render the spin size default', async () => {
            const wrapper = mount({
                  template: `
                         <IvueSpin></IvueSpin> 
                  `,
                  components: {
                        IvueSpin
                  }
            }, {
                  });


            expect(wrapper.classes()).to.contain('ivue-spin-default');
      });

      it('should render the spin size large ', async () => {
            const wrapper = mount({
                  template: `
                         <IvueSpin size="large"></IvueSpin> 
                  `,
                  components: {
                        IvueSpin
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
                              <IvueSpin fix></IvueSpin> 
                        </div>
                  `,
                  components: {
                        IvueSpin
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
                              <IvueSpin fix>加载中...</IvueSpin> 
                        </div>
                  `,
                  components: {
                        IvueSpin
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
                              <IvueSpin fix>
                                    <IvueIcon>donut_large</IvueIcon>
                                    <div>Loading</div>
                              </IvueSpin> 
                        </div>
                  `,
                  components: {
                        IvueSpin,
                        IvueIcon
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
                              <IvueSpin fix>
                                    <div class="loader">
                                          <svg class="circular" viewBox="25 25 50 50">
                                                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
                                          </svg>
                                    </div>
                              </IvueSpin> 
                        </div>
                  `,
                  components: {
                        IvueSpin
                  }
            }, {
                  });

            expect(wrapper.findAll('svg').length).to.be.at.least(1);
      });
});
