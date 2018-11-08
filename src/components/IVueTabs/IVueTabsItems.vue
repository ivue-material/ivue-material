<script>
import { provide as RegistrableProvide } from '../../utils/mixins/Registrable';

export default {
      name: 'IVueTabsItems',
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
            }
      },
      props: {
            value: [Number, String]
      },
      data () {
            return {
                  items: [],
                  activeValue: this.value,
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
                        return item.id === this.activeValue || index === this.activeValue;
                  });
            },
            // 激活项
            activeItem () {
                  if (!this.items.length) {
                        return undefined
                  }

                  return this.items[this.activeIndex];
            },
            inputValue: {
                  get () {
                        return this.activeValue;
                  },
                  set (val) {
                        this.activeValue = val;

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
                  this.inputValue = val
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
                  this.activeValue = val;
            }
      },
      render (h) {
            return h('div', {
                  staticClass: 'ivue-tabs-items',
                  directives: []
            }, this.$slots.default);
      }
}
</script>
