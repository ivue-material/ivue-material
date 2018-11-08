<script>
import Colorable from '../../utils/mixins/Colorable';
import Resize from '../../utils/directives/Resize';
import { provide as RegistrableProvide } from '../../utils/mixins/Registrable';
import TabsGenerators from './mixins/tabs-generators';

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
            TabsGenerators
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
      props: {
            /*
            * 当前激活 tab 面板的 name，可以使用 v-model 双向绑定数据
            * 
            * @type{String,Number}
            */
            value: [String, Number],
            /*
            * 导航高度
            * 
            * @type{String,Number}
            */
            height: {
                  type: [String, Number],
                  default: undefined,
                  validator: v => !isNaN(parseInt(v))
            },
            /*
            * 导航内容居中
            * 
            * @type{Boolean}
            */
            centered: Boolean,
            /*
            * 导航内容向右
            * 
            * @type{Boolean}
            */
            right: Boolean,
            /*
            * 滑动条颜色
            * 
            * @type{String}
            */
            sliderColor: String,
            /*
            * 滑动条隐藏
            * 
            * @type{Boolean}
            */
            hideSlider: Boolean
      },
      data () {
            return {
                  // 激活的tab
                  activeKey: this.value,
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
      computed: {
            // 激活的Index
            activeIndex () {
                  return this.tabNavList.findIndex((tab, index) => {
                        if (!this.activeKey) {
                              return index === 0;
                        }
                        return tab.name === this.activeKey;
                  });
            },
            // 激活的tab
            activeTab () {
                  if (!this.tabNavList.length) {
                        return undefined;
                  }

                  return this.tabNavList[this.activeIndex];
            },
            // 导航样式
            containerStyles () {
                  return this.height ? {
                        height: `${parseInt(this.height, 10)}px`
                  } : null
            },
            // 滑动条样式
            sliderStyles () {
                  return {
                        left: `${this.sliderLeft}px`,
                        transition: this.sliderLeft !== null ? null : 'none',
                        width: `${this.sliderWidth}px`,
                  }
            }
      },
      mounted () {
            this.genBar();
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
            registerItems (fn) {
                  this.tabItems = fn;
            },
            unregisterItems () {
                  this.tabItems = null;
            },
            // 导航点击
            tabNavClick (tab) {
                  // 判断禁用
                  if (tab.disabled) {
                        return;
                  }

                  // 设置激活项
                  this.activeKey = tab.name;

                  this.$emit('input', tab.name);

                  this.scrollIntoView();
            },
            // 更新当前选项
            updateTabs () {
                  for (let index = this.tabNavList.length; --index >= 0;) {
                        this.tabNavList[index].toggle(this.activeTab);
                  }
            },
            // tap切换
            tabProxy (val) {
                  this.inputValue = val
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
            setSlider () {
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
                        this.setSlider();
                        this.scrollIntoView();
                  }, this.transitionTime)
            },
            // 滚动到视图
            scrollIntoView () {
                  if (!this.activeTab) {
                        return;
                  }
                  const totalWidth = this.widths.wrapper + this.scrollOffset
                  const { clientWidth, offsetLeft } = this.activeTab.$el
                  const itemOffset = clientWidth + offsetLeft
                  let additionalOffset = clientWidth * 0.3
                  if (this.activeIndex === this.tabNavList.length - 1) {
                        additionalOffset = 0 // don't add an offset if selecting the last tab
                  }

                  /* istanbul ignore else */
                  if (offsetLeft < this.scrollOffset) {
                        this.scrollOffset = Math.max(offsetLeft - additionalOffset, 0)
                  } else if (totalWidth < itemOffset) {
                        this.scrollOffset -= totalWidth - itemOffset - additionalOffset
                  }

                  console.log(this.scrollOffset)
            }
      },
      watch: {
            value (val) {
                  this.activeKey = val;
            },
            // 监听激活项
            activeKey (tab) {
                  // 更新激活项
                  this.updateTabs();

                  setTimeout(this.setSlider, 0);
            },
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

