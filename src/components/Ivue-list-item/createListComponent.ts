
import IvueListItemDefault from './ivue-list-item-default';
import IvueListItemButton from './ivue-list-item-button';
import IvueListItemLink from './ivue-list-item-link';
import IvueListItemExpand from './ivue-list-item-expand';

// 判断是否有扩展
function _hasExpansion(props) {
    return props.hasOwnProperty('ivueExpand') && props.ivueExpand !== false;
}

// 创建列表组件
export default (props) => {

    // 判断扩展
    if (_hasExpansion(props)) {
        return IvueListItemExpand;
    }

    // 判断 disabled 渲染按钮
    if (props.type === 'button') {
        return IvueListItemButton;
    }

    // 判断href 渲染成a 标签
    if (props.type === 'a') {
        return IvueListItemLink;
    }

    return IvueListItemDefault;
}
