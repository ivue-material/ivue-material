<template>
      <span v-if="dot" :class="prefixCls">
            <slot></slot>
            <span :style="styles" :class="dotClasses" v-show="showBadge"></span>
      </span>
      <span v-else :class="prefixCls">
            <slot></slot>
            <span :style="styles" :class="countClasses" v-show="showBadge">{{finalCount}}</span>
      </span>
</template>

<script>
const prefixCls = 'ivue-badge';

export default {
      name: 'IVueBadge',
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
            }
      },
      data () {
            return {
                  prefixCls: prefixCls
            }
      },
      computed: {
            dotClasses () {
                  return `${prefixCls}-dot`
            },
            countClasses () {
                  return [
                        `${prefixCls}-count`
                  ]
            },
            // 判断是否显示封顶数字值
            finalCount () {
                  const { count, overflowCount,text } = this;

                  if (text !== '') {
                        return text;
                  }

                  return parseInt(count) >= parseInt(overflowCount) ? `${overflowCount}+` : count;
            },
            // 是否显示数字
            showBadge () {
                  const { count, dot, showZero,text } = this;

                  let status = false;

                  if (count) {
                        status = !(parseInt(count) === 0);
                  }

                  if (dot) {
                        status = true;
                        if (count !== null) {
                              if (parseInt(count) === 0) {
                                    status = false;
                              }
                        }
                  }

                  if (text !== '') {
                        status = true;
                  }

                  return status || showZero;
            },
            // 数字位置
            styles () {
                  const style = {};

                  if (this.offset && this.offset.length === 2) {
                        style['margin-top'] = `${this.offset[0]}px`;
                        style['margin-right'] = `${this.offset[1]}px`;
                  }

                  return style;
            }
      }
}
</script>
