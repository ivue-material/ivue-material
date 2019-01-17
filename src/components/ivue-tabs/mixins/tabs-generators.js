import IvueTabsItems from '../ivue-tabs-items';
import IvueTabsSlider from '../ivue-tabs-slider';
import IvueIcon from '../../ivue-icon';

export default {
      methods: {
            // 获取头部
            genBar (items) {
                  return this.$createElement('div', this.setBackgroundColor(this.color, {
                        staticClass: 'ivue-tabs-bar',
                        ref: 'bar'
                  }), [
                              this.genTransition('prev'),
                              this.genWrapper(
                                    this.genContainer(items)
                              ),
                              this.genTransition('next')
                        ]);
            },
            // 外层
            genWrapper (items) {
                  return this.$createElement('div', {
                        staticClass: 'ivue-tabs-wrapper',
                        class: {
                              'ivue-tabs-wrapper--show-arrow': this.hasArrows
                        },
                        ref: 'wrapper',
                        directives: [{
                              name: 'touch',
                              value: {
                                    start: e => this.overflowCheck(e, this.onTouchStart),
                                    move: e => this.overflowCheck(e, this.onTouchMove),
                                    end: e => this.overflowCheck(e, this.onTouchEnd)
                              }
                        }]
                  }, [items])
            },
            genContainer (items) {
                  return this.$createElement('div', {
                        staticClass: 'ivue-tabs-container',
                        class: {
                              'ivue-tabs-container--centered': this.centered,
                              'ivue-tabs-container--right': this.right,
                              'ivue-tabs-container--overflow': this.isOverflowing,
                              'ivue-tabs-container--fixed-tabs': this.fixedTabs
                        },
                        style: this.containerStyles,
                        ref: 'container'
                  }, items);
            },
            genIcon (direction) {
                  if (!this.hasArrows || !this[`${direction}IconVisible`]) {
                        return null;
                  }

                  return this.$createElement(IvueIcon, {
                        staticClass: `ivue-tabs-icon ivue-tabs-icon--${direction}`,
                        on: {
                              click: () => this.scrollTo(direction)
                        },
                        nativeOn: {
                              click: () => this.scrollTo(direction)
                        }
                  }, this[`${direction}Icon`]);
            },
            genTransition (direction) {
                  return this.$createElement('transition', {
                        props: { name: 'fade-transition' }
                  }, [this.genIcon(direction)]);
            },
            // 头部滑动条
            genSlider (items) {
                  if (!items.length) {
                        items = [this.$createElement(IvueTabsSlider, {
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

                  return this.$createElement(IvueTabsItems, item);
            }
      }
}