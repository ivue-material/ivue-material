import IvueBottomNav from '../../src/components/ivue-bottom-nav';
import IvueIcon from '../../src/components/ivue-icon';
import IvueButton from '../../src/components/ivue-button';

import { mount } from '@vue/test-utils';

describe('IvueBottomNav', function () {
      it('should render the base bottom nav', async () => {
            const wrapper = mount({
                  template: `
                        <IvueBottomNav :value="true" :active.sync="activeNav">
                              <IvueButton class="red">
                                    <span>Recents</span>
                                    <IvueIcon>history</IvueIcon>
                              </IvueButton>
                              <IvueButton class="buld">
                                          <span>Face</span>
                                          <IvueIcon>face</IvueIcon>
                              </IvueButton>
                        </IvueBottomNav>
                  `,
                  data () {
                        return{
                              activeNav: 0
                        }
                  },
                  components: {
                        IvueBottomNav,
                        IvueIcon,
                        IvueButton
                  }
            }, {
                         
                  });


            expect(wrapper.classes()).to.contain('ivue-bottom-nav');
            expect(wrapper.element.getElementsByTagName('button').length > 0).to.be.equal(true);
      });


      it('should render the base bottom nav theme', async () => {
            const wrapper = mount({
                  template: `
                        <IvueBottomNav :value="true" :active.sync="activeNav" :color="'red'">
                              <IvueButton class="shades-white">
                                    <span>Recents</span>
                                    <IvueIcon>history</IvueIcon>
                              </IvueButton>
                              <IvueButton class="shades-white">
                                          <span>Face</span>
                                          <IvueIcon>face</IvueIcon>
                              </IvueButton>
                        </IvueBottomNav>
                  `,
                  data () {
                        return{
                              activeNav: 0
                        }
                  },
                  components: {
                        IvueBottomNav,
                        IvueIcon,
                        IvueButton
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
                        <IvueBottomNav :value="true" :active.sync="activeNav" :height="'100'">
                              <IvueButton class="red">
                                    <span>Recents</span>
                                    <IvueIcon>history</IvueIcon>
                              </IvueButton>
                              <IvueButton class="buld">
                                          <span>Face</span>
                                          <IvueIcon>face</IvueIcon>
                              </IvueButton>
                        </IvueBottomNav>
                  `,
                  data () {
                        return{
                              activeNav: 0
                        }
                  },
                  components: {
                        IvueBottomNav,
                        IvueIcon,
                        IvueButton
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
                        <IvueBottomNav :value="true" :active.sync="activeNav" :position="'absolute'">
                              <IvueButton class="red">
                                    <span>Recents</span>
                                    <IvueIcon>history</IvueIcon>
                              </IvueButton>
                              <IvueButton class="buld">
                                          <span>Face</span>
                                          <IvueIcon>face</IvueIcon>
                              </IvueButton>
                        </IvueBottomNav>
                  `,
                  data () {
                        return{
                              activeNav: 0
                        }
                  },
                  components: {
                        IvueBottomNav,
                        IvueIcon,
                        IvueButton
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
                        <IvueBottomNav :value="true" :active.sync="activeNav" :shift="true">
                              <IvueButton class="red">
                                    <span>Recents</span>
                                    <IvueIcon>history</IvueIcon>
                              </IvueButton>
                              <IvueButton class="buld">
                                          <span>Face</span>
                                          <IvueIcon>face</IvueIcon>
                              </IvueButton>
                        </IvueBottomNav>
                  `,
                  data () {
                        return{
                              activeNav: 0
                        }
                  },
                  components: {
                        IvueBottomNav,
                        IvueIcon,
                        IvueButton
                  }
            }, {
                         
                  });

            expect(wrapper.classes()).to.contain('ivue-bottom-nav');
            expect(wrapper.classes()).to.contain('ivue-bottom-nav--shift');
            expect(wrapper.element.getElementsByTagName('button').length > 0).to.be.equal(true);
      });
})
