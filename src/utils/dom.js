import Vue from 'vue';

// 判断是否是服务器端
const isServer = Vue && Vue.prototype.$isServer;

/* istanbul ignore next */
// 注册事件
export const on = (function () {
      if (!isServer && document.addEventListener) {
            return function (element, event, handler) {
                  if (element && event && handler) {
                        element.addEventListener(event, handler, false);
                  }
            }
      }
      else {
            return function (element, event, handler) {
                  if (element && event && handler) {
                        element.attachEvent('on' + event, handler);
                  }
            };
      }
})();

/* istanbul ignore next */
// 销毁事件
export const off = (function () {
      if (!isServer && document.removeEventListener) {
            return function (element, event, handler) {
                  if (element && event) {
                        element.removeEventListener(event, handler, false);
                  }
            };
      }
      else {
            return function (element, event, handler) {
                  if (element && event) {
                        element.detachEvent('off' + event, handler);
                  }
            }
      }
})();
