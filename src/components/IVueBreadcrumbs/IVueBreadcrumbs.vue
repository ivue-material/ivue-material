<script>
const prefixCls = 'ivu-breadcrumb';

export default {
      name: 'IVueBreadcrumbs',
      props: {
            /*
            * 分隔符
            * 
            * @type {String}
            */
            divider: {
                  type: String,
                  default: '/'
            },
            justifyCenter: Boolean,
            justifyEnd: Boolean
      },
      computed: {
            // 计算分隔符
            computedDivider () {
                  return this.$slots.divider ? this.$slots.divider : this.divider;
            },
            classes () {
                  return `${prefixCls}`;
            },
            styles () {
                  const justify = this.justifyCenter ? 'center' : this.justifyEnd ? 'flex-end' : 'flex-start';

                  return {
                        'justify-content': justify
                  }
            }
      },
      methods: {
            // 设置子节点添加分隔符
            genChildren () {
                  if (!this.$slots.default) {
                        return null
                  }

                  // 创建节点
                  const h = this.$createElement;

                  const children = [];

                  const dividerData = { staticClass: `${prefixCls}--divider` };

                  let createDividers = false;

                  for (let i = 0; i < this.$slots.default.length; i++) {
                        const elm = this.$slots.default[i];

                        if (!elm.componentOptions || elm.componentOptions.Ctor.options.name !== `IVueBreadcrumbsItem`) {
                              children.push(elm);
                        }
                        else {
                              if (createDividers) {
                                    children.push(h('span', dividerData, this.computedDivider));
                              }
                              children.push(elm);

                              createDividers = true;
                        }
                  }

                  return children;
            }
      },
      render (h) {
            return h('div', {
                  'class': this.classes,
                  style: this.styles
            }, this.genChildren());
      }
}
</script>

<style>
</style>
