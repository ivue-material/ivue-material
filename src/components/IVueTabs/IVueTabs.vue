<script>
import Colorable from '../../utils/mixins/Colorable';
import IVueTabsSlider from './IVueTabsSlider';

const prefixCls = 'ivue-tabs';

const transitionTime = 300;


export default {
      name: 'IVueTabs',
      mixins: [
            Colorable
      ],
      // 父级组件提供 tabs
      provide () {
            return {
                  tabNavList: this,
                  tabNavClick: this.tabNavClick
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
                  // 判断动画是否完成
                  transitioning: false,
                  // 滑动条位置
                  sliderLeft: null,
                  // 滑动条宽度
                  sliderWidth: null,
                  transitionTime: 300
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
            updateTabNav (options) {
                  this.tabNavList.push(options);
            },
            // 清除tab导航
            removeTabNav (tab) {
                  this.tabNavList = this.tabNavList.filter(o => o !== tab);
            },
            // 导航点击
            tabNavClick (tab) {
                  // 等待动画完成后才可以点击
                  if (this.transitioning) {
                        return;
                  }
                  this.transitioning = true;

                  setTimeout(() => {
                        this.transitioning = false;
                  }, transitionTime);

                  // 判断禁用
                  if (tab.disabled) {
                        return;
                  }

                  // 设置激活项
                  this.activeKey = tab.name;

                  this.$emit('input', tab.name);
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
                                    default: tab.push(vnode);
                              }
                        }
                        else {
                              tab.push(vnode);
                        }
                  }

                  return { tab, slider };
            },
            // 获取头部
            genBar (items) {
                  return this.$createElement('div', this.setBackgroundColor(this.color, {
                        staticClass: 'ivue-tabs-bar',
                        ref: 'bar'
                  }), [
                              this.genWrapper(
                                    this.genContainer(items)
                              )
                        ]);
            },
            // 外层
            genWrapper (items) {
                  return this.$createElement('div', {
                        staticClass: 'ivue-tabs-wrapper',
                        ref: 'wrapper'
                  }, [items])
            },
            genContainer (items) {
                  return this.$createElement('div', {
                        staticClass: 'ivue-tabs-container',
                        class: {
                              'ivue-tabs-container--centered': this.centered,
                              'ivue-tabs-container--right': this.right,

                        },
                        style: this.containerStyles,
                        ref: 'container'
                  }, items);
            },
            // 头部滑动条
            genSlider (items) {

                  if (!items.length) {
                        items = [this.$createElement(IVueTabsSlider, {
                              props: {
                                    color: this.sliderColor
                              }
                        })];
                  }

                  return this.$createElement('div', {
                        staticClass: 'ivue-tabs-slider-wrapper',
                        style: this.sliderStyles
                  }, items);
            },
            // 设置滑动条
            setSlider () {
                  if (this.hideSlider) {
                        return false;
                  }

                  const activeTab = this.activeTab;


                  console.log(activeTab)

                  this.$nextTick(() => {
                        this.sliderWidth = activeTab.$el.clientWidth;
                        this.sliderLeft = activeTab.$el.offsetLeft;
                  });
            },
            onResize () {
                  clearTimeout(this.resizeTimeout)
                  this.resizeTimeout = setTimeout(() => {
                        this.setSlider()
                  }, this.transitionTime)
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
      components: {
            IVueTabsSlider
      },
      render (h) {
            const { tab, slider } = this.parseNodes();


            return h('div', {
                  staticClass: prefixCls
            }, [
                        this.genBar([this.hideSlider ? null : this.genSlider(slider), tab])
                  ])
      }
}
</script>

