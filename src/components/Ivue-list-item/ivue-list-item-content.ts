import { h, withDirectives, resolveDirective, defineComponent } from 'vue';
import ripple from '../../utils/directives/ripple';

export default defineComponent({
    name: 'ivue-list-item-content',
    directives: {
        ripple
    },
    props: {
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
    setup(props, { slots }) {
        // 解析指令
        const rippleDirective = resolveDirective('ripple');

        return () => withDirectives(
            h('div', { class: 'ivue-list-item-content' }, slots),
            [
                [rippleDirective, !props.rippleDisabled]
            ])
    },
})
