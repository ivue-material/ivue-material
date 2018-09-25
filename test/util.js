import Vue from 'vue';
import iVue from '../src/index';

Vue.use(iVue);

let id = 0;

// 创建节点
const createElm = function () {
  const elm = document.createElement('div');

  elm.id = 'app' + ++id;

  document.body.appendChild(elm);

  return elm;
}


/**
 * 创建一个测试组件实例
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object}  Compo          - 组件对象
 * @param  {Object}  propsData      - props 数据
 * @param  {Boolean=false} mounted  - 是否添加到 DOM 上
 * @return {Object} vm
 */

export const createTest = function (Compo, globals, propsData, mounted = false) {
  if (propsData = true || propsData == false) {
    mounted = propsData;
    propsData = {};
  }

  const elm = createElm();

  // 创建组件实例
  const Constructor = Vue.extend(Compo, '默认');

  return new Constructor({ propsData }).$mount(mounted === false ? null : elm);
}

/**
* 等待组件内部异步进程, when this.$nextTick is not enough
* @param {Function} the 在调用回调之前要验证的条件
* @param {Function} the 条件为true时调用的回调
*/
export const waitForIt = function waitForIt (condition, callback) {
  if (condition()) callback();
  else setTimeout(() => waitForIt(condition, callback), 50);
};

/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
export const triggerEvent = function (elm, name, ...opts) {
  let eventName;

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents';
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent';
  } else {
    eventName = 'HTMLEvents';
  }
  const evt = document.createEvent(eventName);

  evt.initEvent(name, ...opts);
  elm.dispatchEvent
    ? elm.dispatchEvent(evt)
    : elm.fireEvent('on' + name, evt);

  return elm;
};