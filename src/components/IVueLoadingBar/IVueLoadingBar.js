import IVueLoadingBar from './IVueLoadingBar.vue';
import Vue from 'vue';

IVueLoadingBar.newInstance = (properties) => {
      const _props = properties || {};

      // 创建实例
      const Instance = new Vue({
            data: _props,
            render (h) {
                  return h(IVueLoadingBar, {
                        props: _props
                  })
            }
      });

      const component = Instance.$mount();
      document.body.appendChild(component.$el);
      const loadingBar = Instance.$children[0];

      return {
            update (options) {
                  if ('percent' in options) {
                        loadingBar.percent = options.percent;
                  }
                  if (options.status) {
                        loadingBar.status = options.status;
                  }
                  if ('show' in options) {
                        loadingBar.show = options.show;
                  }
            },
            component: loadingBar,
            destroy () {
                  document.body.removeChild(document.getElementsByClassName('ivue-loading-bar')[0]);
            }
      }
}

export default IVueLoadingBar;