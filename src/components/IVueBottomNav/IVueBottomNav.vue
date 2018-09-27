<script>
function isCssColor (color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/);
}


export default {
      name: 'IVueBottomNav',
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
            },
            /*
            * 不是激活状态时隐藏按钮上的文字
            * 
            * @type {Boolean}
            */
            shift: {
                  type: Boolean,
                  default: false
            }
      },
      data () {
            return {
                  // 按钮导航数组
                  buttons: [],
                  // 监听事件列表
                  listeners: []
            }
      },
      mounted () {
            // 初始化
            if (this.$children.length > 0) {
                  this.update();
            }
      },
      computed: {
            // class
            classes () {
                  return {
                        'ivue-bottom-nav--absolute': this.position === 'absolute',
                        'ivue-bottom-nav--active': this.value,
                        'ivue-bottom-nav--fixed': this.position === 'fixed',
                        'ivue-bottom-nav--shift': this.shift
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
            getValue (i) {
                  if (this.buttons[i]) {
                        return i;
                  }

                  return;
            },
            // 判断是否选中
            isSelected (i) {
                  const item = this.getValue(i);

                  return this.active === item;
            },
            // 更新当前激活的导航
            updateValue (i) {
                  const item = this.getValue(i);

                  this.$emit('update:active', item);
            },
            // 更新数据
            update () {
                  this.buttons = this.$children;

                  for (let i = 0; i < this.buttons.length; i++) {
                        const button = this.buttons[i];

                        // 设置是否激活
                        if (this.isSelected(i)) {
                              !button.to && (button.$data.isActive = true);
                        }
                        else {
                              !button.to && (button.$data.isActive = false);
                        }

                        this.listeners.push(this.updateValue.bind(this, i));

                        // 触发事件
                        button.$on('mousedown', (event) => {
                              this.listeners[i]();
                        });
                  }
            }
      },
      // 实例销毁之前调
      beforeDestroy () {
            for (let i = 0; i < this.buttons.length; i++) {
                  const button = this.buttons[i];

                  // 销毁事件
                  button.$off('mousedown', this.listeners[i]);
            }
            this.buttons = [];
            this.listeners = [];
      },
      watch: {
            active (index) {
                  this.update();

                  this.$emit('onChange', index);
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