<template>
      <div :class="['ivue-ripple', rippleClasses]"
            @touchstart.passive="touchstart"
            @touchmove.passive="touchmove"
            @mousedown.passive="mousedown"
      >
            <slot></slot>
            <IvueWave v-for="ripple in ripples"
                      :key="ripple.uuid"
                      :class="['ivue-ripple-wave',waveClasses]"
                      :style="ripple.waveStyles"
                      @animating-end="clearWave()"
                      v-if="!ivueDisabled"
            >
            </IvueWave>
      </div>
</template>

<script>
// requestAnimationFrame polyfill for node and the browser.
import raf from 'raf';
import IvueUuid from '../../utils/ivue-uuid';
import IvueWave from './ivue-wave';

export default {
      name: 'ivue-ripple',
      props: {
            /*
            * 启用/禁用涟漪
            * 
            * @type {null}
            */
            ivueActive: {
                  type: null,
                  default: false
            },
            /*
            * 禁用按钮并阻止其操作
            * 
            * @type {Boolean}
            */
            ivueDisabled: {
                  type: Boolean,
                  default: false
            },
            /*
            * 涟漪效果居中
            * 
            * @type {Boolean}
            */
            ivueCentered: {
                  type: Boolean,
                  default: false
            },
            /*
            * 事件触发器
            * 
            * @type {Boolean}
            */
            ivueEventTrigger: {
                  type: Boolean,
                  default: true
            }
      },
      data () {
            return {
                  /*
                  * 涟漪数组
                  * 
                  * @type {Array}
                  */
                  ripples: [],
                  /*
                  * 触摸离开
                  * 
                  * @type {Boolean}
                  */
                  touchTimeout: null,
                  /*
                  * 事件类型
                  * 
                  * @type {String}
                  */
                  eventType: null
            }
      },
      computed: {
            // 涟漪class
            rippleClasses () {
                  return {
                        'ivue-disabled': this.ivueDisabled
                  }
            },
            waveClasses () {
                  return {
                        'ivue-centered': this.ivueCentered
                  }
            }
      },
      mounted () {
            if ('ontouchstart' in window) {
                  this.ripples = [];
            }
      },
      methods: {
            // 触摸开始
            touchstart (event) {
                  return this.ivueEventTrigger && this.touchStartCheck(event);
            },
            // 触摸移动
            touchmove (event) {
                  return this.ivueEventTrigger && this.touchMoveCheck(event);
            },
            // 鼠标点击
            mousedown () {
                  return this.ivueEventTrigger && this.startRipple(event);
            },
            // 检查触摸开始
            touchStartCheck ($event) {
                  this.touchTimeout = window.setTimeout(() => {
                        this.startRipple($event);
                  });
            },
            // 检查触摸移动
            touchMoveCheck () {
                  // 清除定时器
                  window.clearTimeout(this.touchTimeout)
            },
            // 涟漪开始
            startRipple ($event) {
                  raf(() => {
                        const { eventType, ivueDisabled, ivueCentered } = this;

                        if (!ivueDisabled && (!eventType || eventType === $event.type)) {
                              //当前元素位置 
                              let size = this.getSize();

                              // 涟漪位置
                              let position = null;

                              if (ivueCentered) {
                                    // 获取中心位置
                                    position = this.getCenteredPosition(size);
                              }
                              else {
                                    // 获取点击的位置
                                    position = this.getHitPosition($event, size);
                              }
                              // 事件类型
                              this.eventType = $event.type;

                              this.ripples.push({
                                    // 波浪 style
                                    waveStyles: this.applyStyles(position, size),
                                    uuid: IvueUuid()
                              })
                        }
                  })
            },
            // 获取当前元素位置
            getSize () {
                  const { offsetWidth, offsetHeight } = this.$el;

                  return Math.round(Math.max(offsetWidth, offsetHeight));
            },
            // 获取中心位置
            getCenteredPosition (size) {
                  // 一半大小
                  const halfSize = -size / 2 + 'px';

                  return {
                        'margin-top': halfSize,
                        'margin-left': halfSize
                  }

            },
            // 获取点击的位置 
            getHitPosition ($event, elementSize) {
                  // 元素的大小及其相对于视口的位置。
                  const rect = this.$el.getBoundingClientRect();
                  let top = $event.pageY;
                  let left = $event.pageX;


                  if ($event.type === 'touchstart') {
                        top = $event.changedTouches[0].pageY;
                        left = $event.changedTouches[0].pageX;
                  }

                  return {
                        top: top - rect.top - elementSize / 2 - document.documentElement.scrollTop + 'px',
                        left: left - rect.left - elementSize / 2 - document.documentElement.scrollLeft + 'px'
                  }
            },
            // 样式
            applyStyles (position, size) {
                  size += 'px';
                  return {
                        ...position,
                        window: size,
                        height: size
                  }
            },
            // 清除波纹效果
            clearWave (uuid) {
                  if (uuid) {
                        this.ripples = this.ripples.filter((ripple) => {
                              return ripple.uuid !== uuid
                        });
                  }
                  else {
                        this.ripples = [];
                  }
            }
      },
      watch: {
            ivueActive (active) {
                  const isBoolean = typeof active === 'boolean'
                  const isEvent = active.constructor.toString().match(/function (\w*)/)[1].toLowerCase() === 'mouseevent'

                  if (isBoolean && this.ivueCentered && active) {
                        this.startRipple({
                              type: 'mousedown'
                        })
                  } else if (isEvent) {
                        this.startRipple(active)
                  }

                  this.$emit('update:ivueActive', false)
            }
      },
      components: {
            IvueWave
      }
}
</script>
