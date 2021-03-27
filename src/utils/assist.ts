
import {
    extend,
  } from '@vue/shared'

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

// 转换驼峰class
function camelCase(name: string) {
    return name.replace(SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => {
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}


// 判断参数是否是其中之一
export const oneOf = (
    value: string,
    validList: Array<string>
) => {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true
        }
    }

    return false
}

// 获取样式
export const getStyle = (element: any, styleName: any) => {
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

// 合并对象
export function toObject<T>(arr: Array<T>): Record<string, T> {
    const res = {}
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i])
      }
    }
    return res
  }
