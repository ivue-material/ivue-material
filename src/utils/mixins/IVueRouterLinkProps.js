import Vue from 'vue';

export default {
      name: 'routable',
      props: {
            to: [String, Object],
            replace: Boolean,
            append: Boolean,
            tag: String,
            activeClass: String,
            exact: {
                  type: Boolean,
                  default: undefined
            },
            event: [String, Array],
            exactActiveClass: String,
            href: [String, Object],
            disabled: Boolean,
            nuxt: Boolean,
            target: String,
            /*
            * 将类型应用于按钮 - 它不会影响链接
            * 
            * @type {String}
            */
            type: {
                  type: String,
                  default: 'button'
            },
      },
      methods: {
            click (e) {
                  this.$emit('click', e);
            },
            // 渲染router-link
            generateRouteLink (classes) {
                  let exact = this.exact;
                  let tag;

                  const data = {
                        attrs: { disabled: this.disabled },
                        class: classes,
                        props: {},
                        [this.to ? 'nativeOn' : 'on']: {
                              // 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器
                              ...this.$listeners,
                              click: this.click
                        }
                  };

                  if (typeof this.exact === 'undefined') {
                        exact = (this.to === '/') || (this.to === Object(this.to) && this.to.path === '/');
                  }

                  if (this.to) {
                        // 添加一个 special activeClass hook
                        // 用于组件级样式
                        let activeClass = this.activeClass;
                        let exactActiveClass = this.exactActiveClass || activeClass;

                        tag = this.nuxt ? 'nuxt-link' : 'router-link';

                        Object.assign(data.props, {
                              to: this.to,
                              exact,
                              activeClass,
                              exactActiveClass,
                              append: this.append,
                              replace: this.replace
                        });
                  }
                  else {
                        tag = (this.href && 'a') || this.tag || 'a';

                        if (tag === 'a' && this.href) {
                              data.attrs.href = this.href;
                        }
                  }

                  if (this.target) {
                        data.attrs.target = this.target;
                  }

                  return { tag, data };
            }
      }
};