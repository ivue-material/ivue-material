<script>
import IvueListItemDefault from './ivue-list-item-default';
import IvueListItemButton from './ivue-list-item-button';
import IvueListItemLink from './ivue-list-item-link';
import IvueListItemRouter from './ivue-list-item-router';
import IvueListItemExpand from './ivue-list-item-expand';

import InteractionEvents from '../../utils/interaction-events';

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

// 判断是否有事件渲染按钮
function shouldRenderButtonWithListener (listeners) {
      // 获取事件名称
      let listenerNames = Object.keys(listeners);
      // 是否渲染
      let shouldRender = false;

      listenerNames.forEach(listener => {
            // includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
            if (InteractionEvents.includes(listener)) {
                  shouldRender = true;
            }
      });

      return shouldRender;
}


// 判断是否是route link
function isRouterLink (parent, props) {
      return parent && parent.$router && props.to;
}

// 判断是否有扩展
function hasExpansion (props) {
      return props.hasOwnProperty('ivueExpand') && props.ivueExpand !== false;
}


// 创建列表组件
function createListComponent (props, parent, listeners) {
      // 判断扩展
      if (hasExpansion(props)) {
            return IvueListItemExpand;
      }

      // 判断 disabled 渲染按钮
      if (props.disabled) {
            return IvueListItemButton;
      }

      // 通过判断事件决定是否渲染成按钮
      if (shouldRenderButtonWithListener(listeners)) {
            return IvueListItemButton;
      }

      // 判断是否是 router link 渲染成 router-link
      if (isRouterLink(parent, props)) {
           
            delete IvueListItemRouter.props.href;
            
            return IvueListItemRouter;
      }

      // 判断href 渲染成a 标签
      if (props.href) {
            return IvueListItemLink;
      }

      return IvueListItemDefault;
}

const prefixCls = 'ivue-list-item';

export default {
      name: prefixCls,
      // 使组件无状态 (没有 data ) 和无实例 (没有 this 上下文)。用一个简单的 render 函数返回虚拟节点使他们更容易渲染。
      functional: true,
      // 组件需要的一切都是通过上下文传递 
      // parent 对父组件的引用
      // props 提供所有 prop 的对象
      // listeners  一个包含了所有在父组件上注册的事件侦听器的对象
      // data 传递给组件的数据对象，作为 createElement 的第二个参数传入组件
      // slots 返回所有插槽的对象的函数
      render (createElement, { parent, props, listeners, data, slots}) {
            let children = slots();
            // 获取列表组件
            let listComponent = createListComponent(props, parent, listeners);
            // 静态样式
            let staticClass = prefixCls;
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
