import IvueListItemContent from './ivue-list-item-content';

export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        rippleDisabled: {
            type: Boolean,
            default: false
        }
    },
    components: {
        IvueListItemContent
    }
}
