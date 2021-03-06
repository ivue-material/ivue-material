
<script lang='ts'>
import { h,defineComponent } from 'vue';

export default defineComponent({
    name: 'ivue-content',
    props: {
        /**
         * 输出标签。例如，当你想创建一个部分而不是div时很有用。
         *
         * @type {String}
         */
        ivueTag: {
            type: String,
            default: 'div'
        }
    },
    // 动态渲染输出
    render () {
        return h(this.ivueTag, {
            class: 'ivue-content',
        }, this.$slots)
    }
})
</script>
