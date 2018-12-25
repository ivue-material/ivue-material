<template>
      <!-- 显示成小红点 -->
      <span :class="classes" v-if="dot">
            <slot></slot>
            <transition :name="`${prefixCls}-fade`">
                  <span :style="styles" :class="dotClasses" v-show="showBadge"></span>
            </transition>
      </span>
      <!-- 普通显示 -->
      <span :class="classes" v-else>
            <slot></slot>
            <transition :name="`${prefixCls}-fade`">
                  <span :style="styles" :class="countClasses" v-show="showBadge">{{finalCount}}</span>
            </transition>
      </span>
</template>

<script>
const prefixCls = 'ivue-badge';

function isCssColor (color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
}

export default {
      name: prefixCls,
      props: {
            /*
            * 显示的数字
            * 
            * @type{Number}
            */
            count: Number,
            /*
            * 封顶的数字值
            * 
            * @type{Number, String}
            */
            overflowCount: {
                  type: [Number, String],
                  default: 99
            },
            /*
            * 数字偏移位置
            *
            * type {Array}
            */
            offset: {
                  type: Array
            },
            /*
            * 显示成小红点
            *
            * @type {Boolean}
            */
            dot: {
                  type: Boolean,
                  default: false
            },
            /*
            * 当数值为0是是否显示
            *
            * @type {Boolean}
            */
            showZero: {
                  type: Boolean,
                  default: false
            },
            /*
            * 自定义内容
            *
            * @type {String}
            */
            text: {
                  type: String,
                  default: ''
            },
            /*
            * 颜色
            *
            * @type {String}
            */
            color: {
                  type: String,
                  default: '#ed4014'
            },
            // 是否显示徽标
            show: {
                  type: Boolean,
                  default: true
            }
      },
      data () {
            return {
                  prefixCls: prefixCls
            }
      },
      computed: {
            classes () {
                  return `${prefixCls}`;
            },
            // dot颜色
            dotClasses () {
                  let _color = {};

                  if (isCssColor(this.color)) {
                        _color = { 'background-color': `${this.color}` };
                  }
                  else if (this.color) {
                        _color = { [this.color]: true }
                  }

                  return [
                        `${prefixCls}-dot`,
                        _color
                  ]
            },
            countClasses () {
                  let _color = {};

                  if (isCssColor(this.color)) {
                        _color = { 'background-color': `${this.color}` };
                  }
                  else if (this.color) {
                        _color = { [this.color]: true }
                  }
                  return [
                        `${prefixCls}-count`,
                        _color
                  ]
            },
            // 判断是否显示封顶数字值
            finalCount () {
                  const { count, overflowCount, text } = this;

                  // 判断是否有文字
                  if (text !== '') {
                        return text;
                  }

                  // 显示的数字 >= 封顶的数字值  ? 封顶的数字值+ : 显示的数字
                  return parseInt(count) >= parseInt(overflowCount) ? `${overflowCount}+` : count;
            },
            // 是否显示数字
            showBadge () {
                  const { count, dot, showZero, text } = this;

                  let status = false;


                  if (!this.show) {
                        return this.show
                  }

                  // 是否有数字
                  if (count) {
                        // 是否等于0
                        status = !(parseInt(count) === 0);
                  }

                  // 是否显示成小红点
                  if (dot) {
                        status = true;
                        if (count !== null) {
                              // 是否等于0
                              if (parseInt(count) === 0) {
                                    status = false;
                              }
                        }
                  }

                  // 是否有文本
                  if (text !== '') {
                        status = true;
                  }

                  // 0不显示 ||  当数值为0是是否显示
                  return status || showZero;
            },
            // 微标位置
            styles () {
                  const style = {};

                  if (this.offset && this.offset.length === 2) {
                        style['margin-top'] = `${this.offset[0]}px`;
                        style['margin-right'] = `${this.offset[1]}px`;
                  }

                  if (isCssColor(this.color)) {
                        style['background-color'] = this.color;
                  }

                  return style;
            }
      }
}
</script>
