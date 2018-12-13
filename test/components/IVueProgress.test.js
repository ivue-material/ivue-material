import {IVueProgressLinear,IVueProgressCircular} from '../../src/components/IVueProgress';

import { mount } from '@vue/test-utils';

describe('IVueProgress', function () {
      it('should render the IVueProgressLinear', async () => {
            const wrapper = mount({
                  template: `
                        <div>
                              <IVueProgressLinear :percent="40" class="red-accent-4" ></IVueProgressLinear>
                              <IVueProgressLinear :percent="40"  status="active" ></IVueProgressLinear>
                              <IVueProgressLinear :percent="65"  status="wrong"></IVueProgressLinear>
                              <IVueProgressLinear :percent="80"  hideText></IVueProgressLinear>
                              <IVueProgressLinear :percent="100"  ><span>成功</span></IVueProgressLinear>
                        </div>
                  `,
                  components: {
                        IVueProgressLinear
                  }
            }, {
                         
                  });


                  expect(wrapper.find('.ivue-progress-linear').classes('ivue-progress-linear-normal')).to.be.equal(true);
                  expect(wrapper.find('.ivue-progress-linear').find('.ivue-progress-linear-bg').attributes('style').indexOf('40') > -1).to.be.equal(true);

                  expect(wrapper.find('.ivue-progress-linear-wrong').classes('ivue-progress-linear-show-info')).to.be.equal(true);
                  expect(wrapper.find('.ivue-progress-linear-success').find('.ivue-progress-linear-text').html().indexOf('成功') > -1).to.be.equal(true);
      });


      it('should render the IVueProgressCircular', async () => {
            const wrapper = mount({
                  template: `
                        <div>
                              <IVueProgressCircular :percent="20" class="red-accent-4"></IVueProgressCircular>
                              <IVueProgressCircular :percent="60" status="wrong">60</IVueProgressCircular>
                              <IVueProgressCircular :percent="100"></IVueProgressCircular>
                              <IVueProgressCircular :percent="20" indeterminate></IVueProgressCircular>
                        </div>
                  `,
                  components: {
                        IVueProgressCircular
                  }
            }, {
                         
                  });

                  expect(wrapper.find('.red-accent-4').find('.ivue-progress-circular-text').html().indexOf('20%') > -1).to.be.equal(true);
                  expect(wrapper.find('.ivue-progress-circular-wrong').find('.ivue-progress-circular-text').html().indexOf('60') > -1).to.be.equal(true);
                  expect(wrapper.find('.ivue-progress-circular-success').find('.ivue-progress-circular-text').html().indexOf('100') > -1).to.be.equal(true);
                  expect(wrapper.find('.ivue-progress-circular-indeterminate').find('.ivue-progress-circular-text').selector).to.be.equal('.ivue-progress-circular-text');
      });
});
