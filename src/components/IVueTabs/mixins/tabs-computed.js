export default {
      computed: {
            // 激活的Index
            activeIndex () {
                  return this.tabNavList.findIndex((tab, index) => {
                        if (!this.lazyValue) {
                              return index === 0;
                        }

                        return tab.name === this.lazyValue || index === this.lazyValue;
                  });
            },
            // 激活的tab
            activeTab () {
                  if (!this.tabNavList.length) {
                        return undefined;
                  }

                  return this.tabNavList[this.activeIndex];
            },
            // 更新v-model
            inputValue: {
                  get () {
                        return this.lazyValue
                  },
                  set (val) {
                        if (this.inputValue === val) return

                        this.lazyValue = val
                        this.$emit('input', val)
                  }
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
      }
}