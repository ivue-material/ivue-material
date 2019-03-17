<template>
    <div :class="wrapClasses" :style="styles">
        <!-- 下划线 -->
        <div :class="[`${prefixCls}-divider`]">
            <i></i>
        </div>
        <!-- 步骤 -->
        <div :class="[`${prefixCls}-header`]" @click="nextStepper(stepNumber)">
            <div v-ripple="{ center: true }" :class="[`${prefixCls}-header-content`]">
                <!-- 步骤数 还没完成或者没有错误显示-->
                <span
                    v-if="!icon && currentStatus !== 'finish' && currentStatus !== 'error'"
                >{{stepNumber}}</span>
                <!-- 图标 -->
                <i
                    v-else
                    :class="iconClasses"
                >{{icon ? icon : currentStatus === 'finish' ? 'check' : currentStatus === 'error'? 'close': ''}}</i>
            </div>
        </div>
        <!-- 文字 -->
        <div :class="[`${prefixCls}-content`]">
            <div :class="[`${prefixCls}-title`]">{{title}}</div>
            <slot>
                <div :class="[`${prefixCls}-content-slot`]">{{content}}</div>
            </slot>
        </div>
    </div>
</template>

<script>
import { oneOf } from '../../utils/assist';
import ripple from '../../utils/directives/ripple';

const prefixCls = 'ivue-stepper-steps';

export default {
    name: prefixCls,
    directives: {
        ripple
    },
    props: {
        status: {
            validator (value) {
                return oneOf(value, ['wait', 'process', 'finish', 'error']);
            }
        },
        /*
        * 标题
        *
        * @type {String}
        */
        title: {
            type: String,
            default: ''
        },
        /*
        * 内容
        *
        * @type {String}
        */
        content: {
            type: String
        },
        /*
        * 步骤图标
        *
        * @type {String}
        */
        icon: {
            type: String
        },
        /*
        * 当前步骤是否是否可以通过点击进行下一步
        *
        * @type {Boolean}
        */
        editable: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            prefixCls: prefixCls,
            number: 1,
            // 当前状态
            currentStatus: '',
            // 步骤数
            stepNumber: '',
            // 下一个错误
            nextError: false
        }
    },
    created () {
        this.currentStatus = this.status;
    },
    computed: {
        wrapClasses () {
            return [
                `${prefixCls}-item`,
                `${prefixCls}-status-${this.currentStatus}`,
                {
                    [`${prefixCls}-next-error`]: this.nextError
                }
            ]
        },
        iconClasses () {
            return [
                `${prefixCls}-icon`,
                'ivue-icon'
            ]
        },
        styles () {
            return {
                width: `${1 / this.number * 100}%`
            }
        }
    },
    methods: {
        // 下一步
        nextStepper (stepNumber) {
            if (!this.editable) {
                return;
            }

            this.currentStatus = this.status;

            this.$parent.$emit('next-stepper', stepNumber - 1, this.status);
        }
    }
}
</script>
