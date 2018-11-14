<script>
import { provide as RegistrableProvide } from '../../utils/mixins/Registrable';
import Touch from '../../utils/directives/Touch';

export default {
      name: 'IVueTabsItems',
      directives: {
            Touch
      },
      mixins: [RegistrableProvide('tabNavList')],
      inject: {
            // 注册items
            registerItems: {
                  default: null
            },
            // 设置tab激活位置
            tabProxy: {
                  default: null
            },
            // 移除items
            unregisterItems: {
                  default: null
            },
            tabNavList: {
                  default: null
            }
      },
      props: {
            value: [Number, String]
      },
      data () {
            return {
                  items: [],
                  lazyValue: this.value,
                  reverse: false
            }
      },
      mounted () {
            this.registerItems && this.registerItems(this.changeModel);
      },
      computed: {
            // 当前激活的位置
            activeIndex () {
                  return this.items.findIndex((item, index) => {
                        return item.id === this.lazyValue || index === this.lazyValue;
                  });
            },
            // 激活项
            activeItem () {
                  if (!this.items.length) {
                        return undefined;
                  }

                  return this.items[this.activeIndex];
            },
            // 修改v-model
            inputValue: {
                  get () {
                        return this.lazyValue
                  },
                  set (val) {
                        this.lazyValue = val;

                        if (this.tabProxy) {
                              this.tabProxy(val);
                        }
                        else {
                              this.$emit('input', val);
                        }
                  }
            }
      },
      methods: {
            // 改变 input 值
            changeModel (val) {
                  this.inputValue = val;
            },
            // 注册
            register (item) {
                  this.items.push(item);
            },
            // 移除
            unregister (item) {
                  this.items = this.items.filter(i => i !== item);
            },
            // 更新激活的item
            updateItems () {
                  for (let index = this.items.length; --index >= 0;) {
                        this.items[index].toggle(this.activeIndex === index, this.reverse, this.isBooted)
                  }

                  this.isBooted = true;
            },
            // 下一个item
            next () {
                  let nextIndex = this.activeIndex - 1;

                  const tab = this.tabNavList.parseNodes().tab;

                  if ((tab[nextIndex] && tab[nextIndex].componentInstance.disabled) && (tab[nextIndex - 1] && !tab[nextIndex - 1].componentInstance.disabled)) {
                        this.inputValue = nextIndex - 1;
                  }

                  if (tab[nextIndex] && tab[nextIndex].componentInstance.disabled) {
                        return;
                  }

                  if (!this.items[nextIndex]) {
                        nextIndex = 0;
                  }

                  this.inputValue = nextIndex;
            },
            // 上一个item
            prev () {
                  let prevIndex = this.activeIndex + 1;

                  const tab = this.tabNavList.parseNodes().tab;


                  if ((tab[prevIndex].componentInstance && tab[prevIndex].componentInstance.disabled) && (tab[prevIndex + 1].componentInstance && !tab[prevIndex + 1].componentInstance.disabled)) {
                        this.inputValue = prevIndex + 1;
                  }

                  if (tab[prevIndex].componentInstance && tab[prevIndex].componentInstance.disabled) {
                        return;
                  }

                  if (!this.items[prevIndex]) {
                        prevIndex = this.items.length - 1;
                  }

                  this.inputValue = prevIndex;
            },
            // 切换
            onSwipe (status) {
                  this[status]();
            }
      },
      beforeDestroy () {
            this.unregisterItems && this.unregisterItems();
      },
      watch: {
            // 监听激活的index
            activeIndex (current, previous) {
                  this.reverse = current < previous;

                  // 更新激活的item
                  this.updateItems();
            },
            value (val) {
                  this.lazyValue = val;
            }
      },
      render (h) {
            return h('div', {
                  staticClass: 'ivue-tabs-items',
                  directives: [{
                        name: 'touch',
                        value: {
                              left: () => this.onSwipe('next'),
                              right: () => this.onSwipe('prev')
                        }
                  }]
            }, this.$slots.default);
      }
}
</script>
