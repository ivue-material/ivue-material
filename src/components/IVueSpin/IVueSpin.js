import Vue from 'vue';
import IVueSpin from './IVueSpin.vue';

IVueSpin.newInstance = (properties) => {
      const _props = properties || {};

      const Instance = new Vue({
            data: Object.assign({}, _props, {}),
            render (h) {
                  let vnode = '';

                  if (this.render) {
                        vnode = h(IVueSpin, {
                              props: {
                                    fix: true,
                                    fullscreen: true
                              }
                        }, [this.render(h)]);
                  }
                  else {
                        vnode = h(IVueSpin, {
                              props: {
                                    fix: true,
                                    size: 'large',
                                    fullscreen: true
                              }
                        });
                  }

                  return h('div', {
                        'class': 'ivue-spin-fullscreen ivue-spin-fullscreen-wrapper'
                  }, [vnode]);
            }
      });

      // 注册组件
      const component = Instance.$mount();
      document.body.appendChild(component.$el);
      const ivueSpin = Instance.$children[0];

      return {
            show () {
                  ivueSpin.visible = true;
            },
            // 删除组件
            remove (cb) {
                  ivueSpin.visible = false;
                  setTimeout(() => {
                        ivueSpin.$parent.$destroy();
                        if (document.getElementsByClassName('ivue-spin-fullscreen')[0] !== undefined) {
                              document.body.removeChild(document.getElementsByClassName('ivue-spin-fullscreen')[0]);
                        }
                        cb();
                  }, 500);
            },
            component: ivueSpin
      }

}

export default IVueSpin;