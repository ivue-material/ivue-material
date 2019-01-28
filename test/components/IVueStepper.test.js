import {IvueStepper,IvueStepperStep} from '../../src/components/ivue-stepper';
import { mount } from '@vue/test-utils';

describe('IvueList', function () {
      it('should render the vertical IvueStepper', async () => {
            const wrapper = mount({
                  template: `
                  <IvueStepper :currentStep="0"  :direction="'vertical'">
                        <IvueStepperStep title="已完成" content="这里是该步骤的描述信息"></IvueStepperStep>
                        <IvueStepperStep title="进行中" content="这里是该步骤的描述信息" :status="'error'"></IvueStepperStep>
                        <IvueStepperStep title="待进行" content="这里是该步骤的描述信息"></IvueStepperStep>
                        <IvueStepperStep title="待进行" content="这里是该步骤的描述信息"></IvueStepperStep>
                  </IvueStepper>
                  `,
                  components: {
                        IvueStepper,
                        IvueStepperStep
                  }
            }, {
                  });

            
            expect(wrapper.classes()).to.contain('ivue-stepper-vertical');
            expect(wrapper.element.children.length).to.be.equal(4);
      });

      it('should render the horizontal IvueStepper ', async () => {
            const wrapper = mount({
                  template: `
                  <IvueStepper :currentStep="0"  :direction="'horizontal'">
                        <IvueStepperStep title="已完成" content="这里是该步骤的描述信息"></IvueStepperStep>
                        <IvueStepperStep title="进行中" content="这里是该步骤的描述信息" :status="'error'"></IvueStepperStep>
                        <IvueStepperStep title="待进行" content="这里是该步骤的描述信息"></IvueStepperStep>
                        <IvueStepperStep title="待进行" content="这里是该步骤的描述信息"></IvueStepperStep>
                  </IvueStepper>
                  `,
                  components: {
                        IvueStepper,
                        IvueStepperStep
                  }
            }, {
                  });

            
            expect(wrapper.classes()).to.contain('ivue-stepper-horizontal');
            expect(wrapper.element.children.length).to.be.equal(4);
      });
})