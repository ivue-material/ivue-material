<script>
function isCssColor (color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/);
}


export default {
      props: {
            /*
            * 当前激活的导航
            * 
            * @type {Number, String}
            */
            active: {
                  type: [Number, String],
                  default: null
            },
            /*
            * 设置组件高度
            * 
            * @type {Number, String}
            */
            height: {
                  type: [Number, String],
                  default: 56,
                  validator: (v) => {
                        return !isNaN(parseInt(v))
                  }

            },
            /*
            * 控制可见性
            * 
            * @type {Boolean}
            */
            value: {
                  type: Boolean,
                  default: false
            },
            /*
            * 导航栏颜色
            * 
            * @type {String}
            */
            color: {
                  type: String,
                  default: null
            },
            /*
            * 导航栏 position
            * 
            * @type {String}
            */
            position: {
                  type: String,
                  default: null
            }
      },
      data () {
            return {
                  // 按钮导航数组
                  buttons: []
            }
      },
      mounted () {
            if (this.$children.length > 0) {
                  this.buttons = this.$children;

                  this.update()
            }
      },
      computed: {
            // class
            classes () {
                  return {
                        'ivue-bottom-nav--absolute': this.position === 'absolute',
                        'ivue-bottom-nav--active': this.value,
                        'ivue-bottom-nav--fixed': this.position === 'fixed'
                  }
            },
            // 实时计算高度
            computedHeight () {
                  return parseInt(this.height);
            }
      },
      methods: {
            // 设置背景颜色
            setBackgroundColor (color, data) {
                  if (isCssColor(color)) {
                        data.style = {
                              ...data.style,
                              'background-color': `${this.color}`,
                              'border-color': `${this.color}`
                        }
                  }
                  else if (color) {
                        data.class = {
                              ...data.class,
                              [color]: true
                        }
                  }

                  return data;
            },
            // 判断是否选中
            isSelected (i) {
                  let item;

                  if (this.buttons[i]) {
                        item = i;
                  }

                  return this.active === item;
            },
            // 更新数据
            update () {
                  const selected = [];

                  for (let i = 0; i < this.buttons.length; i++) {
                        const elm = this.buttons[i].$el;
                        const button = this.buttons[i];

                        // 设置是否激活
                        if (this.isSelected(i)) {
                              button.isActive = true;
                              // !button.to && (button.isActive = true);
                              selected.push(i);
                              console.log(button)
                        }
                        else {
                              !button.to && (button.isActive = false);
                        }

                  }
            }
      },
      watch: {
            active () {
                  this.update();
            }
      },
      render (h) {
            return h('div', this.setBackgroundColor(this.color, {
                  staticClass: 'ivue-bottom-nav',
                  'class': this.classes,
                  style: {
                        height: `${parseInt(this.computedHeight)}px`
                  },
                  ref: 'content'
            }), this.$slots.default);
      }
}
</script>