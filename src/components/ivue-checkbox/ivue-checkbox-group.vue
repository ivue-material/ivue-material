<script>
import { findComponentsDownward } from '../../utils/assist.js';

const prefixCls = 'ivue-checkbox-group';

export default {
    name: prefixCls,
    props: {
        /**
         * 选项数组
         *
         * @type {Array}
         */
        value: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data () {
        return {
            /**
             * 当前的value
             *
             * @type {Array}
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
                `${prefixCls}`
            ];
        }
    },
    methods: {
        // 更新 value
        updateValue () {
            this.childrens = findComponentsDownward(this, 'ivue-checkbox');

            // 是否有子
            if (this.childrens) {
                const { value } = this;

                this.childrens.forEach((child) => {
                    child.modelArray = value;

                    // 是否有值
                    child.currentValue = value.indexOf(child.label) >= 0;
                    // 是否是一个组合
                    child.group = true;
                });
            }
        },
        // 改变
        handleChange (data) {
            this.currentValue = data;

            this.$emit('input', data);
            this.$emit('on-change', data);
        }
    },
    watch: {
        value () {
            this.updateValue();
        }
    },
    render (h) {
        return h('div', {
            class: this.classes
        }, [this.$slots.default])
    }
}
</script>
