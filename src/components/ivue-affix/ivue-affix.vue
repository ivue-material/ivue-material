<template>
      <div>
            <div ref="point" :class="classes" :style="styles">
                  <slot></slot>
            </div>
            <div v-show="slot" :style="slotStyle"></div>
      </div>
</template>

<script>
import { on, off } from '../../utils/dom';
const prefixCls = 'ivue-affix';

export default {
      name: prefixCls,
      props: {
            /*
            * 距离窗口顶部达到指定偏移量后触发
            * 
            * @type {Number}
            */
            offsetTop: {
                  type: Number,
                  default: 0
            },
            /*
            * 距离窗口底部达到指定偏移量后触发
            * 
            * @type {Number}
            */
            offsetBottom: {
                  type: Number,
                  default: -1
            }
      },
      data () {
            return {
                  /*
                  * 组件状态是否开启固定
                  * 
                  * @type {Boolean}
                  */
                  affix: false,
                  /*
                  * slot 是否开启
                  * 
                  * @type {Boolean}
                  */
                  slot: false,
                  /*
                  * styles
                  * 
                  * @type {Object}
                  */
                  styles: {},
                  /*
                  * slotStyle
                  * 
                  * @type {Object}
                  */
                  slotStyle: {}
            }
      },
      computed: {
            // 滚动状态值
            offsetType () {
                  let type = 'top';

                  // 是否有底部偏移量
                  if (this.offsetBottom >= 0) {
                        type = 'bottom';
                  }

                  return type;
            },
            // 是否添加class设置 fixed
            classes () {
                  return [
                        {
                              [`${prefixCls}`]: this.affix
                        }
                  ]
            }
      },
      mounted () {
            // 监听滚动和缩放事件
            on(window, 'scroll', this.handleScroll);
            on(window, 'resize', this.handleScroll);
      },
      // 销毁之前
      beforeDestroy () {
            // 销毁监听滚动和缩放事件
            off(window, 'scroll', this.handleScroll);
            off(window, 'resize', this.handleScroll);
      },
      methods: {
            // 获取滚动数值
            getScroll (target, top) {
                  const prop = top ? 'pageYOffset' : 'pageXOffset';
                  const method = top ? 'scrollTop' : 'scrollLeft';

                  // 在 window 中查找参数 pageYOffset || pageXOffset
                  let ret = target[prop];

                  // 如果 没有 pageYOffset || pageXOffset 
                  if (typeof ret !== 'number') {
                        // 返回 scrollTop || scrollLeft
                        ret = window.document.documentElement[method];
                  }

                  return ret;
            },
            // 获取元素坐标
            getOffset (element) {
                  // 方法返回元素的大小及其相对于视口的位置
                  const rect = element.getBoundingClientRect();

                  // 滚动条的垂直位置
                  const scrollTop = this.getScroll(window, true);
                  // 滚动条的水平位置
                  const scrollLeft = this.getScroll(window);

                  const docEl = window.document.body;
                  // 视口高度
                  const clientTop = docEl.clientTop || 0;
                  //视口宽度
                  const clientLeft = docEl.clientTop || 0;

                  return {
                        // 元素上边到视窗上边的距离 + 滚动条的垂直位置 - 顶部边框的宽度(顶部边框的宽度)
                        top: rect.top + scrollTop - clientTop,
                        // 元素左边到视窗左边的距离 + 滚动条的水平位置 - 元素的左边框的宽度(不包括左外边距和左内边距)
                        left: rect.left + scrollLeft - clientLeft
                  }

            },
            // 监听滚动
            handleScroll () {
                  // 组件状态是否开启固定
                  const affix = this.affix;

                  // 获取垂直滚动高度
                  const scrollTop = this.getScroll(window, true);
                  // 获取元素坐标
                  const elOffset = this.getOffset(this.$el);
                  // window高度
                  const windowHeight = window.innerHeight;
                  // 元素高度
                  const elHeight = this.$el.getElementsByTagName('div')[0].offsetHeight;

                  // 固定在头部 Top
                  // 元素的顶部 减去 需要到达指定位置的数值   < windo 的滚动高度 向上滚动 没有开启固定状态
                  if ((elOffset.top - this.offsetTop) < scrollTop && this.offsetType === 'top' && !affix) {
                        // 开启固定状态
                        this.affix = true;
                        // slot样式
                        this.slotStyle = {
                              width: this.$refs.point.clientWidth + 'px',
                              height: this.$refs.point.clientHeight + 'px'
                        }
                        this.slot = true;

                        // 组样式
                        this.styles = {
                              top: `${this.offsetTop}px`,
                              left: `${elOffset.left}px`,
                              width: `${this.$el.offsetWidth}px`
                        }

                        // 在固定状态发生改变时触发
                        this.$emit('on-change', true);
                  }
                  else if ((elOffset.top - this.offsetTop) > scrollTop && this.offsetType == 'top' && affix) {
                        this.slot = false;
                        this.slotStyle = {};
                        this.affix = false;
                        this.styles = null;

                        // 在固定状态发生改变时触发
                        this.$emit('on-change', false);
                  }

                  // 固定在底部 Bottom
                  if ((elOffset.top + this.offsetBottom + elHeight) > (scrollTop + windowHeight) && this.offsetType == 'bottom' && !affix) {
                        this.affix = true;
                        this.styles = {
                              bottom: `${this.offsetBottom}px`,
                              left: `${elOffset.left}px`,
                              width: `${elOffset.top}px`
                        }

                        //  // 在固定状态发生改变时触发
                        this.$emit('on-change', true);
                  }
                  else if ((elOffset.top + this.offsetBottom + elHeight) < (scrollTop + windowHeight) && this.offsetType == 'bottom' && affix) {
                        this.affix = false;
                        this.styles = null;

                        //  // 在固定状态发生改变时触发
                        this.$emit('on-change', false);
                  }

            }
      }
}
</script>
