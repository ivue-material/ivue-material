<script>
import Colorable from '../../utils/mixins/colorable';
import IvueIcon from '../ivue-icon';
import { oneOf } from '../../utils/assist';

const prefixCls = 'ivue-avatar';

export default {
    name: prefixCls,
    mixins: [Colorable],
    props: {
        /**
         * 类型
         *
         * @type {String}
         */
        shape: {
            validator (value) {
                return oneOf(value, ['circle', 'square']);
            },
            default: 'circle'
        },
        /**
         * 大小
         *
         * @type {Number,String}
         */
        size: {
            type: [Number, String],
            default: '32'
        },
        /**
         * 链接
         *
         * @type {String}
         */
        src: {
            type: String,
            default: ''
        },
        /**
         * 图标
         *
         * @type {String}
         */
        icon: {
            type: String,
            default: ''
        },
        /**
         * 图标样式
         *
         * @type {String}
         */
        iconClass: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            /**
             * 是否显示slot
             *
             * @type {Boolean}
             */
            isSlotShow: false,
            /**
             * slot缩放大小
             *
             * @type {Number}
             */
            slotScale: 1,
            /**
             * slot宽度
             *
             * @type {String}
             */
            slotWidth: 0
        }
    },
    mounted () {
        // 计算文字缩放比例
        this.setScale();
    },
    computed: {
        classes () {
            return {
                [`${prefixCls}`]: true,
                [`${prefixCls}-${this.shape}`]: true
            }
        },
        // slot样式
        slotStyle () {
            let style = {};

            if (this.isSlotShow) {
                style = {
                    position: 'absolute',
                    msTransform: `scale(${this.slotScale})`,
                    WebkitTransform: `scale(${this.slotScale})`,
                    transform: `scale(${this.slotScale})`
                }
            }

            return style;
        }
    },
    methods: {
        // 文字缩放
        setScale () {
            this.isSlotShow = !this.src && !this.icon;

            if (this.$refs.children) {
                // 获取slot宽度
                this.slotWidth = this.$refs.children.offsetWidth;
                // 获取父级宽度
                const fatherWidth = this.$el.getBoundingClientRect().width;
                // 为每一侧增加4px,获得更好的性能
                if (fatherWidth - 8 < this.slotWidth) {
                    this.slotScale = (fatherWidth - 8) / this.slotWidth;
                }
                else {
                    this.slotScale = 1;
                }
            }
        },
        // 渲染图像
        genImg (h) {
            return h('img', {
                staticClass: `${prefixCls}-img`,
                attrs: {
                    src: this.src
                }
            });
        },
        // 渲染图标
        genIcon (h) {
            return h(IvueIcon, {
                class: this.iconClass,
            }, [this.icon]);
        },
        // 渲染slot
        genSlot (h) {
            return h('span', {
                staticClass: `${prefixCls}-text`,
                style: this.slotStyle,
                ref: 'children'
            }, [this.$slots.default]);
        }
    },
    updated () {
        this.setScale();
    },
    components: {
        IvueIcon
    },
    render (h) {
        const {
            setBackgroundColor,
            color,
            size,
            src,
            icon,
            genImg,
            genIcon,
            genSlot
        } = this;

        const regexp = new RegExp(/[a-zA-Z]/g);

        // 是否有单位
        const isUnit = regexp.test(size);

        const _size = !isUnit ? `${size}px` : size;

        // 样式
        const style = {
            height: _size,
            width: _size,
            lineHeight: _size,
        };

        let content;

        // 内容
        if (src) {
            content = genImg(h);
        }

        if (icon) {
            content = genIcon(h);
        }

        return h('div', setBackgroundColor(color, {
            class: this.classes,
            style: style
        }), [
                content || genSlot(h)
            ]);
    }
}
</script>

<style lang="scss" scoped>
</style>
