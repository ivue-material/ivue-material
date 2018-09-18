import IVueSpin from './IVueSpin.js'

let ivueSpinInstance;

// 获取组件
function getIVueSpinInstance (render = undefined) {
      ivueSpinInstance = ivueSpinInstance || IVueSpin.newInstance({
            render: render
      });

      return ivueSpinInstance
}

function loading (option) {
      const render = ('render' in option) ? option.render : undefined;
      let instance = getIVueSpinInstance(render);

      instance.show(option);
}

IVueSpin.show = function (props = {}) {
      return loading(props);
}

IVueSpin.hide = function () {
      if (!ivueSpinInstance) {
            return false;
      }

      const instance = getIVueSpinInstance();

      instance.remove(() => {
            ivueSpinInstance = null;
      });
}

export default IVueSpin;