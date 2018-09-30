import IVueBreadcrumbs from '../../src/components/IVueBreadcrumbs';
import IVueBreadcrumbsItem from '../../src/components/IVueBreadcrumbsItem';
import IVueIcon from '../../src/components/IVueIcon';
import { mount } from '@vue/test-utils';

describe('IVueBreadcrumbs', function () {
      it('should render the base breadcrumbs', async () => {
            const wrapper = mount({
                  template: `
                  <IVueBreadcrumbs>
                        <IVueBreadcrumbsItem>
                              Home
                        </IVueBreadcrumbsItem>
                        <IVueBreadcrumbsItem>
                              home
                        </IVueBreadcrumbsItem>
                  </IVueBreadcrumbs>
                  `,
                  components: {
                        IVueBreadcrumbs,
                        IVueBreadcrumbsItem
                  }
            }, {
                        attachToDocument: true
                  });


            expect(wrapper.classes()).to.contain('ivu-breadcrumb');
            expect(wrapper.element.getElementsByClassName('ivu-breadcrumb--divider').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByClassName('ivu-breadcrumb-item').length > 0).to.be.equal(true);
      });


      it('should render the disabled breadcrumbs item', async () => {
            const wrapper = mount({
                  template: `
                  <IVueBreadcrumbs>
                        <IVueBreadcrumbsItem disabled>
                              Home
                        </IVueBreadcrumbsItem>
                        <IVueBreadcrumbsItem disabled>
                              home
                        </IVueBreadcrumbsItem>
                  </IVueBreadcrumbs>
                  `,
                  components: {
                        IVueBreadcrumbs,
                        IVueBreadcrumbsItem
                  }
            }, {
                        attachToDocument: true
                  });


            expect(wrapper.classes()).to.contain('ivu-breadcrumb');
            expect(wrapper.element.getElementsByClassName('ivu-breadcrumb--divider').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByClassName('ivu-breadcrumb-item').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByClassName('ivu-breadcrumb-item--disabled').length > 0).to.be.equal(true);
      });

      it('should render the  breadcrumbs href  tag is a', async () => {
            const wrapper = mount({
                  template: `
                  <IVueBreadcrumbs>
                        <IVueBreadcrumbsItem :href="'www.baidu.com'">
                              Home
                        </IVueBreadcrumbsItem>
                        <IVueBreadcrumbsItem>
                              home
                        </IVueBreadcrumbsItem>
                  </IVueBreadcrumbs>
                  `,
                  components: {
                        IVueBreadcrumbs,
                        IVueBreadcrumbsItem
                  }
            }, {
                        attachToDocument: true
                  });


            expect(wrapper.classes()).to.contain('ivu-breadcrumb');
            expect(wrapper.element.getElementsByClassName('ivu-breadcrumb--divider').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByClassName('ivu-breadcrumb-item').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByTagName('a').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByTagName('a')[0].href).to.be.equal('http://localhost:9876/www.baidu.com');
      });


      it('should render the  breadcrumbs set divider', async () => {
            const wrapper = mount({
                  template: `
                  <IVueBreadcrumbs divider="-">
                        <IVueBreadcrumbsItem>
                              Home
                        </IVueBreadcrumbsItem>
                        <IVueBreadcrumbsItem>
                              home
                        </IVueBreadcrumbsItem>
                  </IVueBreadcrumbs>
                  `,
                  components: {
                        IVueBreadcrumbs,
                        IVueBreadcrumbsItem
                  }
            }, {
                        attachToDocument: true
                  });


            expect(wrapper.classes()).to.contain('ivu-breadcrumb');
            expect(wrapper.element.getElementsByClassName('ivu-breadcrumb--divider').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByClassName('ivu-breadcrumb--divider')[0].innerHTML).to.be.equal('-');
            expect(wrapper.element.getElementsByClassName('ivu-breadcrumb-item').length > 0).to.be.equal(true);
      });

      it('should render the  breadcrumbs set slot divider', async () => {
            const wrapper = mount({
                  template: `
                  <IVueBreadcrumbs>
                        <IVueIcon slot="divider">forward</IVueIcon>
                        <IVueBreadcrumbsItem>
                              <IVueIcon>home</IVueIcon>
                              Home
                        </IVueBreadcrumbsItem>
                        <IVueBreadcrumbsItem>
                              <IVueIcon>home</IVueIcon>
                              Home
                        </IVueBreadcrumbsItem>
                  </IVueBreadcrumbs>
                  `,
                  components: {
                        IVueBreadcrumbs,
                        IVueBreadcrumbsItem,
                        IVueIcon
                  }
            }, {
                        attachToDocument: true
                  });


            expect(wrapper.classes()).to.contain('ivu-breadcrumb');
            expect(wrapper.element.getElementsByClassName('ivu-breadcrumb--divider').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByClassName('ivu-breadcrumb-item').length > 0).to.be.equal(true);
            expect(wrapper.element.getElementsByClassName('ivu-breadcrumb--divider')[0].children[0].nodeName).to.be.equal('I');
      });
});