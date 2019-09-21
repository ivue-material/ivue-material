import Vue from 'vue';
import { deepCopy } from './assist';

// 创建数组范围
export function createRange (length) {
    return Array.from({ length }, (v, k) => k);
}

// 是否有默认值
export function isDef (val) {
    return val !== undefined && val !== null;
}

// 创建id
export const generateId = () => {
    return Math.floor(Math.random() * 10000);
};

// 判断 ie 浏览器
export const isIE = () => {
    return !Vue.prototype.$isServer && !isNaN(Number(document.documentMode));
};

// 判断 edge 浏览器
export const isEdge = () => {
    return !Vue.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1;
};

// 需要跳过过滤的字符串
export const escapeRegexpString = (value = '') => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

// 获取组件的第一个子节点
export function getFirstComponentChild (children) {
    return children && children.filter(c => c && (c.tag || c.text))[0];
};

// 设置随机字符串
export const getRandomStr = (len = 32) => {
    const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const length = $chars.length;

    let str = '';

    for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * length));
    }

    return str;
}

// set forTableHead to true when convertToRows, false in normal cases like table.vue
export const getAllColumns = (clos, forTableHead = false) => {
    const columns = deepCopy(clos);
    const result = [];

    columns.forEach((column) => {
        // 是否有子节点
        if (column.children) {
            if (forTableHead) {
                result.push(column);
            }

            result.push.apply(result, getAllColumns(column.children, forTableHead));
        }
        else {
            result.push(column);
        }
    });

    return result;
}


// 转换列顺序
export const convertColumnOrder = (columns, fixedType) => {
    let list = [];
    let other = [];

    columns.forEach((col) => {
        if (col.fixed && col.fixed === fixedType) {
            list.push(col);
        }
        else {
            other.push(col);
        }
    });

    return list.concat(other);
}


// 多行表头
export const convertToRows = (fixedType = false, columns) => {
    // 原始列
    let originColumns;
    let maxLevel = 1;

    if (fixedType && fixedType === 'left') {
        originColumns = deepCopy(convertColumnOrder(columns, 'left'));
    }
    else if (fixedType && fixedType === 'right') {
        originColumns = deepCopy(convertColumnOrder(columns, 'right'));
    }
    else {
        originColumns = deepCopy(columns);
    }

    // 树
    const traverse = (column, parent) => {
        if (parent) {
            column.level = parent.level + 1;

            if (maxLevel < column.level) {
                maxLevel = column.level;
            }
        }

        // 是否有子
        if (column.children) {
            let colSpan = 0;

            column.children.forEach((subColumn) => {
                // 递归调用
                traverse(subColumn, column);

                colSpan += subColumn.colSpan;
            });

            column.colSpan = colSpan;
        }
        else {
            column.colSpan = 1;
        }
    }


    originColumns.forEach((column) => {
        column.level = 1;

        traverse(column);
    });

    const rows = [];

    for (let i = 0; i < maxLevel; i++) {
        rows.push([]);
    }

    // 获取所有行
    const allColumns = getAllColumns(originColumns, true);

    allColumns.forEach((column) => {
        if (!column.children) {
            column.rowspan = maxLevel - column.level + 1;
        }
        else {
            column.rowspan = 1;
        }

        rows[column.level - 1].push(column);
    });

    return rows;
}
