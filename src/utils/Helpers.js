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
