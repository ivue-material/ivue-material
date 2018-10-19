<template>
      <div>
            <IVueStepper :currentStep="0"  :direction="'vertical'">
                  <IVueStepperStep title="已完成" content="这里是该步骤的描述信息"></IVueStepperStep>
                  <IVueStepperStep title="进行中" content="这里是该步骤的描述信息" :status="'error'"></IVueStepperStep>
                  <IVueStepperStep title="待进行" content="这里是该步骤的描述信息"></IVueStepperStep>
                  <IVueStepperStep title="待进行" content="这里是该步骤的描述信息"></IVueStepperStep>
            </IVueStepper>


            <IVueStepper :currentStep="current" >
                  <IVueStepperStep title="步骤1" icon="account_circle" editable></IVueStepperStep>
                  <IVueStepperStep title="步骤2" editable :status="'error'"></IVueStepperStep>
                  <IVueStepperStep title="步骤3" editable></IVueStepperStep>
                  <IVueStepperStep title="步骤4" editable></IVueStepperStep>
            </IVueStepper>
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

