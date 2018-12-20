import {IvueProgressLinear,IvueProgressCircular} from '../../src/components/IvueProgress';

import { mount } from '@vue/test-utils';

describe('IvueProgress', function () {
      it('should render the IvueProgressLinear', async () => {
            const wrapper = mount({
                  template: `
                        <div>
                              <IvueProgressLinear :percent="40" class="red-accent-4" ></IvueProgressLinear>
                              <IvueProgressLinear :percent="40"  status="active" ></IvueProgressLinear>
                              <IvueProgressLinear :percent="65"  status="wrong"></IvueProgressLinear>
                              <IvueProgressLinear :percent="80"  hideText></IvueProgressLinear>
                              <IvueProgressLinear :percent="100"  ><span>成功</span></IvueProgressLinear>
                        </div>
                  `,
                  components: {
                        IvueProgressLinear
                  }
            }, {
                         
                  });


                  expect(wrapper.find('.ivue-progress-linear').classes('ivue-progress-linear-normal')).to.be.equal(true);
                  expect(wrapper.find('.ivue-progress-linear').find('.ivue-progress-linear-bg').attributes('style').indexOf('40') > -1).to.be.equal(true);

                  expect(wrapper.find('.ivue-progress-linear-wrong').classes('ivue-progress-linear-show-info')).to.be.equal(true);
                  expect(wrapper.find('.ivue-progress-linear-success').find('.ivue-progress-linear-text').html().indexOf('成功') > -1).to.be.equal(true);
      });


      it('should render the IvueProgressCircular', async () => {
            const wrapper = mount({
                  template: `
                        <div>
                              <IvueProgressCircular :percent="20" class="red-accent-4"></IvueProgressCircular>
                              <IvueProgressCircular :percent="60" status="wrong">60</IvueProgressCircular>
                              <IvueProgressCircular :percent="100"></IvueProgressCircular>
                              <IvueProgressCircular :percent="20" indeterminate></IvueProgressCircular>
                        </div>
                  `,
                  components: {
                        IvueProgressCircular
                  }
            }, {
                         
                  });

                  expect(wrapper.find('.red-accent-4').find('.ivue-progress-circular-text').html().indexOf('20%') > -1).to.be.equal(true);
                  expect(wrapper.find('.ivue-progress-circular-wrong').find('.ivue-progress-circular-text').html().indexOf('60') > -1).to.be.equal(true);
                  expect(wrapper.find('.ivue-progress-circular-success').find('.ivue-progress-circular-text').html().indexOf('100') > -1).to.be.equal(true);
                  expect(wrapper.find('.ivue-progress-circular-indeterminate').find('.ivue-progress-circular-text').selector).to.be.equal('.ivue-progress-circular-text');
      });
});
