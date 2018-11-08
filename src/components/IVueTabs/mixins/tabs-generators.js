import IVueTabsItems from '../IVueTabsItems';
import IVueTabsSlider from '../IVueTabsSlider';


export default {
      methods: {
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
            // 渲染选项
            genItems (items, item) {
                  if (items.length > 0) {
                        return items;
                  }
                  if (!item.length) {
                        return null;
                  }

                  return this.$createElement(IVueTabsItems, item);
            }
      }
}