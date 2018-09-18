<template>
      <div :class="classes">
            <button type="button" :class="arrowClasses" class="left">
                  <IVueIcon>{{leftArrow}}</IVueIcon>
            </button>
            <div :class="[prefixCls + '-list']">
                  <div :class="[prefixCls + '-slot', showLoopSlot ? '' : 'higher']" :style="slotStyle" ref="originSlot">
                        <slot></slot>
                  </div>
                  <div :class="[prefixCls + '-slot', showLoopSlot ? 'higher' : '']"  :style="loopSlotStyle" ref="loopSlot" v-if="loop"></div>
            </div>
            <button type="button" :class="arrowClasses" class="right">
                  <IVueIcon>{{rightArrow}}</IVueIcon>
            </button>
      </div>
</template>

<script>
import { oneOf } from '../../utils/Assist';
import IVueIcon from '../IVueIcon/IVueIcon';

const prefixCls = 'ivu-carousel';

export default {
      name: 'IVueCarousel',
      props: {
            /*
            * 切换箭头显示时机
            * 
            * @type {String}
            * 
            * hover（悬停），always（一直显示），never（不显示）
            */
            arrow: {
                  type: String,
                  default: 'hover',
                  validator (value) {
                        return oneOf(value, ['hover', 'always', 'never'])
                  }
            },
            /*
            * 左箭头图标
            * 
            * @type {String}
            */
            leftArrow: {
                  type: String,
                  default: 'keyboard_arrow_left'
            },
            /*
            * 右箭头图标
            * 
            * @type {String}
            */
            rightArrow: {
                  type: String,
                  default: 'keyboard_arrow_right'
            },
            /*
            * 动画效果
            * 
            * @type {String}
            */
            easing: {
                  type: String,
                  default: 'ease'
            },
            /*
            * 是否开启循环
            * 
            * @type {Boolean}
            */
            loop: {
                  type: Boolean,
                  default: false
            },
            /*
            * 轮播图高度
            * 
            * @type {String | Number}
            * 
            * 可填 auto 或具体高度数值，单位 px
            */
            height: {
                  type: [String, Number],
                  default: 'auto',
                  validator (value) {
                        return value === 'auto' || Object.prototype.toString.call(value) === '[object Number]';
                  }
            },
            /*
            * 幻灯片的索引
            * 
            * @type {Number}
            */
            value: {
                  type: Number,
                  default: 0
            }
      },
      data () {
            return {
                  prefixCls: prefixCls,
                  /*
                  * 列表内容宽度
                  * @type {Number}
                  */
                  listWidth: 0,
                  /*
                  * 内容外层宽度
                  * @type {Number}
                  */
                  slotWidth: 0,
                  /*
                  * 内容偏移位置
                  * @type {Number}
                  */
                  slotOffset: 0,
                  /*
                  * 循环内容偏移位置
                  * @type {Number}
                  */
                  slotLoopOffset: 0,
                  /*
                  * 显示循环的内容
                  * @type {Boolean}
                  */
                  showLoopSlot: false,
                  /*
                  * 滑动列表
                  * @type {Array}
                  */
                  slides: [],
                  /*
                  * 滑动列表实例
                  * @type {Array}
                  */
                  slideInstances: [],
                  /*
                  * 内容索引位置
                  * @type {Number}
                  */
                  slotIndex: this.value,
                  /*
                  * 循环内容索引位置
                  * @type {Number}
                  */
                  loopSlotIndex: this.value
            }
      },
      mounted () {
            this.updateSlides(true);
      },
      computed: {
            // 外城样式
            classes () {
                  return [
                        `${prefixCls}`
                  ]
            },
            // 箭头样式
            arrowClasses () {
                  return [
                        `${prefixCls}-arrow`,
                        `${prefixCls}-arrow-${this.arrow}`
                  ]
            },
            // 内容样式
            slotStyle () {
                  return {
                        width: `${this.slotWidth}px`,
                        transfrom: `transfrom3d(${-this.slotOffset}px,0px,0px)`,
                        transition: `transfrom 500ms ${this.easing}`
                  }
            },
            // 循环内容样式
            loopSlotStyle () {
                  return {
                        width: `${this.slotWidth}px`,
                        transfrom: `transfrom3d(${-this.slotLoopOffset}px,0px,0px)`,
                        transition: `transfrom 500ms ${this.easing}`,
                        position: 'absolute',
                        top: 0
                  }
            }
      },
      methods: {
            // 复制内容
            initCopySlot () {
                  this.$nextTick(() => {
                        this.$refs.loopSlot.innerHTML = this.$refs.loopSlot.innerHTML;
                  });
            },
            // 当slot改变时使用
            slotChange () {
                  this.$nextTick(() => {
                        this.slides = [];
                        this.slideInstance = [];

                        // 更新滑动列表
                        this.updateSlides(true);

                        // 更新内容位置
                        this.updatePos();

                        // 更新偏移位置
                        this.updateOffset();
                  })
            },
            // 找到子节点
            findChild (cb) {
                  const find = function (child) {
                        const name = child.$options.componentName;

                        if (name) {
                              cb(child);
                        }
                        else if (child.$children.length) {
                              child.$children.forEach((innerChild) => {
                                    find(innerChild, cb)
                              })
                        }
                  }

                  if (this.slideInstances.length || !this.$children) {
                        this.slideInstances.forEach((child) => {
                              find(child);
                        })
                  }
                  else {
                        this.$children.forEach((child) => {
                              find(child);
                        });
                  }
            },
            // 更新滑动列表
            updateSlides (init) {
                  let slides = [];
                  let index = 1;

                  this.findChild((child) => {
                        slides.push({
                              $el: child.$el
                        });
                        child.index = index++;

                        if (init) {
                              this.slideInstances.push(child);
                        }
                  });

                  this.slides = slides;

                  // 更新内容位置
                  this.updatePos();
            },
            // 更新内容位置
            updatePos () {
                  this.findChild((child) => {
                        // 设置子节点宽度和高度
                        child.width = this.listWidth;
                        child.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
                  });

                  this.slotWidth = (this.slides.length || 0) * this.listWidth;
            },
            // 更新偏移位置
            updateOffset () {
                  this.$nextTick(() => {
                        let offset = this.loopSlotIndex > 0 ? -1 : 1;

                        this.slotOffset = this.slotIndex * this.listWidth;
                        this.slotLoopOffset = this.loopSlotIndex * this.listWidth * offset;
                  })
            }
      },
      watch: {
            // 监听高度
            height () {
                  // 更新内容位置
                  this.updatePos();
            },
            // 监听内容索引
            slotIndex () {
                  // 更新偏移位置
                  this.updateOffset()
            },
            // 监听循环内容索引
            loopSlotIndex () {
                  // 更新偏移位置
                  this.updateOffset()
            }
      },
      components: {
            IVueIcon
      }
}
</script>

<style>
</style>
