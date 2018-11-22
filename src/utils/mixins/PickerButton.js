export default {
      methods: {
            genPickerButton (prop, value, content, readonly = false, staticClass = '') {
                  // 判读属性是否激活
                  const active = this[prop] === value;

                  // 发送事件
                  const click = (event) => {
                        event.stopPropagation();

                        this.$emit(`update:${prop}`, value);
                  }

                  return this.$createElement('div', {
                        staticClass: `ivue-picker-title-btn ${staticClass}`,
                        on: (active || readonly) ? undefined : { click }
                  }, Array.isArray(content) ? content : [content]);
            }
      }
}