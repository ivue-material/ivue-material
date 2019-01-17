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


                  this.scrollIntoView();
            },
            // 监听激活项
            lazyValue () {
                  this.updateTabs();
            },
            fixedTabs () {
                  this.callSlider();
            },
            // 监听value值
            value (val) {
                  this.lazyValue = val;
            },
            hasArrows (val) {

                  if (!val) {
                        this.scrollOffset = 0;
                  }
            },
            // 监听导航滑动
            scrollOffset (val) {

                  this.$refs.container.style.transform = `translateX(${-val}px)`;

                  if (this.hasArrows) {
                        this.prevIconVisible = this.checkPrevIcon();
                        this.nextIconVisible = this.checkNextIcon();
                  }
            }
      }
}