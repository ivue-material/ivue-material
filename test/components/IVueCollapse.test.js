import IvueCollapse from '../../src/components/ivue-collapse/ivue-collapse';
import IvueCollapsePanel from '../../src/components/ivue-collapse/ivue-collapse-panel';
import { mount } from '@vue/test-utils';


describe('IvueCollapse', function () {
      it('should be rendered name is "0" active', function () {
            const wrapper = mount({
                  template: `
                  <IvueCollapse v-model="active">
                        <IvueCollapsePanel name="0">
                        史蒂夫·乔布斯
                              <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
                        </IvueCollapsePanel>
                  </IvueCollapse>
                  `,
                  data () {
                        return {
                              active: ''
                        }
                  },
                  components: {
                        IvueCollapse,
                        IvueCollapsePanel
                  }
            }, {
                  });


            wrapper.find('.ivue-collapse-panel--header').trigger('click');

            expect(wrapper.vm.active.indexOf('0') > -1).to.be.equal(true);
      });

      it('should be rendered accordion active.length === 1', function () {
            const wrapper = mount({
                  template: `
                  <IvueCollapse v-model="active" accordion>
                        <IvueCollapsePanel name="0">
                        史蒂夫·乔布斯
                              <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
                        </IvueCollapsePanel>
                        <IvueCollapsePanel name="1">
                        史蒂夫·乔布斯
                              <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
                        </IvueCollapsePanel>
                  </IvueCollapse>
                  `,
                  data () {
                        return {
                              active: '0'
                        }
                  },
                  components: {
                        IvueCollapse,
                        IvueCollapsePanel
                  }
            }, {
                  });


            wrapper.findAll('.ivue-collapse-panel--header').wrappers[1].trigger('click');

            expect(wrapper.vm.active.length).to.be.equal(1);
      });

})
