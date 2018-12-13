import {IVueStepper,IVueStepperStep} from '../../src/components/IVueStepper';
import { mount } from '@vue/test-utils';

describe('IVueList', function () {
      it('should render the vertical IVueStepper', async () => {
            const wrapper = mount({
                  template: `
                  <IVueStepper :currentStep="0"  :direction="'vertical'">
                        <IVueStepperStep title="已完成" content="这里是该步骤的描述信息"></IVueStepperStep>
                        <IVueStepperStep title="进行中" content="这里是该步骤的描述信息" :status="'error'"></IVueStepperStep>
                        <IVueStepperStep title="待进行" content="这里是该步骤的描述信息"></IVueStepperStep>
                        <IVueStepperStep title="待进行" content="这里是该步骤的描述信息"></IVueStepperStep>
                  </IVueStepper>
                  `,
                  components: {
                        IVueStepper,
                        IVueStepperStep
                  }
            }, {
                  });

            
            expect(wrapper.classes()).to.contain('ivue-stepper-vertical');
            expect(wrapper.element.children.length).to.be.equal(4);
      });

      it('should render the horizontal IVueStepper ', async () => {
            const wrapper = mount({
                  template: `
                  <IVueStepper :currentStep="0"  :direction="'horizontal'">
                        <IVueStepperStep title="已完成" content="这里是该步骤的描述信息"></IVueStepperStep>
                        <IVueStepperStep title="进行中" content="这里是该步骤的描述信息" :status="'error'"></IVueStepperStep>
                        <IVueStepperStep title="待进行" content="这里是该步骤的描述信息"></IVueStepperStep>
                        <IVueStepperStep title="待进行" content="这里是该步骤的描述信息"></IVueStepperStep>
                  </IVueStepper>
                  `,
                  components: {
                        IVueStepper,
                        IVueStepperStep
                  }
            }, {
                  });

            
            expect(wrapper.classes()).to.contain('ivue-stepper-horizontal');
            expect(wrapper.element.children.length).to.be.equal(4);
      });
})