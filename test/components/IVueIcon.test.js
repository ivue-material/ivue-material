import IvueIcon from '../../src/components/IvueIcon';
import { mount } from '@vue/test-utils';
import testSvg from './test.svg';

describe('IvueIcon', function () {
      it('should accept icon as ligature', function () {
            const wrapper = mount({
                  template: `
                  <div>
                        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

                        <IvueIcon>menu</IvueIcon>
                  </div>
                  `,
                  components: {
                        IvueIcon
                  }
            }, {
                  });

            expect(wrapper.element.children[1].className.indexOf('ivue-icon-font') >= 0).to.be.equal(true);
            expect(wrapper.text()).to.be.equal('menu');
      });


      it('should render a external svg icon', function () {

            const wrapper = mount({
                  template: `
                        <IvueIcon :svgSrc="testSvg"></IvueIcon>
                  `,
                  data () {
                        return {
                              testSvg: testSvg
                        }
                  },
                  components: {
                        IvueIcon
                  }
            }, {
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