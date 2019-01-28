import IvueBreadcrumbs from '../../src/components/ivue-breadcrumbs';
import IvueBreadcrumbsItem from '../../src/components/ivue-breadcrumbs-item';
import IvueIcon from '../../src/components/ivue-icon';
import { mount } from '@vue/test-utils';

describe('IvueBreadcrumbs', function () {
      it('should render the base breadcrumbs', async () => {
            const wrapper = mount({
                  template: `
                  <IvueBreadcrumbs>
                        <IvueBreadcrumbsItem>
                              Home
                        </IvueBreadcrumbsItem>
                        <IvueBreadcrumbsItem>
                              home
                        </IvueBreadcrumbsItem>
                  </IvueBreadcrumbs>
                  `,
                  components: {
                        IvueBreadcrumbs,
                        IvueBreadcrumbsItem
                  }
            }, {
                         
                  });


            expect(wrapper.classes()).to.contain('ivue-breadcrumbs');
            expect(wrapper.element.getElementsByClassName('ivue-breadcrumbs--divider').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByClassName('ivue-breadcrumbs-item').length > 0).to.be.equal(true);
      });


      it('should render the disabled breadcrumbs item', async () => {
            const wrapper = mount({
                  template: `
                  <IvueBreadcrumbs>
                        <IvueBreadcrumbsItem disabled>
                              Home
                        </IvueBreadcrumbsItem>
                        <IvueBreadcrumbsItem disabled>
                              home
                        </IvueBreadcrumbsItem>
                  </IvueBreadcrumbs>
                  `,
                  components: {
                        IvueBreadcrumbs,
                        IvueBreadcrumbsItem
                  }
            }, {
                         
                  });


            expect(wrapper.classes()).to.contain('ivue-breadcrumbs');
            expect(wrapper.element.getElementsByClassName('ivue-breadcrumbs--divider').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByClassName('ivue-breadcrumbs-item').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByClassName('ivue-breadcrumbs-item--disabled').length > 0).to.be.equal(true);
      });

      it('should render the  breadcrumbs href  tag is a', async () => {
            const wrapper = mount({
                  template: `
                  <IvueBreadcrumbs>
                        <IvueBreadcrumbsItem :href="'www.baidu.com'">
                              Home
                        </IvueBreadcrumbsItem>
                        <IvueBreadcrumbsItem>
                              home
                        </IvueBreadcrumbsItem>
                  </IvueBreadcrumbs>
                  `,
                  components: {
                        IvueBreadcrumbs,
                        IvueBreadcrumbsItem
                  }
            }, {
                         
                  });


            expect(wrapper.classes()).to.contain('ivue-breadcrumbs');
            expect(wrapper.element.getElementsByClassName('ivue-breadcrumbs--divider').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByClassName('ivue-breadcrumbs-item').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByTagName('a').length > 0).to.be.equal(true);
      });


      it('should render the  breadcrumbs set divider', async () => {
            const wrapper = mount({
                  template: `
                  <IvueBreadcrumbs divider="-">
                        <IvueBreadcrumbsItem>
                              Home
                        </IvueBreadcrumbsItem>
                        <IvueBreadcrumbsItem>
                              home
                        </IvueBreadcrumbsItem>
                  </IvueBreadcrumbs>
                  `,
                  components: {
                        IvueBreadcrumbs,
                        IvueBreadcrumbsItem
                  }
            }, {
                         
                  });


            expect(wrapper.classes()).to.contain('ivue-breadcrumbs');
            expect(wrapper.element.getElementsByClassName('ivue-breadcrumbs--divider').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByClassName('ivue-breadcrumbs--divider')[0].innerHTML).to.be.equal('-');
            expect(wrapper.element.getElementsByClassName('ivue-breadcrumbs-item').length > 0).to.be.equal(true);
      });

      it('should render the  breadcrumbs set slot divider', async () => {
            const wrapper = mount({
                  template: `
                  <IvueBreadcrumbs>
                        <IvueIcon slot="divider">forward</IvueIcon>
                        <IvueBreadcrumbsItem>
                              <IvueIcon>home</IvueIcon>
                              Home
                        </IvueBreadcrumbsItem>
                        <IvueBreadcrumbsItem>
                              <IvueIcon>home</IvueIcon>
                              Home
                        </IvueBreadcrumbsItem>
                  </IvueBreadcrumbs>
                  `,
                  components: {
                        IvueBreadcrumbs,
                        IvueBreadcrumbsItem,
                        IvueIcon
                  }
            }, {
                         
                  });


            expect(wrapper.classes()).to.contain('ivue-breadcrumbs');
            expect(wrapper.element.getElementsByClassName('ivue-breadcrumbs--divider').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByClassName('ivue-breadcrumbs-item').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByClassName('ivue-breadcrumbs--divider')[0].children[0].nodeName).to.be.equal('I');
      });
});