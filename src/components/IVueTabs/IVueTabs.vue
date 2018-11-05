<template>
      <div :class="prefixCls">
            <slot></slot>
      </div>
</template>

<script>
const prefixCls = 'ivue-tabs';

export default {
      name: 'IVueTabs',
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
            value: [String, Number]
      },
      data () {
            return {
                  prefixCls: prefixCls,
                  // 激活的tab
                  activeItem: this.value,
                  // 导航列表
                  tabNavList: []
            }
      },
      computed: {
            // 激活的Index
            activeIndex () {
                  return this.tabNavList.findIndex((tab, index) => {
                        return tab.key === this.activeItem.key;
                  });
            },
            // 激活的tab
            activeTab() {
                  if (!this.tabNavList.length) {
                        return undefined;
                  }

                  return this.tabNavList[this.activeIndex];
            }
      },
      methods: {
            // 更新tab导航
            updateTabNav (options) {
                  this.tabNavList.push(options);

                  console.log(this.tabNavList)
            },
            // 清除tab导航
            removeTabNav (tab) {
                  this.tabNavList = this.tabNavList.filter(o => o !== tab);
            },
            // 导航点击
            tabNavClick (tab) {
                  this.activeItem = tab;
                  console.log(this.activeTab)
            },
            // 更新当前选项
            updateTabs () {

            }
      },
      watch: {
            // 监听激活项
            activeKey (value) {
                  this.updateTabs(value);
            }
      }
}
</script>

