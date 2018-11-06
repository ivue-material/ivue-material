<script>
import Colorable from '../../utils/mixins/Colorable';

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
            }
      },
      data () {
            return {
                  // 激活的tab
                  activeKey: this.value,
                  // 导航列表
                  tabNavList: [],
                  transitioning: false
            }
      },
      computed: {
            // 激活的Index
            activeIndex () {
                  return this.tabNavList.findIndex((tab, index) => {
                        return tab.key === this.activeKey.key;
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
                  this.activeKey = tab;
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
                                    case 'IVueTabsSlider': slider.push(vnode)
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
                              this.genContainer(items)
                        ]);

                  console.log(items)
            },
            genWrapper () {

            },
            genContainer (items) {
                  return this.$createElement('div', {
                        staticClass: 'ivue-tabs-container',
                        style: this.containerStyles,
                        ref: 'container'
                  }, items);
            }
      },
      watch: {
            value (val) {
                  this.activeKey = val;
            },
            // 监听激活项
            activeKey (tab) {
                  this.updateTabs();
            }
      },
      render (h) {
            const { tab, slider } = this.parseNodes();

            return h('div', {
                  staticClass: prefixCls
            }, [
                        this.genBar([null, tab])
                  ])
      }
}
</script>

