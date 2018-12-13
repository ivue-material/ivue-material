import IVueBottomNav from '../../src/components/IVueBottomNav';
import IVueIcon from '../../src/components/IVueIcon';
import IVueButton from '../../src/components/IVueButton';

import { mount } from '@vue/test-utils';

describe('IVueBottomNav', function () {
      it('should render the base bottom nav', async () => {
            const wrapper = mount({
                  template: `
                        <IVueBottomNav :value="true" :active.sync="activeNav">
                              <IVueButton class="red">
                                    <span>Recents</span>
                                    <IVueIcon>history</IVueIcon>
                              </IVueButton>
                              <IVueButton class="buld">
                                          <span>Face</span>
                                          <IVueIcon>face</IVueIcon>
                              </IVueButton>
                        </IVueBottomNav>
                  `,
                  data () {
                        return{
                              activeNav: 0
                        }
                  },
                  components: {
                        IVueBottomNav,
                        IVueIcon,
                        IVueButton
                  }
            }, {
                         
                  });


            expect(wrapper.classes()).to.contain('ivue-bottom-nav');
            expect(wrapper.element.getElementsByTagName('button').length > 0).to.be.equal(true);
      });


      it('should render the base bottom nav theme', async () => {
            const wrapper = mount({
                  template: `
                        <IVueBottomNav :value="true" :active.sync="activeNav" :color="'red'">
                              <IVueButton class="shades-white">
                                    <span>Recents</span>
                                    <IVueIcon>history</IVueIcon>
                              </IVueButton>
                              <IVueButton class="shades-white">
                                          <span>Face</span>
                                          <IVueIcon>face</IVueIcon>
                              </IVueButton>
                        </IVueBottomNav>
                  `,
                  data () {
                        return{
                              activeNav: 0
                        }
                  },
                  components: {
                        IVueBottomNav,
                        IVueIcon,
                        IVueButton
                  }
            }, {
                         
                  });

            expect(wrapper.classes()).to.contain('ivue-bottom-nav');
            expect(wrapper.classes()).to.contain('red');
            expect(wrapper.element.getElementsByTagName('button').length > 0).to.be.equal(true);
      });

      it('should render the base bottom nav height', async () => {
            const wrapper = mount({
                  template: `
                        <IVueBottomNav :value="true" :active.sync="activeNav" :height="'100'">
                              <IVueButton class="red">
                                    <span>Recents</span>
                                    <IVueIcon>history</IVueIcon>
                              </IVueButton>
                              <IVueButton class="buld">
                                          <span>Face</span>
                                          <IVueIcon>face</IVueIcon>
                              </IVueButton>
                        </IVueBottomNav>
                  `,
                  data () {
                        return{
                              activeNav: 0
                        }
                  },
                  components: {
                        IVueBottomNav,
                        IVueIcon,
                        IVueButton
                  }
            }, {
                         
                  });

            expect(wrapper.classes()).to.contain('ivue-bottom-nav');
            expect(wrapper.element.getElementsByTagName('button').length > 0).to.be.equal(true);
            expect(wrapper.element.style.height).to.be.equal('100px');
      });

      it('should render the base bottom nav position', async () => {
            const wrapper = mount({
                  template: `
                        <IVueBottomNav :value="true" :active.sync="activeNav" :position="'absolute'">
                              <IVueButton class="red">
                                    <span>Recents</span>
                                    <IVueIcon>history</IVueIcon>
                              </IVueButton>
                              <IVueButton class="buld">
                                          <span>Face</span>
                                          <IVueIcon>face</IVueIcon>
                              </IVueButton>
                        </IVueBottomNav>
                  `,
                  data () {
                        return{
                              activeNav: 0
                        }
                  },
                  components: {
                        IVueBottomNav,
                        IVueIcon,
                        IVueButton
                  }
            }, {
                         
                  });

            expect(wrapper.classes()).to.contain('ivue-bottom-nav');
            expect(wrapper.classes()).to.contain('ivue-bottom-nav--absolute');
            expect(wrapper.element.getElementsByTagName('button').length > 0).to.be.equal(true);
      });

      it('should render the base bottom nav shift', async () => {
            const wrapper = mount({
                  template: `
                        <IVueBottomNav :value="true" :active.sync="activeNav" :shift="true">
                              <IVueButton class="red">
                                    <span>Recents</span>
                                    <IVueIcon>history</IVueIcon>
                              </IVueButton>
                              <IVueButton class="buld">
                                          <span>Face</span>
                                          <IVueIcon>face</IVueIcon>
                              </IVueButton>
                        </IVueBottomNav>
                  `,
                  data () {
                        return{
                              activeNav: 0
                        }
                  },
                  components: {
                        IVueBottomNav,
                        IVueIcon,
                        IVueButton
                  }
            }, {
                         
                  });

            expect(wrapper.classes()).to.contain('ivue-bottom-nav');
            expect(wrapper.classes()).to.contain('ivue-bottom-nav--shift');
            expect(wrapper.element.getElementsByTagName('button').length > 0).to.be.equal(true);
      });
})
