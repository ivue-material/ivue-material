<script>
import Colorable from '../../utils/mixins/Colorable';
import Resize from '../../utils/directives/Resize';
import Touch from '../../utils/directives/Touch';

import { provide as RegistrableProvide } from '../../utils/mixins/Registrable';
import TabsGenerators from './mixins/tabs-generators';
import TabsComputed from './mixins/tabs-computed';
import TabsWatchers from './mixins/tabs-watchers';
import TabsProps from './mixins/tabs-props';
import TabsTouch from './mixins/tabs-touch';

const prefixCls = 'ivue-tabs';

const transitionTime = 300;

export default {
      name: prefixCls,
      directives: {
            Resize,
            Touch
      },
      mixins: [
            RegistrableProvide('tabNavList'),
            Colorable,
            TabsProps,
            TabsGenerators,
            TabsComputed,
            TabsWatchers,
            TabsTouch
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
                  // 导航栏是否需要滚动
                  isOverflowing: false,
                  // 导航栏宽度
                  widths: {
                        bar: 0,
                        container: 0,
                        wrapper: 0
                  },
                  // 滚动位置
                  scrollOffset: 0,
                  nextIconVisible: false,
                  prevIconVisible: false,
                  startX: 0
            }
      },
      mounted () {
            this.checkIcons();
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

                  this.scrollIntoView();
            },
            // 更新当前选项
            updateTabs () {
                  for (let index = this.tabNavList.length; --index >= 0;) {
                        if (!this.tabNavList[index].disabled) {
                              this.tabNavList[index].toggle(this.activeTab);
                        }
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
                                    case 'ivue-tabs-slider': slider.push(vnode);
                                          break;
                                    case 'ivue-tabs-items': items.push(vnode);
                                          break;
                                    case 'ivue-tab-item': item.push(vnode);
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
                        if (!activeTab || !activeTab.$el || activeTab.disabled) {
                              return;
                        }

                        this.sliderLeft = activeTab.$el.offsetLeft;
                        this.sliderWidth = activeTab.$el.clientWidth;
                  });
            },
            // 监听resize
            onResize () {
                  this.setWidths();

                  clearTimeout(this.resizeTimeout)
                  this.resizeTimeout = setTimeout(() => {
                        this.callSlider();
                        this.scrollIntoView();
                        this.checkIcons();
                  }, this.transitionTime)
            },
            // 获取导航宽度
            setWidths () {
                  const bar = this.$refs.bar ? this.$refs.bar.clientWidth : 0;
                  const container = this.$refs.container ? this.$refs.container.clientWidth : 0;
                  const wrapper = this.$refs.wrapper ? this.$refs.wrapper.clientWidth : 0;

                  this.widths = { bar, container, wrapper };

                  this.setOverflow();
            },
            // 设置导航栏是否滚动
            setOverflow () {
                  this.isOverflowing = this.widths.bar < this.widths.container;
            },
            overflowCheck (e, fn) {
                  this.isOverflowing && fn(e);
            },
            // 滚动导航栏
            scrollIntoView () {
                  if (!this.activeTab) {
                        return;
                  }
                  if (!this.isOverflowing) {
                        return (this.scrollOffset = 0);
                  }

                  // 导航栏总共的宽度
                  const totalWidth = this.widths.wrapper + this.scrollOffset;
                  const { clientWidth, offsetLeft } = this.activeTab.$el;
                  // item宽度
                  const itemOffset = clientWidth + offsetLeft;

                  let additionalOffset = clientWidth * 0.3;

                  // 如果选择最后一个选项卡，请不要添加偏移量
                  if (this.activeIndex === this.tabNavList.length - 1) {
                        additionalOffset === 0;
                  }

                  if (offsetLeft < this.scrollOffset) {
                        this.scrollOffset = Math.max(offsetLeft - additionalOffset, 0);
                  }
                  else if (totalWidth < itemOffset) {
                        this.scrollOffset -= totalWidth - itemOffset - additionalOffset;
                  }
            },
            // 点击箭头滚动
            scrollTo (direction) {
                  this.scrollOffset = this.newOffset(direction);
            },
            // 检查是否有icon
            checkIcons () {
                  this.nextIconVisible = this.checkNextIcon();
                  this.prevIconVisible = this.checkPrevIcon();
            },
            checkNextIcon () {
                  return this.widths.container > this.scrollOffset + this.widths.wrapper;
            },
            checkPrevIcon () {
                  return this.scrollOffset > 0;
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

