<script>
import IVueListItemDefault from './IVueListItemDefault';

// 判断是否有扩展
function hasExpansion (props) {
      return props.hasOwnProperty('ivueExpand') && props.ivueExpand !== false
}
// 作用域插槽
function resolvescopedSlots (props, children) {
      if (hasExpansion(props)) {
            return {
                  'ivue-expand': () => {
                        return children['ivue-expand'][0];
                  }
            }
      }
}

// 创建列表组件
function createListComponent (props, parent, listeners) {
      console.log(props)

      return IVueListItemDefault
}


export default {
      name: "IVueListItem",
      // 使组件无状态 (没有 data ) 和无实例 (没有 this 上下文)。用一个简单的 render 函数返回虚拟节点使他们更容易渲染。
      functional: true,
      // 组件需要的一切都是通过上下文传递 
      // parent 对父组件的引用
      // props 提供所有 prop 的对象
      // listeners  一个包含了所有在父组件上注册的事件侦听器的对象
      // data 传递给组件的数据对象，作为 createElement 的第二个参数传入组件
      // slots 返回所有插槽的对象的函数
      render (createElement, { parent, props, listeners, data, slots }) {
            let children = slots();
            // 获取列表组件
            let listComponent = createListComponent(props, parent, listeners);
            // 静态样式
            let staticClass = 'ivue-list-item';
            if (data.staticClass) {
                  staticClass += ' ' + data.staticClass;
            }

            return createElement('li', {
                  ...data,
                  staticClass,
                  // 事件
                  on: listeners
            }, [
                        createElement(listComponent, {
                              props,
                              // 作用域插槽格式
                              scopedSlots: resolvescopedSlots(props, children),
                              staticClass: 'ivue-list-item-container ivue-button-clean',
                              on: listeners
                        }, children.default)
                  ]);

      }
}
</script>
