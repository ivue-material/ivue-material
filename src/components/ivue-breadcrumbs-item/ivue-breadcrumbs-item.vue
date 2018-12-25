<script>
import { oneOf } from '../../utils/assist';
import IvueRouterLinkProps from '../../utils/mixins/ivue-router-link-props';

const prefixCls = 'ivue-breadcrumbs-item';

export default {
      name: prefixCls,
      mixins: [IvueRouterLinkProps],
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
      render (h) {
            const { tag, data } = this.generateRouteLink(this.classes);

            return h('span', [
                  h(tag, data, this.$slots.default)
            ]);
      }
}
</script>