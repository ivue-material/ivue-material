<script>
import { inject as registrableInject } from '../../utils/mixins/registrable';
import Colorable from '../../utils/mixins/colorable';
import ripple from '../../utils/directives/ripple';

const prefixCls = 'ivue-tabs-tab';

export default {
    name: 'ivue-tab',
    mixins: [
        registrableInject('tabNavList', 'ivue-tab', 'ivue-tabs'),
        Colorable
    ],
    directives: {
        ripple
    },
    inject: ['tabNavClick'],
    props: {
        /*
        * 是否禁用当前项
        *
        * @type{Boolean}
        */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
        * 是否禁用涟漪效果
        *
        * @type{Boolean}
        */
        rippleDisabled: {
            type: Boolean,
            default: false
        },
        /**
        * 是否居中涟漪效果
        *
        * @type{Boolean}
        */
        rippleCentered: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            prefixCls: prefixCls,
            isActive: false,
            key: this.$vnode.data.key || this._uid,
            name: null
        }
    },
    mounted () {
        this.name = this.$vnode.data.key || this.$el.textContent;
        // 更新tab导航
        this.tabNavList.register(this);
    },
    computed: {
        wrapClass () {
            return [
                {
                    [`${prefixCls}-disabled`]: this.disabled,
                    [`${prefixCls}-active`]: this.isActive
                }
            ]
        },
        computedRipple () {
            if (this.rippleCentered) {
                return {
                    center: true
                }
            }
            else if (this.rippleDisabled) {
                return false;
            }

            return true;
        }
    },
    methods: {
        // 切换激活状态
        toggle (action) {
            this.isActive = (action === this);
        },
        // 点击当前项
        handleChange () {
            this.tabNavClick(this);
        }
    },
    // 实例销毁之前调用
    beforeDestroy () {
        this.tabNavList.unregister(this);
    },
    render (h) {
        return h('div', this.setTextColor(this.color, {
            staticClass: prefixCls,
            class: this.wrapClass,
            ref: 'tab',
            directives: [
                {
                    name: 'ripple',
                    value: this.computedRipple
                }
            ],
            on: {
                click: this.handleChange
            },
            nativeOn: {
                click: this.handleChange
            }
        }), this.$slots.default)
    }
}
</script>
