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
                  _currentStep: 0,
                  _status: this.status
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
            this._currentStep = this.currentStep;
            this._status = this.status;

            this.$on('nextStepper', this.nextStepper);

            this.updateSteps();
      },
      methods: {
            // 更新数据
            updateSteps () {
                  // 初始化子组件props
                  this.updateChildProps(true);
                  // 设置错误步骤
                  this.setNextError();
                  // 更新当前数据
                  this.updateCurrent(true);
            },
            // 更新子组件props
            updateChildProps (isInit) {
                  const childrenLength = this.$children.length;

                  this.$children.forEach((child, index) => {
                        child.stepNumber = index + 1;

                        if (this.direction === 'horizontal') {
                              child.number = childrenLength;
                        }

                        // 如果有status,就初始化
                        if (!(isInit && child.currentStatus)) {
                              // index === 当前步骤
                              if (index === this._currentStep) {
                                    if (this._status !== 'error') {
                                          // 设置进行中状态
                                          child.currentStatus = 'process';
                                    }
                              }
                              // index < 当前步骤 已完成
                              else if (index < this._currentStep) {
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
            },
            // 设置错误步骤
            setNextError () {
                  this.$children.forEach((child, index) => {
                        if (child.currentStatus === 'error' && index !== 0) {
                              this.$children[index - 1].nextError = true;
                        }
                  });
            },
            // 更新当前数据
            updateCurrent (isInit) {
                  if (this._currentStep < 0 || this._currentStep >= this.$children.length) {
                        return;
                  }

                  // 是否初始化
                  if (isInit) {
                        const currentStatus = this.$children[this._currentStep].currentStatus;

                        if (!currentStatus) {
                              this.$children[this._currentStep].currentStatus = this._status;
                        }

                  }
                  else {
                        this.$children[this._currentStep].currentStatus = this._status;
                  }
            },
            nextStepper (stepper, status) {
                  this._currentStep = stepper;

                  if (status) {
                        this._status = status;
                  }
                  else {
                        this._status = 'process';
                  }

                  this.updateChildProps();
                  this.setNextError();
                  this.updateCurrent();
            }
      },
      watch: {
            currentStep (currentStep) {
                  this._currentStep = currentStep;

                  this.updateChildProps();
            },
            status (status) {
                  this._status = status;

                  this.updateCurrent();
            }
      }
}
</script>
