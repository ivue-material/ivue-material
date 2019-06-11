import Vue from 'vue';

// 创建数组范围
export function createRange (length) {
    return Array.from({ length }, (v, k) => k);
}

// 是否有默认值
export function isDef (val) {
    return val !== undefined && val !== null;
}

// 创建id
export const generateId = function () {
    return Math.floor(Math.random() * 10000);
};

// 判断 ie 浏览器
export const isIE = function () {
    return !Vue.prototype.$isServer && !isNaN(Number(document.documentMode));
};

// 判断 edge 浏览器
export const isEdge = function () {
    return !Vue.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1;
};

// 需要跳过过滤的字符串
export const escapeRegexpString = (value = '') => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

// 获取组件的第一个子节点
export function getFirstComponentChild (children) {
    return children && children.filter(c => c && (c.tag || c.text))[0];
};
