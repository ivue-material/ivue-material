<script>
import Colorable from '../../utils/mixins/Colorable';
import { provide as RegistrableProvide } from '../../utils/mixins/Registrable';

const prefixCls = 'ivue-bottom-nav';

export default {
  name: prefixCls,
  mixins: [Colorable, RegistrableProvide('buttonGroup')],
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
      listeners: [],
      // 判断是否是路由按钮
      // isRouteButton: [],
      // 是否开启监听导航路由
      ivueSyncRoute: false,
      // 是否正在销毁
      isDestroying: false
    }
  },
  mounted () {
    // 初始化
    this.update();

    this.$nextTick().then(() => {
      if (this.ivueSyncRoute) {
        this.setActiveItemByRoute()
      }

      window.setTimeout(() => {
        this.setupWatchers()
      }, 100);
    })
  },
  computed: {
    // class
    classes () {
      return {
        [`${prefixCls}--absolute`]: this.position === 'absolute',
        [`${prefixCls}--active`]: this.value,
        [`${prefixCls}--fixed`]: this.position === 'fixed',
        [`${prefixCls}--shift`]: this.shift
      }
    },
    // 实时计算高度
    computedHeight () {
      return parseInt(this.height);
    }
  },
  methods: {
    getValue (i) {
      if (this.buttons[i].value != null) {
        return this.buttons[i].value;
      }

      return i;
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
      const selected = [];

      for (let i = 0; i < this.buttons.length; i++) {
        const elm = this.buttons[i].$el;
        const button = this.buttons[i];

        if (this.isSelected(i)) {
          !button.to && (button.isActive = true);
          selected.push(i);
        }
        else {
          !button.to && (button.isActive = false);
        }

        if (button.to) {
          this.ivueSyncRoute = true;
        }
      }

      // if (selected.length === 1) {
      //   this.buttons[selected[0]].$el.setAttribute('data-only-child', 'true')
      // }

      //     this.listeners = [];

      //     this.buttons.forEach((key, index) => {
      //       this.listeners.push(this.updateValue.bind(this, index));

      //       // 设置是否激活
      //       // if (this.isSelected(index)) {
      //       //   key.$data.isActive = true;
      //       // }
      //       // else {
      //       //   key.$data.isActive = false;
      //       // }

      //       // 触发事件
      //       key.$on('mousedown', (event) => {
      //         this.listeners[index]();
      //       });

      //       // 判断是否有按钮路由导航
      //       // if (key.to) {
      //       //   this.ivueSyncRoute = true;
      //       // }

      //     });
    },
    register (button) {
      const index = this.buttons.length;
      this.buttons.push(button);

      this.listeners.push(this.updateValue.bind(this, index));

      button.$on('click', this.listeners[index]);
    },
    unregister (buttonToUnregister) {
      // Basic cleanup if we're destroying
      if (this.isDestroying) {
        const index = this.buttons.indexOf(buttonToUnregister);

        // 注销事件
        if (index !== -1) {
          buttonToUnregister.$off('click', this.listeners[index]);
        }
        return;
      }

      // 重新注册组件
      this.redoRegistrations(buttonToUnregister);
    },
    // 重新注册组件
    redoRegistrations (buttonToUnregister) {
      let selectedCount = 0

      const buttons = [];

      for (let index = 0; index < this.buttons.length; index++) {
        const button = this.buttons[index];

        if (button !== buttonToUnregister) {
          buttons.push(button);

          selectedCount += Number(this.isSelected(index));
        }

        button.$off('click', this.listeners[index]);
      }

      // 清除数据
      this.buttons = [];
      this.listeners = [];

      for (let index = 0; index < buttons.length; index++) {
        this.register(button[index]);
      }

    },
    // 设置watch
    setupWatchers () {
      // 监听路由变化
      if (this.ivueSyncRoute) {
        this.$watch('$route', {
          deep: true,
          handler (route) {
            if (this.ivueSyncRoute) {
              this.setActiveItemByRoute();
            }
          }
        })
      }

    },
    // 判断路由激活导航
    setActiveItemByRoute () {
      if (this.$router) {

        for (let i = 0; i < this.buttons.length; i++) {
          const button = this.buttons[i];

          if (button.to === (this.$router.path || this.$router.currentRoute.fullPath)) {
            button.$data.isActive = true;
          }
          else{
            button.$data.isActive = false;
          }
        }
      }
    }
  },
  // 实例销毁之前调
  beforeDestroy () {
    this.isDestroying = true;
  },
  watch: {
    active (index) {
      this.update();

      this.$emit('onChange', index);
    },
    buttons: 'update'
  },
  render (h) {
    return h('div', this.setBackgroundColor(this.color, {
      staticClass: prefixCls,
      'class': this.classes,
      style: {
        height: `${parseInt(this.computedHeight)}px`
      },
      ref: 'content',
      props: {
        value: this.active
      },
      on: {
        chang: this.updateValue
      }
    }), this.$slots.default);
  }
}
</script>