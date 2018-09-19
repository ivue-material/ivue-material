// 判断参数是否是其中之一
export function oneOf (value, validList) {
      for (let i = 0; i < validList.length; i++) {
            if (value === validList[i]) {
                  return true
            }
      }

      return false
}


const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

// 转换驼峰class
function camelCase (name) {
      return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
      }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}
// 获取样式
export function getStyle (element, styleName) {
      if (!element || !styleName) {
            return null;
      }

      styleName = camelCase(styleName);

      if (styleName === 'float') {
            styleName = 'cssFloat'
      }
      try {
            const computed = document.defaultView.getComputedStyle(element, '');

            return element.style[styleName] || computed ? computed[styleName] : null;
      }
      catch (e) {
            return element.style[styleName];
      }




}