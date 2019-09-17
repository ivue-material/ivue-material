import Vue from 'vue';

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const isServer = Vue.prototype.$isServer;

// 转换驼峰class
function camelCase (name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}


// 判断参数是否是其中之一
export function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true
        }
    }

    return false
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

// 判断是否有class
/* istanbul ignore next */
export function hasClass (el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}

// 添加class
/* istanbul ignore next */
export function addClass (el, cls) {
    if (!el) return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        }
        else {
            if (!hasClass(el, clsName)) {
                curClass += ' ' + clsName;
            }
        }
    }

    if (!el.classList) {
        el.className = curClass;
    }
}

// 删除class
/* istanbul ignore next */
export function removeClass (el, cls) {
    if (!el || !cls) return;
    const classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else {
            if (hasClass(el, clsName)) {
                curClass = curClass.replace(' ' + clsName + ' ', ' ');
            }
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}

// 向下查找组件
export function findComponentsDownward (context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) {
            components.push(child)
        }

        // 继续查找嵌套组件
        const foundChilds = findComponentsDownward(child, componentName);

        return components.concat(foundChilds)
    }, [])
}

// 向上查找第一个节点
export function findComponentUpward (context, componentName) {

    // 当前组件的父级
    let parent = context.$parent;
    // 父级名称
    let parentName = parent.$options.name;

    while (parent && (!parentName || componentName.indexOf(parentName) < 0)) {
        parent = parent.$parent;

        if (parent) {
            parentName = parent.$options.name
        }
    }

    return parent
}


export const typeOf = (obj) => {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };

    return map[toString.call(obj)];
}

// 深拷贝
export const deepCopy = (data) => {
    const t = typeOf(data);
    let o;

    if (t === 'array') {
        o = [];
    }
    else if (t === 'object') {
        o = {};
    }
    else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    }
    else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i]);
        }
    }

    return o
}

// 对于隐藏的Modal scrollBar
let cached;
export const getScrollBarSize = (fresh) => {
    // 是否是服务端渲染
    if (isServer) {
        return 0;
    }

    if (fresh || cached === undefined) {
        const inner = document.createElement('div');
        inner.style.width = '100%';
        inner.style.height = '200px';

        const outer = document.createElement('div');
        const outerStyle = outer.style;

        outerStyle.position = 'absolute';
        outerStyle.top = 0;
        outerStyle.left = 0;
        outerStyle.pointerEvents = 'none';
        outerStyle.visibility = 'hidden';
        outerStyle.width = '200px';
        outerStyle.height = '150px';
        outerStyle.overflow = 'hidden';

        outer.appendChild(inner);

        document.body.appendChild(outer);

        const widthContained = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        let widthScroll = inner.offsetWidth;

        if (widthContained === widthScroll) {
            widthScroll = outer.clientWidth;
        }

        document.body.removeChild(outer);

        cached = widthContained - widthScroll;
    }

    return cached;
}
