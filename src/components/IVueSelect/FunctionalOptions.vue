<script>
const returnArrayFn = () => [];

export default {
      props: {
            /*
            * 需要渲染的选项
            * 
            * @type {Array}
            */
            options: {
                  type: Array,
                  default: returnArrayFn
            },
            /*
            * 插槽选项
            * 
            * @type {Array}
            */
            slotOption: {
                  type: Array,
                  default: returnArrayFn
            },
            /*
            * 更新插槽选项方法
            * 
            * @type {Function}
            */
            slotUpdateHook: {
                  type: Function,
                  default: () => { }
            }
      },
      // 开启函数组件
      functional: true,
      render (h, { props, parent }) {
            // 如果选项不等于父级插槽的值得话就查找相等的选项
            if (props.slotOption !== parent.$slots.default) {
                  props.slotUpdateHook();
            }

            return props.options;
      }
}
</script>

