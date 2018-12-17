<script>
import IVueButtonContent from "./IVueButtonContent";
import IVueRouterLinkProps from "../../utils/IVueRouterLinkProps";
import Colorable from '../../utils/mixins/Colorable';

const prefixCls = 'ivue-button';

export default {
  name: "IVueButton",
  mixins: [Colorable],
  data () {
    return {
      /*
      * 波纹效果激活
      * 
      * @type {Boolean}
      */
      rippleActive: false,
      /*
      * 按钮是否激活状态
      * 
      * @type {Boolean}
      */
      isActive: false
    }
  },
  props: {
    /*
    * 在按钮上创建一个锚点。在这种情况下，生成的标签将是 a
    * 
    * @type {String}
    */
    href: {
      type: String,
      default: null
    },
    /*
    * 将类型应用于按钮 - 它不会影响链接
    * 
    * @type {String}
    */
    type: {
      type: String,
      default: 'button'
    },
    /*
    * 禁用该按钮并阻止其操作
    * 
    * @type {Boolean}
    */
    disabled: {
      type: Boolean,
      default: false
    },
    /*
    * 用于router-link 跳转
    * 
    * @type {String}
    */
    to: null,
    /*
    * 激活涟漪效果
    * 
    * @type {Boolean}
    */
    ivueRipple: {
      type: Boolean,
      default: true
    },
    /*
    * 是否扁平按钮
    * 
    * @type {Boolean}
    */
    flat: Boolean,
    /*
    * 凹陷的按钮依然保持其背景色，但没有框阴影
    * 
    * @type {Boolean}
    */
    depressed: Boolean,
    /*
    * 圆形图标
    * 
    * @type {Boolean}
    */
    icon: Boolean,
    /*
    * 轮廓按钮从当前色彩应用继承他们的边框颜色。
    * 
    * @type {Boolean}
    */
    outline: Boolean
  },
  computed: {
    rippleWorks () {
      return !this.disabled;
    },
    // 判断按钮是否激活
    activeButton () {
      if (this.isActive) {
        return `${prefixCls}--active`;
      }
    },
    classes () {
      return {
        [`${prefixCls}--raised`]: !this.flat,
        [`${prefixCls}--flat`]: this.flat,
        [`${prefixCls}--depressed`]: (this.depressed && !this.flat) || this.outline,
        [`${prefixCls}--icon`]: this.icon,
        [`${prefixCls}--outline`]: this.outline
      }
    }
  },
  components: {
    IVueButtonContent
  },
  render (createElement) {
    const buttonContent = createElement('IVueButtonContent', {
      // 正常的 HTML 特性
      attrs: {
        ivueRipple: this.ivueRipple,
        disabled: this.disabled
      },
      // 组件 props
      props: {
        ivueRippleActive: this.rippleActive
      },
      on: {
        'update:ivueRippleActive': active => this.rippleActive = active
      }
    }, this.$slots.default);

    let buttonAttrs = {
      staticClass: prefixCls,
      class: {
        'isMobile': this.mobile,
        'ivue-button--active': this.isActive,
        ...this.classes
      },
      data: {
        mobile: false
      },
      attrs: {
        ...this.attrs,
        href: this.href,
        disabled: this.disabled,
        type: !this.href && (this.type || 'button')
      },
      [this.to ? 'nativeOn' : 'on']: {
        ...this.$listeners,
        touchstart: (event) => {
          if (this.rippleWorks) {
            this.rippleActive = event;
          }
          this.$listeners.touchstart && this.$listeners.touchstart(event);

          this.mobile = true;
        },
        touchmove: (event) => {
          if (this.rippleWorks) {
            this.rippleActive = event;
          }
          this.$listeners.touchmove && this.$listeners.touchmove(event);

        },
        mousedown: (event) => {
          if (this.rippleWorks) {
            this.rippleActive = event;
          }
          this.$listeners.mousedown && this.$listeners.mousedown(event);

          this.$emit('mousedown', this);
        }
      }
    }

    let tag = 'button';

    if (this.href) {
      tag = 'a'
    }
    else if (this.$router && this.to) {
      this.$options.props = IVueRouterLinkProps(this, this.$options.props);

      tag = 'router-link';

      buttonAttrs.props = this.$props;

      delete buttonAttrs.props.type;
      delete buttonAttrs.attrs.type;
      delete buttonAttrs.props.href;
      delete buttonAttrs.attrs.href;
    }

    const setColor = (!this.outline && !this.flat) ? this.setBackgroundColor : this.setTextColor;

    return createElement(tag, setColor(this.color, buttonAttrs), [buttonContent]);
  }
}
</script>
