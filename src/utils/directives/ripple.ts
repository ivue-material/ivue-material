/**
 * 创建 transform
 *
 * el: HTMLElement, value: string
 */
function transform(el, value) {
    el.style['transform'] = value;
    el.style['webkitTransform'] = value;
}

/**
 * 创建 opacity
 *
 * el: HTMLElement, value: number
 */
function opacity(el, value) {
    el.style['opacity'] = value.toString();
}

/**
 * 是否有 touch 事件
 */
function isTouchEvent(e) {
    return e.constructor.name === 'TouchEvent';
}


function isRippleEnabled(value) {
    return typeof value === 'undefined' || !!value;
}

/**
 * 涟漪显示
 *
 * e: MouseEvent | TouchEvent
 */
function rippleShow(e) {
    const value = {
        center: false,
        class: {}
    };

    const element = e.currentTarget;

    if (!element || !element._ripple || element._ripple.touched) {
        return;
    }

    // 判断是否是手指触摸
    if (isTouchEvent(e)) {
        element._ripple.touched = true;
    }

    // 是否居中
    value.center = element._ripple.centered;

    if (element._ripple.class) {
        value.class = element._ripple.class;
    }

    ripple.show(e, element, value);
}

/**
 * 涟漪隐藏
 *
 * e: Event
 */
function rippleHide(e) {
    const element = e.currentTarget;
    if (!element) {
        return;
    }

    window.setTimeout(() => {
        if (element._ripple) {
            element._ripple.touched = false;
        }
    });

    ripple.hide(element);
}

/**
 * 获取点击的位置
 *
 * e: MouseEvent | TouchEvent, el: HTMLElement, value: RippleOptions = {}
 */
const calculate = (e, el, value) => {
    // 元素的大小及其相对于视口的位置。
    const offset = el.getBoundingClientRect();
    const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
    const localX = target.clientX - offset.left;
    const localY = target.clientY - offset.top;

    let radius = 0;
    let scale = 0.3;

    // 计算圆形大小
    if (el._ripple && el._ripple.circle) {
        scale = 0.15;
        radius = el.clientWidth / 2;
        radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
    }
    else {
        radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
    }

    const centerX = `${(el.clientWidth - (radius * 2)) / 2}px`;
    const centerY = `${(el.clientHeight - (radius * 2)) / 2}px`;

    const x = value.center ? centerX : `${localX - radius}px`;
    const y = value.center ? centerY : `${localY - radius}px`;

    return { radius, scale, x, y, centerX, centerY };
};


/**
 * 涟漪元素
 */
const ripple = {
    /* eslint-disable max-statements */
    // e: MouseEvent | TouchEvent, el: HTMLElement, value: RippleOptions = {}
    show(e, el, value) {
        if (!el._ripple || !el._ripple.enabled) {
            return;
        }

        // 内容
        const container = document.createElement('span');
        // 动画
        const animation = document.createElement('span');

        // 添加节点
        container.appendChild(animation);
        container.className = 'ivue-ripple';

        if (value.class) {
            container.className += ` ${value.class}`;
        }

        // 获取点击位置
        const { radius, scale, x, y, centerX, centerY } = calculate(e, el, value);

        const size = `${radius * 2}px`;

        animation.className = 'ivue-ripple-wave';
        animation.style.width = size;
        animation.style.height = size;

        el.appendChild(container);

        // 获取节点 style 样式
        const computed = window.getComputedStyle(el);

        // 强制把父节点 position 设置为 relative
        if (computed && computed.position === 'static') {
            el.style.position = 'relative';
            el.dataset.previousPosition = 'static';
        }

        animation.classList.add('ivue-ripple-wave-enter');
        animation.classList.add('ivue-ripple-wave-visible');

        transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
        opacity(animation, 0);


        // performance 记录性能
        animation.dataset.activated = String(performance.now());

        setTimeout(() => {
            animation.classList.remove('ivue-ripple-wave--enter');
            // 添加动画
            animation.classList.add('ivue-ripple-wave--in');
            transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
            opacity(animation, 0.25);
        }, 0);
    },
    // 隐藏
    hide(el) {
        if (!el || !el._ripple || !el._ripple.enabled) {
            return;
        }

        const ripples = el.getElementsByClassName('ivue-ripple-wave');

        if (ripples.length === 0) {
            return;
        }

        const animation = ripples[ripples.length - 1];

        if (animation.dataset.isHiding) {
            return;
        }
        else {
            animation.dataset.isHiding = 'true';
        }

        // 从显示到消失的时间
        const diff = performance.now() - Number(animation.dataset.activated)
        const delay = Math.max(250 - diff, 0);

        setTimeout(() => {
            // 结束动画
            animation.classList.remove('ivue-ripple-wave--in');
            animation.classList.add('ivue-ripple-wave--on');
            opacity(animation, 0);

            // 3ms 后删除节点
            setTimeout(() => {
                const ripples = el.getElementsByClassName('ivue-ripple-wave');

                if (ripples.length === 1 && el.dataset.previousPosition) {
                    el.style.position = el.dataset.previousPosition;
                    delete el.dataset.previousPosition;
                }

                animation.parentNode && el.removeChild(animation.parentNode);
            }, 300);
        }, delay);
    }
}


// 更新涟漪效果
function updateRipple(el, binding, wasEnabled) {
    // 是否开启效果
    // value 指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2
    const enabled = isRippleEnabled(binding.value);

    if (!enabled) {
        // 删除节点
        ripple.hide(el);
    }

    el._ripple = el._ripple || {};
    el._ripple.enabled = enabled;

    const value = binding.value || {};

    // 设置各种属性
    if (value.center) {
        el._ripple.centered = true;
    }

    if (value.class) {
        el._ripple.class = binding.value.class;
    }

    if (value.circle) {
        el._ripple.circle = value.circle
    }

    // 注册触发事件
    if (enabled && !wasEnabled) {
        el.addEventListener('touchstart', rippleShow, { passive: true });
        el.addEventListener('touchend', rippleHide, { passive: true });
        el.addEventListener('touchcancel', rippleHide);

        el.addEventListener('mousedown', rippleShow);
        el.addEventListener('mouseup', rippleHide);
        el.addEventListener('mouseleave', rippleHide);

        // Anchor tags can be dragged, causes other hides to fail
        el.addEventListener('dragstart', rippleHide, { passive: true });
    }
    // 删除事件
    else if (!enabled && wasEnabled) {
        removeListeners(el);
    }
}

/**
 * 删除事件
 *
 * el: HTMLElement
 */
function removeListeners(el) {
    el.removeEventListener('mousedown', rippleShow);
    el.removeEventListener('touchstart', rippleHide);
    el.removeEventListener('touchend', rippleHide);
    el.removeEventListener('touchcancel', rippleHide);
    el.removeEventListener('mouseup', rippleHide);
    el.removeEventListener('mouseleave', rippleHide);
    el.removeEventListener('dragstart', rippleHide);
}

// 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
function directive(el, binding, node) {

    updateRipple(el, binding, false);

    // warn if an inline element is used, waiting for el to be in the DOM first
    node.context && node.context.$nextTick(() => {
        const computed = window.getComputedStyle(el);

        if (computed && computed.display === 'inline') {
            const context = node.fnOptions ? [node.fnOptions, node.context] : [node.componentInstance]

            console.warn('v-ripple can only be used on block-level elements', ...context)
        }
    });
}

/**
 * 指令与元素解绑时调用
 *
 * el: HTMLElement
 */
function unmounted(el) {
    delete el._ripple;

    removeListeners(el);
}

/**
 * 所在组件的 VNode 更新时调用
 *
 * el: HTMLElement, binding: VNodeDirective
 */
function updated(el, binding) {
    if (binding.value === binding.oldValue) {
        return;
    }

    const wasEnabled = isRippleEnabled(binding.oldValue);
    updateRipple(el, binding, wasEnabled);
}

export default {
    beforeMount: directive,
    unmounted,
    updated
}
