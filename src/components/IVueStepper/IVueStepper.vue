<template>
      <div :class="classes">
            <slot></slot>
      </div>
</template>

<script>
import { oneOf } from '../../utils/Assist';

const prefixCls = "ivue-stepper";

export default {
      name: "IVueStepper",
      props: {
            /*
            * 当前步骤
            * 
            * @type {Number}
            */
            currentStep: {
                  type: Number,
                  default: 0
            },
            /*
            * 步骤条方向
            * 
            * @default {horizontal}
            */
            direction: {
                  validator (value) {
                        return oneOf(value, ['horizontal', 'vertical']);
                  },
                  default: 'horizontal'
            },
            /*
            * 步骤状态
            * 
            * @type {String}
            */
            status: {
                  validator (value) {
                        return oneOf(value, ['wait', 'process', 'finish', 'error']);
                  },
                  default: 'process'
            }
      },
      data () {
            return {
                  prefixCls: prefixCls
            }
      },
      computed: {
            classes () {
                  return [
                        `${prefixCls}`,
                        `${prefixCls}-${this.direction}`
                  ]
            }
      },
      mounted () {
            this.updateSteps();
      },
      methods: {
            // 更新数据
            updateSteps () {
                  // 初始化子组件props
                  this.updateChildProps(true);
            },
            // 更新子组件props
            updateChildProps (isInt) {
                  const childrenLength = this.$children.length;

                  this.$children.forEach((child, index) => {
                        child.stepNumber = index + 1;

                        if (this.direction === 'horizontal') {
                              child.number = childrenLength;
                        }

                        // 如果有status,就初始化
                        if (!(isInt && child.currentStatus)) {
                              // index === 当前步骤
                              if (index === this.currentStep) {
                                    if (this.status !== 'error') {
                                          // 设置进行中状态
                                          child.currentStatus = 'process';
                                    }
                              }
                              // index < 当前步骤 已完成
                              else if (index < this.currentStep) {
                                    child.currentStatus = 'finish';
                              }
                              // index > 当前步骤 待进行
                              else {
                                    child.currentStatus = 'wait';
                              }
                        }

                        if (child.currentStatus !== 'error' && index != 0) {
                              this.$children[index - 1].nextError = false;
                        }
                  });
            }
      }
}
</script>
