export default {
      watch: {
            // 监听激活的tab
            activeTab (tab, prev) {
                  !prev && tab && this.updateTabs();

                  setTimeout(this.callSlider, 0);

                  if (!tab) {
                        return;
                  }
                  
                  this.tabItems && this.tabItems(this.tabNavList.indexOf(tab));
            },
            // 监听激活项
            lazyValue () {
                  this.updateTabs();
            },
            // 监听value值
            value (val) {
                  this.lazyValue = val;
            },
            // 监听导航滑动
            scrollOffset(val){
                  this.$refs.container.style.transform = `translateX(${-val}px)`;
            }
      }
}