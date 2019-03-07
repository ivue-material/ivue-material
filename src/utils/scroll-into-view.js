import Vue from 'vue';

export default function scrollIntoView (container, selected) {
    if (Vue.prototype.$isServer) return;

    // 判断是否有需要滚动到该位置的 dom
    if (!selected) {
        container.scrollTop = 0;

        return;
    }

    const offsetParents = [];
    // 是一个对象引用，当前元素相对于该对象偏移
    // parentObj = element.offsetParent;
    let pointer = selected.offsetParent;

    while (pointer && container !== pointer && container.contains(pointer)) {
        offsetParents.push(pointer);
        pointer = pointer.offsetParent;
    }

    // 距离顶部偏移位置
    const top = selected.offsetTop + offsetParents.reduce((prev, curr) => (prev + curr.offsetTop), 0);
    // 距离底部偏移位置
    const bottom = top + selected.offsetHeight;
    // 顶部到视口可见内容（的顶部）的距离
    const viewRectTop = container.scrollTop;
    // 顶部到视口底部
    const viewRectBottom = viewRectTop + container.clientHeight;

    // 设置滚动位置
    if (top < viewRectTop) {
        container.scrollTop = top;
    }
    else if (bottom > viewRectBottom) {
        container.scrollTop = bottom - container.clientHeight;
    }
}
