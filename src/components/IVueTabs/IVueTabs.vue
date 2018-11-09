<script>
import Colorable from '../../utils/mixins/Colorable';
import Resize from '../../utils/directives/Resize';
import { provide as RegistrableProvide } from '../../utils/mixins/Registrable';
import TabsGenerators from './mixins/tabs-generators';
import TabsComputed from './mixins/tabs-computed';
import TabsWatchers from './mixins/tabs-watchers';
import TabsProps from './mixins/tabs-props';

const prefixCls = 'ivue-tabs';

const transitionTime = 300;

export default {
      name: 'IVueTabs',
      directives: {
            Resize
      },
      mixins: [
            RegistrableProvide('tabNavList'),
            Colorable,
            TabsProps,
            TabsGenerators,
            TabsComputed,
            TabsWatchers
      ],
      // 父级组件提供 tabs
      provide () {
            return {
                  tabNavList: this,
                  tabNavClick: this.tabNavClick,
                  tabProxy: this.tabProxy,
                  registerItems: this.registerItems,
                  unregisterItems: this.unregisterItems
            }
      },
      data () {
            return {
                  // 激活的tab
                  lazyValue: this.value,
                  // 导航列表
                  tabNavList: [],
                  // 滑动条位置
                  sliderLeft: null,
                  // 滑动条宽度
                  sliderWidth: null,
                  transitionTime: 300,
                  // items
                  tabItems: null,
                  // 滚动宽度
                  scrollOffset: 0,
                  widths: {
                        bar: 0,
                        container: 0,
                        wrapper: 0
                  }
            }
      },
      methods: {
            // 更新tab导航
            register (options) {
                  this.tabNavList.push(options);
            },
            // 清除tab导航
            unregister (tab) {
                  this.tabNavList = this.tabNavList.filter(o => o !== tab);
            },
            // 注册items
            registerItems (fn) {
                  this.tabItems = fn;
            },
            // 销毁
            unregisterItems () {
                  this.tabItems = null;
            },
            // tap切换
            tabProxy (val) {
                  this.inputValue = val
            },
            // 导航点击
            tabNavClick (tab) {
                  // 判断禁用
                  if (tab.disabled) {
                        return;
                  }

                  // 设置激活项
                  this.inputValue = tab.name;
            },
            // 更新当前选项
            updateTabs () {
                  for (let index = this.tabNavList.length; --index >= 0;) {
                        this.tabNavList[index].toggle(this.activeTab);
                  }
            },
            // 获取节点
            parseNodes () {
                  const item = [];
                  const items = [];
                  const slider = [];
                  const tab = [];
                  const length = (this.$slots.default || []).length;


                  for (let i = 0; i < length; i++) {
                        var vnode = this.$slots.default[i];

                        if (vnode.componentOptions) {
                              switch (vnode.componentOptions.Ctor.options.name) {
                                    case 'IVueTabsSlider': slider.push(vnode);
                                          break;
                                    case 'IVueTabItems': items.push(vnode);
                                          break;
                                    case 'IVueTabItem': item.push(vnode);
                                          break;
                                    default: tab.push(vnode);
                              }
                        }
                        else {
                              tab.push(vnode);
                        }
                  }

                  return { tab, slider, item, items };
            },
            // 设置滑动条
            callSlider () {
                  const { hideSlider, activeTab } = this;

                  if (hideSlider || !activeTab) {
                        return false;
                  }

                  this.$nextTick(() => {
                        if (!activeTab || !activeTab.$el) {
                              return;
                        }
                        this.sliderWidth = activeTab.$el.clientWidth;
                        this.sliderLeft = activeTab.$el.offsetLeft;
                  });
            },
            // 监听resize
            onResize () {
                  clearTimeout(this.resizeTimeout)
                  this.resizeTimeout = setTimeout(() => {
                        this.callSlider();
                  }, this.transitionTime)
            }
      },
      watch: {
            // 监听导航列表 
            tabNavList () {
                  this.onResize();
            }
      },
      render (h) {
            const { tab, slider, item, items } = this.parseNodes();

            return h('div', {
                  staticClass: prefixCls,
                  directives: [{
                        name: 'resize',
                        arg: 400,
                        modifiers: {
                              quiet: true
                        },
                        value: this.onResize
                  }]
            }, [
                        this.genBar([this.hideSlider ? null : this.genSlider(slider), tab]),
                        this.genItems(items, item)
                  ])
      }
}
</script>

