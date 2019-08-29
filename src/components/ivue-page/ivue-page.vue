<script>
const prefixCls = 'ivue-page';

export default {
    name: prefixCls,
    props: {
        /**
         * 数据总数
         *
         * @type {Number}
         */
        total: {
            type: Number,
            default: 0
        },
        /**
         * v-model
         *
         * @type {Number}
         */
        value: {
            type: Number,
            default: 0
        }
    },
    computed: {
        // 外层样式
        wrapperClass () {
            return [
                prefixCls
            ]
        },
        // 计算选项
        items () {
            const { total } = this;

            const even = 0 % 2 === 0 ? 1 : 0;
            const left = 0;
            const right = total - left + 1 + even;

            console.log(right)
        }
    },
    methods: {
        // 渲染选项
        genItems (h) {

            this.items
        }
    },
    render (h) {
        const { wrapperClass, genItems } = this;



        return h('ul', {
            class: wrapperClass
        }, [
                genItems(h)
            ]);
    }
}
</script>
