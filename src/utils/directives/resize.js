
// 指令定义
function inserted (el, binding) {
      const callback = binding.value;
      const options = binding.options || { passive: true };

      window.addEventListener('resize', callback, options);

      el._onResize = {
            callback,
            options
      }

      if (!binding.modifiers || !binding.modifiers.quiet) {
            callback();
      }
}

// 指令与元素解绑时调用
function unbind (el) {
      if (!el._onResize) {
            return;
      }

      const { callback, options } = el._onResize;

      window.removeEventListener('resize', callback, options);

      delete el._onResize;
}

export default {
      inserted,
      unbind
}
