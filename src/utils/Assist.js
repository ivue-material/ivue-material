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
