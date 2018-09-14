<template>
      <div>
            <div ref="point" :class="classes" :style="styles">
                  <slot></slot>
            </div>
            <div v-show="slot" :style="slotStyle"></div>
      </div>
</template>

<script>
import { on, off } from '../../utils/Dom';
const prefixCls = 'ivue-affix';

export default {
      name: 'IVueAffix',
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
            on(window, 'scroll', this.handleScroll);
            on(window, 'resize', this.handleScroll);
      },
      // 销毁之前
      beforeDestroy () {
            off(window, 'scroll', this.handleScroll);
            off(window, 'resize', this.handleScroll);
      },
      methods: {
            // 获取滚动数值
            getScroll (target, top) {
                  const prop = top ? 'pageYOffset' : 'pageXOffset';
                  const method = top ? 'scrollTop' : 'scrollLeft';

                  let ret = target[prop];

                  if (typeof ret !== 'number') {
                        ret = window.document.documentElement[method];
                  }

                  return ret;
            },
            // 获取元素坐标
            getOffset (element) {
                  // 方法返回元素的大小及其相对于视口的位置
                  const rect = element.getBoundingClientRect();

                  const scrollTop = this.getScroll(window, true);
                  const scrollLeft = this.getScroll(window);

                  const docEl = window.document.body;
                  // 视口高度
                  const clientTop = docEl.clientTop || 0;
                  //视口宽度
                  const clientLeft = docEl.clientTop || 0;

                  return {
                        top: rect.top + scrollTop - clientTop,
                        left: rect.left + scrollLeft - clientLeft
                  }

            },
            // 监听滚动
            handleScroll () {
                  const affix = this.affix;

                  // 获取垂直滚动高度
                  const scrollTop = this.getScroll(window, true);
                  // 获取元素坐标
                  const elOffset = this.getOffset(this.$el);
                  // window高度
                  const windowHeight = window.innerHeight;
                  // 元素高度
                  const elHeight = this.$el.getElementsByTagName('div')[0].offsetHeight;

                  // Fixed Top
                  // 元素的顶部 减去 需要到达指定位置的数值   < windo 的滚动高度 向上滚动 没有开启固定状态
                  if ((elOffset.top - this.offsetTop) < scrollTop && this.offsetType === 'top' && !affix) {
                        // 开启固定状态
                        this.affix = true;
                        this.slotStyle = {
                              width: this.$refs.point.clientWidth + 'px',
                              height: this.$refs.point.clientHeight + 'px'
                        }
                        this.slot = true;
                        this.styles = {
                              top: `${this.offsetTop}px`,
                              left: `${elOffset.left}px`,
                              width: `${this.$el.offsetWidth}px`
                        }

                        this.$emit('on-change', true);
                  }
                  else if ((elOffset.top - this.offsetTop) > scrollTop && this.offsetType == 'top' && affix) {
                        this.slot = false;
                        this.slotStyle = {};
                        this.affix = false;
                        this.styles = null;

                        this.$emit('on-change', false);
                  }

                  // fixed Bottom
                  if ((elOffset.top + this.offsetBottom + elHeight) > (scrollTop + windowHeight) && this.offsetType == 'bottom' && !affix) {
                        this.affix = true;
                        this.styles = {
                              bottom: `${this.offsetBottom}px`,
                              left: `${elOffset.left}px`,
                              width: `${elOffset.top}px`
                        }

                        this.$emit('on-change', true);
                  }
                  else if ((elOffset.top + this.offsetBottom + elHeight) < (scrollTop + windowHeight) && this.offsetType == 'bottom' && affix) {
                        this.affix = false;
                        this.styles = null;

                        this.$emit('on-change', false);
                  }

            }
      }
}
</script>
