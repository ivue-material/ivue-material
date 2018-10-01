export default {
      methods: {
            /*
            * 把发送事件到指定组件上
            * 
            * @type {String,String,Object}
            * 
            * @params {
            * componentName 需要寻找的组件的名称
            * 
            * eventName 需要发送的事件
            * 
            * params 事件带上的参数
            * }
            */
            dispatch (componentName, eventName, params) {
                  // 获取父级组件
                  let parent = this.$parent || this.root;
                  // 获取父级组件名称
                  let parentName = parent.$options.name;

                  // 找到与 componentName 相匹配的 组件
                  while (parent && (!parentName || parentName !== componentName)) {
                        parent = parent.$parent;

                        if (parent) {
                              parentName = parent.$options.name;
                        }
                  }

                  // 然后把事件发送到父级事件上
                  if (parent) {
                        parent.$emit.apply(parent, [eventName].concat(params));
                  }

            }
      }
}