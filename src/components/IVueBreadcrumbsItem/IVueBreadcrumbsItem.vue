<script>
import { oneOf } from '../../utils/Assist';

const prefixCls = 'ivue-breadcrumb-item';

export default {
      name: prefixCls,
      props: {
            /*
            * 当前面包屑是否处于禁用状态
            * 
            * @type {Boolean}
            */
            disabled: {
                  type: Boolean,
                  default: false
            },
            /*
            * 设置内容标签
            * 
            * @type {String}
            */
            tag: {
                  type: String
            },
            /*
            * vue-router 对象
            * 
            * @type {String,Object}
            */
            to: {
                  type: [String, Object]
            },
            /*
            * a 链接跳转
            * 
            * @type {String,Object}
            */
            href: {
                  type: [String, Object]
            },
            /*
            * exact 匹配模式
            * 
            * @type {Boolean}
            */
            exact: {
                  type: Boolean
            },
            /*
            * 链接激活时使用的 CSS 类名 
            * 
            * @type {String}
            */
            activeClass: {
                  type: String
            },
            /*
            * 在当前 (相对) 路径前添加基路径
            * 
            * @type {Boolean}
            */
            append: {
                  type: Boolean
            },
            /*
            * 当链接被精确匹配的时候应该激活的 class
            * 
            * @type {String}
            */
            exactActiveClass: {
                  type: String
            },
            /*
            * nuxt.js 
            * 
            * @type {Boolean}
            */
            nuxt: {
                  type: Boolean,
            },
            /*
            * 调用 router.replace()
            * 
            * @type {Boolean}
            */
            replace: {
                  type: Boolean
            },
            /*
            * 相当于 a 链接的 target 属性
            * 
            * @type {String}
            */
            target: {
                  type: String,
                  validator (value) {
                        return oneOf(value, ['_blank', '_self', '_parent', '_top']);
                  },
                  default: '_self'
            }
      },
      computed: {
            classes () {
                  return [
                        prefixCls,
                        {
                              [`${prefixCls}--disabled`]: this.disabled
                        }
                  ];
            }
      },
      methods: {
            /* eslint-disable-next-line no-unused-vars */
            click (e) { /**/ },
            generateRouteLink (classes) {
                  let exact = this.exact;
                  let tag;

                  const data = {
                        attrs: { disabled: this.disabled },
                        class: classes,
                        props: {},
                        [this.to ? 'nativeOn' : 'on']: {
                              ...this.$listeners,
                              click: this.click
                        }
                  }

                  // 路由是否有匹配模式
                  if (typeof this.exact === 'undefined') {
                        exact = this.to === '/' || (this.to === Object(this.to) && this.to.path === '/');
                  }

                  // 判断是否是 router-link
                  if (this.to) {
                        //添加一个特殊的activeClass钩子
                        //用于组件级样式  
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
                              data.attrs.target = this.target;
                        }
                  }


                  return { tag, data }
            }
      },
      render (h) {
            const { tag, data } = this.generateRouteLink(this.classes);

            return h('span', [
                  h(tag, data, this.$slots.default)
            ]);
      }
}
</script>