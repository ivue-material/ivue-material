import IVueNotification from './IVueNotification.vue';
import Vue from 'vue';

// 创建新实例
IVueNotification.newInstance = (property) => {
      const _props = property || {};

      const Instance = new Vue({
            render (h) {
                  return h(IVueNotification, {
                        props: _props
                  });
            }
      });

      const component = Instance.$mount();
      document.body.appendChild(component.$el);
      const ivueNotification = Instance.$children[0];

      return {
            notice (props) {
                  ivueNotification.add(props);
            },
            remove (name) {
                  ivueNotification.close(name);
            },
            destroy (element) {
                  ivueNotification.closeAll();

                  setTimeout(() => {
                        document.body.removeChild(document.getElementsByClassName(element)[0]);
                  },500);
            },
            component: ivueNotification
      }


}



export default IVueNotification;