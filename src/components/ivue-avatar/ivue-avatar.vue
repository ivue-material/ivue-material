<script>
import Colorable from '../../utils/mixins/colorable';

const prefixCls = 'ivue-avatar';

export default {
    name: prefixCls,
    mixins: [Colorable],
    props: {
        /**
         * 大小
         *
         * @type {Number,String}
         */
        size: {
            type: [Number, String],
            default: '32'
        }
    },
    computed: {
        classes () {
            return {
                [`${prefixCls}`]: true
            }
        }
    },
    render (h) {
        const { setBackgroundColor, color, size } = this;

        const regexp = new RegExp(/[a-zA-Z]/g);

        // 是否有单位
        const isUnit = regexp.test(size);

        const _size = !isUnit ? `${size}px` : size;

        const style = {
            height: _size,
            width: _size
        };

        return h('div', setBackgroundColor(color, {
            class: this.classes,
            style: style
        }), [

            ]);
    }
}
</script>

<style lang="scss" scoped>
</style>
