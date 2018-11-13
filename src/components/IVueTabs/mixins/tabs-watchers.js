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
                  let arrowsWidth = 0;
                  
                  if (this.showArrows) {
                        arrowsWidth = window.getComputedStyle(this.$refs.wrapper)['marginLeft'];
                        arrowsWidth = Number(arrowsWidth.replace('px','')) * 2;
                  }

                  this.$refs.container.style.transform = `translateX(${-val + -arrowsWidth}px)`;

                  if (this.hasArrows) {
                        this.prevIconVisible = this.checkPrevIcon();
                        this.nextIconVisible = this.checkNextIcon();
                  }
            }
      }
}