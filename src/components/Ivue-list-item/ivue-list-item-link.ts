import { h, defineComponent } from 'vue';
import IvueListItemContent from './ivue-list-item-content';

const prefixCls = 'ivue-list-item-link';

export default defineComponent({
    name: prefixCls,
    props: {
        download: {
            type: String,
            default: null
        },
        href: {
            type: String,
            default: null
        },
        hreflang: {
            type: String,
            default: null
        },
        ping: {
            type: String,
            default: null
        },
        rel: {
            type: String,
            default: null
        },
        target: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: null
        },
        /**
         * 禁用涟漪
         *
         * @type {Boolean}
         */
        rippleDisabled: {
            type: Boolean,
            default: false
        }
    },
    setup(props: any, { slots, attrs }) {
        return () => h('a', {
            class: prefixCls,
            ...props,
            ...attrs
        }, [
            h(IvueListItemContent, {
                rippleDisabled: props.rippleDisabled
            }, slots)
        ])
    },
})
