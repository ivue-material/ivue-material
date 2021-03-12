<script lang='ts'>
import {
    defineComponent,
    h,
    reactive,
    computed,
    withDirectives,
    resolveDirective
} from 'vue';

import IvueButtonContent from "./content.vue";
import Colorable from '../../utils/mixins/colorable';
import ripple from '../../utils/directives/ripple';

const prefixCls = 'ivue-button';

export default defineComponent({
    name: prefixCls,
    mixins: [
        Colorable,
    ],
    directives: {
        ripple
    },
    emits: ['click'],
    props: {
        /**
         * 在按钮上创建一个锚点。在这种情况下，生成的标签将是 a
         *
         * @type {String}
         */
        href: {
            type: String,
            default: null
        },
        /**
         * 将类型应用于按钮 - 它不会影响链接
         *
         * @type {String}
         */
        type: {
            type: String,
            default: 'button'
        },
        /**
         * 禁用该按钮并阻止其操作
         *
         * @type {Boolean}
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * 激活涟漪效果
         *
         * @type {Boolean}
         */
        ripple: {
            type: Boolean,
            default: true
        },
        /**
         * 是否扁平按钮
         *
         * @type {Boolean}
         */
        flat: Boolean,
        /**
         * 凹陷的按钮依然保持其背景色，但没有框阴影
         *
         * @type {Boolean}
         */
        depressed: Boolean,
        /**
         * 圆形图标
         *
         * @type {Boolean}
         */
        icon: Boolean,
        /**
         * 轮廓按钮从当前色彩应用继承他们的边框颜色。
         *
         * @type {Boolean}
         */
        outline: Boolean,
        /**
         * 当使用中心选项时，纹波将始终来自目标的中心。
         *
         * @type {Boolean}
         */
        center: Boolean
    },
    // 组合式 API
    setup(props, { emit }) {
        // data
        const data = reactive<{
            rippleActive: boolean
            isActive: boolean
            mobile: boolean
        }>({
            /**
             * 波纹效果激活
             *
             * @type {Boolean}
             */
            rippleActive: false,
            /**
             * 按钮是否激活状态
             *
             * @type {Boolean}
             */
            isActive: false,
            /**
             * 是否是移动端
             *
             * @type {Boolean}
             */
            mobile: false
        });

        // computed
        // 是否显示涟漪效果
        const rippleWorks = computed(() => {
            return !props.disabled;
        });

        // 判断按钮是否激活
        const activeButton = computed(() => {
            if (data.isActive) {
                return `${prefixCls}--active`;
            }
        });

        // 按钮样式
        const btnClasses = computed(() => {
            return {
                [`${prefixCls}--raised`]: !props.flat,
                [`${prefixCls}--flat`]: props.flat,
                [`${prefixCls}--depressed`]: (props.depressed && !props.flat) || props.outline,
                [`${prefixCls}--icon`]: props.icon,
                [`${prefixCls}--outline`]: props.outline
            }
        });

        // 涟漪效果
        const computedRipple = computed(() => {
            if (props.ripple && props.center) {
                return {
                    center: true
                }
            }
            else if (props.ripple && !props.disabled) {
                return props.ripple;
            }

            return false;
        });


        return {
            // data
            data,
            // computed
            rippleWorks,
            activeButton,
            btnClasses,
            computedRipple
        }
    },
    mounted() {
        if (this.buttonGroup) {
            this.buttonGroup.register(this)
        }
    },
    beforeUnmount() {
        if (this.buttonGroup) {
            this.buttonGroup.unregister(this)
        }
    },
    render() {
        let _tag = 'button';

        const buttonContent = h(IvueButtonContent, {}, this.$slots.default);

        // 按钮属性
        let buttonAttrs: any = {
            class: {
                [`${prefixCls}`]: true,
                'isMobile': this.data.mobile,
                'ivue-button--active': this.data.isActive,
                ...this.btnClasses
            },
            href: this.href,
            type: !this.href && (this.type || 'button'),
            onTouchstart: (event) => {
                // 是否显示涟漪效果
                if (this.rippleWorks) {
                    this.data.rippleActive = event;
                }

                this.mobile = true;
            },
            onTouchmove: (event) => {
                // 是否显示涟漪效果
                if (this.rippleWorks) {
                    this.data.rippleActive = event;
                }
            },
            onClick: (event) => {
                // 是否显示涟漪效果
                if (this.rippleWorks) {
                    this.data.rippleActive = event;
                }

                this.$emit('click', this.data.rippleActive);
            }
        }

        if (this.disabled) {
            buttonAttrs.disabled = this.disabled
        }

        // a 标签
        if (this.href) {
            _tag = 'a'
        }

        // 设置颜色
        const setColor = (!this.outline && !this.flat) ? this.setBackgroundColor : this.setTextColor;

        // 解析指令
        const rippleDirective = resolveDirective('ripple');

        return withDirectives(h(_tag, setColor(this.color, buttonAttrs), [buttonContent]), [
            [rippleDirective, this.computedRipple]
        ])
    }
})
</script>
