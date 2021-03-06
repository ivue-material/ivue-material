import { h, defineComponent } from 'vue';
import IvueListItemContent from './ivue-list-item-content';

export default defineComponent({
    name: 'ivue-list-item-button',
    props: {
        /**
         * 禁用
         *
         * @type {Boolean}
         */
        disabled: {
            type: Boolean,
            default: false
        },
    },
    setup(props: any, { slots }) {
        return () => h('button', {
            type: 'button',
            class: 'ivue-list-item-button',
            disabled: props.disabled
        }, [
            h(IvueListItemContent, {
                rippleDisabled: props.disabled
            }, slots)
        ])
    },
})
