<template>
      <div class="ivue-select-dropdown" :class="className"  :style="styles">
            <slot></slot>
      </div>
</template>

<script>
import Vue from 'vue';
import { getStyle } from '../../utils/assist';

const isServer = Vue.prototype.$isServer;

export default {
      name: 'ivue-select-dropdown',
      props: {
            className: {
                  type: String
            }
      },
      data () {
            return {
                  // 宽度
                  width: ''
            }
      },
      created () {
            this.$on('on-update-drop-down', this.update);
      },
      computed: {
            styles () {
                  let style = {};
                  if (this.width) {
                        style.width = `${this.width}px`;
                  }
                  return style;
            }
      },
      methods: {
            // 更新数据
            update () {
                  // 判断是否是服务器端
                  if (isServer) {
                        return;
                  }

                  // 设置输入框的宽度为100％
                  if (this.$parent.$options.name === 'ivue-select') {
                        this.width = parseInt(getStyle(this.$parent.$el, 'width'));
                  }
                  else if (this.$parent.$parent.$options.name === 'ivue-select') {
                        this.width = parseInt(getStyle(this.$parent.$parent.$el, 'width'));
                  }
            }
      }
}
</script>
