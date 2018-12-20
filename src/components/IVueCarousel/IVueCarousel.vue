<template>
      <div :class="classes" v-touch="{
                                          left: e => (e.offsetX < -15) && arrowEvent(1),
                                          right: e => (e.offsetX > 15) && arrowEvent(-1)
                                    }">
            <!-- 左按钮 -->
            <IvueButton :class="arrowClasses" class="left ivue-icon-button" flat icon>
                  <IvueIcon>{{leftArrow}}</IvueIcon>
            </IvueButton>
            <!-- 内容 -->
            <div :class="[prefixCls + '-list']">
                  <div :class="[prefixCls + '-track', showCopyTrack ? '' : 'higher']" :style="trackStyles" ref="originTrack">
                        <slot></slot>
                  </div>
                  <!-- loop开启时使用 -->
                  <div :class="[prefixCls + '-track', showCopyTrack ? 'higher' : '']"  :style="copyTrackStyles" ref="copyTrack" v-if="loop"></div>
            </div>
            <!-- 右按钮 -->
            <IvueButton :class="arrowClasses" class="right ivue-icon-button" @click="arrowEvent(1)" flat icon>
                  <IvueIcon>{{rightArrow}}</IvueIcon>
            </IvueButton>
            <!-- 导航器 -->
            <ul :class="dotsClasses">
                  <li   v-for="index in slides.length" 
                        :key="index"
                        :class="[index -1 === currentIndex ? prefixCls + '-active' : '']"
                        @click="dotsEvent('click', index-1)"
                        @mouseover="dotsEvent('hover', index-1)"
                  >
                        <button type="button" :class="[radiusDot ? 'radius' : '']"></button>
                  </li>
            </ul>
      </div>
</template>

<script>
import { getStyle, oneOf } from '../../utils/Assist';
import { on, off } from '../../utils/Dom';
import IvueIcon from '../IvueIcon/IvueIcon';
import IvueButton from '../IvueButton/IvueButton';
import Touch from '../../utils/directives/Touch';

const prefixCls = 'ivue-carousel';

export default {
      name: prefixCls,
      directives: {Touch},
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
            },
            /*
            * 是否自动切换
            * 
            * @type {Boolean}
            */
            autoplay: {
                  type: Boolean,
                  default: false
            },
            /*
            * 自动切换的时间间隔，单位为毫秒
            * 
            * @type {Number}
            */
            autoplaySpeed: {
                  type: Number,
                  default: 2000
            },
            /*
            * 指示器的位置，可选值为 inside （内部），outside（外部），none（不显示）	
            * 
            * @type {String}
            */
            dots: {
                  type: String,
                  default: 'inside',
                  validator (value) {
                        return oneOf(value, ['inside', 'outside', 'none'])
                  }
            },
            /*
            * 是否显示圆形指示器
            * 
            * @type {Boolean}
            */
            radiusDot: {
                  type: Boolean,
                  default: false
            },
            /*
            * 指示器的触发方式，可选值为 click（点击），hover（悬停）
            * 
            * @type {String}
            */
            trigger: {
                  type: String,
                  default: 'click',
                  validator (value) {
                        return oneOf(value, ['click', 'hover'])
                  }
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
                  * 跟踪宽度
                  * @type {Number}
                  */
                  trackWidth: 0,
                  /*
                  * 跟踪偏移位置
                  * @type {Number}
                  */
                  trackOffset: 0,
                  /*
                  * 跟踪索引位置
                  * @type {Number}
                  */
                  trackIndex: this.value,
                  /*
                  * 跟踪内容偏移位置
                  * @type {Number}
                  */
                  trackCopyOffset: 0,
                  /*
                  * 跟踪复制索引位置
                  * @type {Number}
                  */
                  trackCopyIndex: this.value,
                  /*
                  * 显示复制的内容
                  * @type {Boolean}
                  */
                  showCopyTrack: false,
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
                  * 当前内容索引位置
                  * @type {Number}
                  */
                  currentIndex: this.value,
                  /*
                  * 跟踪滑动位置
                  * @type {Number}
                  */
                  hideTrackPos: -1
            }
      },
      mounted () {
            // 监听调整大小
            this.handleResize();
            // 设置自动播放
            this.setAutoplay();

            on(window, 'resize', this.handleResize);
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
            trackStyles () {
                  return {
                        width: `${this.trackWidth}px`,
                        transform: `translate3d(${-this.trackOffset}px, 0px, 0px)`,
                        transition: `transform 500ms ${this.easing}`
                  }
            },
            // 复制的内容的样式
            copyTrackStyles () {
                  return {
                        width: `${this.trackWidth}px`,
                        transform: `translate3d(${-this.trackCopyOffset}px, 0px, 0px)`,
                        transition: `transform 500ms ${this.easing}`,
                        position: 'absolute',
                        top: 0
                  }
            },
            // dots 样式
            dotsClasses () {
                  return [
                        `${prefixCls}-dots`,
                        `${prefixCls}-dots-${this.dots}`
                  ]
            }
      },
      methods: {
            // 初始化复制内容节点
            initCopyTrackDom () {
                  this.$nextTick(() => {
                        this.$refs.copyTrack.innerHTML = this.$refs.originTrack.innerHTML;
                  });
            },
            // 当slot改变时使用
            slotChange (thisChild) {
                  this.$nextTick(() => {
                        this.slides = [];
                        this.slideInstances = [];

                        // 更新滑动列表
                        this.updateSlides(true);
                        // 更新内容宽度高度
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
                                    find(innerChild, cb);
                              });
                        }
                  };

                  if (this.slideInstances.length || !this.$children) {
                        this.slideInstances.forEach((child) => {
                              find(child);
                        });
                  } else {
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

                  // 获取滑动列表数量
                  this.slides = slides;

                  // 更新内容宽度高度
                  this.updatePos();
            },
            // 更新内容宽度高度
            updatePos () {
                  this.findChild((child) => {
                        // 设置子节点宽度和高度
                        child.width = this.listWidth;
                        child.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
                  });

                  // 跟踪宽度
                  this.trackWidth = (this.slides.length || 0) * this.listWidth;
            },
            // 更新偏移位置
            updateOffset () {
                  this.$nextTick(() => {
                        let offset = this.trackCopyIndex > 0 ? -1 : 1;

                        // 跟踪偏移位置
                        this.trackOffset = this.trackIndex * this.listWidth;
                        // 跟踪复制内容的偏移位置
                        this.trackCopyOffset = this.trackCopyIndex * this.listWidth + offset;
                  });
            },
            // 更新跟踪位置
            updateTrackPos (index) {
                  // 显示复制的内容
                  if (this.showCopyTrack) {
                        // 跟踪索引位置
                        this.trackIndex = index
                  }
                  else {
                        // 跟踪复制索引位置
                        this.trackCopyIndex = index;
                  }
            },
            // 更新跟踪索引
            updateTrackIndex (index) {
                  // 显示复制的内容
                  if (this.showCopyTrack) {
                        // 跟踪复制索引位置
                        this.trackCopyIndex = index;
                  }
                  else {
                        // 跟踪索引位置
                        this.trackIndex = index;
                  }

                  // 当前索引
                  this.currentIndex = index;
            },
            // 监听调整大小
            handleResize () {
                  // 当前列表宽度
                  this.listWidth = parseInt(getStyle(this.$el, 'width'));

                  // 更新内容宽度高度
                  this.updatePos();
                  // 更新偏移位置
                  this.updateOffset();
            },
            add (offset) {
                  // 获取内容数量
                  let slidesLen = this.slides.length;

                  // 如果是无缝滚动，需要初始化双内容位置
                  if (this.loop) {
                        if (offset > 0) {
                              // 跟踪滑动位置
                              this.hideTrackPos = -1;
                        }
                        else {
                              // 跟踪滑动位置
                              this.hideTrackPos = slidesLen;
                        }

                        // 更新跟踪位置
                        this.updateTrackPos(this.hideTrackPos);
                  }

                  // 获取当前显示图片的索引 如果显示复制的内容 跟踪复制索引位置 否则 跟踪索引位置
                  const oldIndex = this.showCopyTrack ? this.trackCopyIndex : this.trackIndex;

                  let index = oldIndex + offset;

                  while (index < 0) {
                        index += slidesLen;
                  }

                  // 判断到达边界点
                  if (((offset > 0 && index === slidesLen) || (offset < 0 && index === slidesLen - 1)) && this.loop) {
                        // 极限值（左滑：当前索引为总图片张数， 右滑：当前索引为总图片张数 - 1）切换内容

                        // 显示复制的内容
                        this.showCopyTrack = !this.showCopyTrack;
                        // 跟踪索引位置
                        this.trackIndex += offset;
                        //  跟踪复制索引位置
                        this.trackCopyIndex += offset;
                  }
                  else {
                        if (!this.loop) {
                              index = index % this.slides.length;
                        }

                        // 更新跟踪索引
                        this.updateTrackIndex(index);
                  }

                  // 当前内容索引
                  this.currentIndex = index === this.slides.length ? 0 : index;

                  // 发送点击事件
                  this.$emit('onChange', oldIndex, this.currentIndex);
                  this.$emit('currentIndex', this.currentIndex);
            },
            // 设置自动播放
            setAutoplay () {
                  window.clearInterval(this.timer);

                  if (this.autoplay) {
                        this.timer = window.setInterval(() => {
                              this.add(1);
                        }, this.autoplaySpeed);
                  }
            },
            // 切换内容事件
            arrowEvent (offset) {
                  this.setAutoplay();
                  this.add(offset);
            },
            // dots 点击
            dotsEvent (event, index) {
                  // 获取当前显示图片的索引 如果显示复制的内容 跟踪复制索引位置 否则 跟踪索引位置
                  let currentIndex = this.showCopyTrack ? this.trackCopyIndex : this.trackIndex;

                  if (event === this.trigger && currentIndex !== index) {
                        // 更新跟踪索引
                        this.updateTrackIndex(index);

                        // 发送点击事件
                        this.$emit('currentIndex', index);

                        // 激活时重置自动播放计时器
                        this.setAutoplay();
                  }
            }
      },
      beforeDestroy () {
            off(window, 'resize', this.handleResize);
      },
      watch: {
            // 是否自动切换
            autoplay () {
                  this.setAutoplay();
            },
            // 是否自动切换速度
            autoplaySpeed () {
                  this.setAutoplay();
            },
            // 跟踪索引位置
            trackIndex () {
                  this.updateOffset();
            },
            // 跟踪复制索引位=置
            trackCopyIndex () {
                  this.updateOffset();
            },
            // 轮播图高度
            height () {
                  this.updatePos();
            },
            // 幻灯片的索引
            value (value) {
                  this.updateTrackIndex(value);
                  this.setAutoplay();
            }
      },
      components: {
            IvueIcon,
            IvueButton
      }
}
</script>

