<template>
      <div>
            <IvueStepper :currentStep="0"  :direction="'vertical'">
                  <IvueStepperStep title="已完成" content="这里是该步骤的描述信息"></IvueStepperStep>
                  <IvueStepperStep title="进行中" content="这里是该步骤的描述信息" :status="'error'"></IvueStepperStep>
                  <IvueStepperStep title="待进行" content="这里是该步骤的描述信息"></IvueStepperStep>
                  <IvueStepperStep title="待进行" content="这里是该步骤的描述信息"></IvueStepperStep>
            </IvueStepper>


            <IvueStepper :currentStep="current" >
                  <IvueStepperStep title="步骤1" icon="account_circle" editable></IvueStepperStep>
                  <IvueStepperStep title="步骤2" editable :status="'error'"></IvueStepperStep>
                  <IvueStepperStep title="步骤3" editable></IvueStepperStep>
                  <IvueStepperStep title="步骤4" editable></IvueStepperStep>
            </IvueStepper>
            <button @click="next">Next step</button>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  current: 0
            }
      },
      methods: {
            next () {
                  if (this.current == 3) {
                        this.current = 0;
                  } else {
                        this.current += 1;
                  }
            }
      }
}
</script>

