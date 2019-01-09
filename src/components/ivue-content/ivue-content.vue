<script>
export default {
      name: 'ivue-content',
      props: {
            /*
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
      render (createElement) {
            return createElement(this.ivueTag, {
                  staticClass: 'ivue-content',
                  attrs: this.$attrs,
                  on: this.$listeners
            }, this.$slots.default)
      }
}
</script>

