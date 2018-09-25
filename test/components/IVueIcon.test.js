import IVueIcon from '../../src/components/IVueIcon';
import { mount, createLocalVue } from '@vue/test-utils';
import testSvg from './test.svg';

describe('IVueIcon', function () {
      it('should accept icon as ligature', function () {
            const wrapper = mount({
                  template: `
                  <div>
                        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

                        <IVueIcon>menu</IVueIcon>
                  </div>
                  `,
                  components: {
                        IVueIcon
                  }
            }, {
                        attachToDocument: true
                  });

            expect(wrapper.element.children[1].className.indexOf('ivue-icon-font') >= 0).to.be.equal(true);
            expect(wrapper.text()).to.be.equal('menu');
      });


      it('should render a external svg icon', function () {

            const wrapper = mount({
                  template: `
                        <IVueIcon :svgSrc="testSvg"></IVueIcon>
                  `,
                  data () {
                        return {
                              testSvg: testSvg
                        }
                  },
                  components: {
                        IVueIcon
                  }
            }, {
                        attachToDocument: true,
                        propsData: {
                              testSvg: testSvg
                        }
                  });

            expect(wrapper.classes()).to.contain('ivue-icon-image');

      
            setTimeout(() => {
                  expect(wrapper.findAll('svg').length).to.be.at.least(1);
            }, 0)


      });
});