import IvueSpin from './ivue-spin.js'

let ivueSpinInstance;

// 获取组件
function getIvueSpinInstance (render = undefined) {
      ivueSpinInstance = ivueSpinInstance || IvueSpin.newInstance({
            render: render
      });

      return ivueSpinInstance
}

function loading (option) {
      const render = ('render' in option) ? option.render : undefined;
      let instance = getIvueSpinInstance(render);

      instance.show(option);
}

IvueSpin.show = function (props = {}) {
      return loading(props);
}

IvueSpin.hide = function () {
      if (!ivueSpinInstance) {
            return false;
      }

      const instance = getIvueSpinInstance();

      instance.remove(() => {
            ivueSpinInstance = null;
      });
}

export default IvueSpin;