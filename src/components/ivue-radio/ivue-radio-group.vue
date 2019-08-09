<script>
import { findComponentsDownward } from '../../utils/assist.js';

const prefixCls = 'ivue-radio-group';

let seed = 0;
const now = Date.now();
const getUuid = () => `${prefixCls}_${now}_${seed++}`;

export default {
    name: prefixCls,
    props: {
        value: {
            type: [String, Number]
        },
        /**
         * name 属性
         *
         * @type {String}
         */
        name: {
            type: String,
            default: getUuid
        },
        /**
         * 垂直排列
         *
         * @type {Boolean}
         */
        vertical: {
            type: Boolean,
            default: false
        },
    },
    data () {
        return {
            /**
             * 当前的value
             *
             * @type {String, Number}
             */
            currentValue: this.value,
            /**
             * 子组件
             *
             * @type {Array}
             */
            childrens: []
        }
    },
    mounted () {
        this.updateValue();
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-vertical`]: this.vertical
                }
            ];
        }
    },
    methods: {
        // 更新 value
        updateValue () {
            this.childrens = findComponentsDownward(this, 'ivue-radio');

            if (this.childrens) {
                this.childrens.forEach((child) => {
                    child.currentValue = this.currentValue === child.label;
                    // 是否是一个组合
                    child.group = true;
                });
            }
        },
        // 改变
        handleChange (data) {
            this.currentValue = data.value;

            this.updateValue();

            this.$emit('input', data.value);
            this.$emit('on-change', data.value);
        }
    },
    watch: {
        value () {
            if (this.currentValue !== this.value) {
                this.currentValue = this.value;

                this.$nextTick(() => {
                    this.updateValue();
                })
            }
        }
    },
    render (h) {
        return h('div', {
            class: this.classes
        }, [this.$slots.default])
    }
}
</script>
