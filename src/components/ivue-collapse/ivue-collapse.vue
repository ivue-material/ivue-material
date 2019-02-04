<script>
import Color from '../../utils/mixins/colorable'

const prefixCls = 'ivue-collapse';

export default {
      name: prefixCls,
      mixins: [Color],
      props: {
            /**
             * 当前激活的面板的 name
             * 
             * @type {Array, String}
             */
            value: {
                  type: [Array, String]
            },
            collapseBgColor: {
                  type: String,
                  default: ''
            },
            /**
             * 是否开启手风琴效果
             * 
             * @type {Boolean}
             */
            accordion: {
                  type: Boolean,
                  default: false
            }
      },
      data () {
            return {
                  currentValue: this.value
            }
      },
      mounted () {
            this.setActive();
      },
      methods: {
            setActive () {
                  let activeKey = this.getActiveKey();

                  this.$children.forEach((child, index) => {
                        // 获取子组件名称
                        const name = child.name || index.toString;

                        // 激活子组件
                        child.isActive = activeKey.indexOf(name) > -1;

                        child.index = index;
                  });
            },
            // 获取激活的key
            getActiveKey () {
                  let activeKey = this.currentValue || [];

                  const accordion = this.accordion;

                  // 判断是否是数组
                  if (!Array.isArray(activeKey)) {
                        activeKey = [activeKey];
                  }

                  if (accordion && activeKey.length > 1) {
                        activeKey = [activeKey[0]];
                  }

                  for (let i = 0; i < activeKey.length; i++) {
                        // 把value字符串化
                        activeKey[i] = activeKey[i].toString();
                  }

                  return activeKey;
            },
            // 激活当前面板
            toggle (data) {
                  const name = data.name.toString();
                  let newActiveKey = [];

                  if (this.accordion) {
                        if (!data.isActive) {
                              newActiveKey.push(name)
                        }
                  }
                  else {
                        let activeKey = this.getActiveKey();
                        const nameIndex = activeKey.indexOf(name);

                        if (data.isActive) {
                              if (nameIndex > -1) {
                                    activeKey.splice(nameIndex, 1);
                              }
                        }
                        else {
                              if (nameIndex < 0) {
                                    activeKey.push(name);
                              }
                        }

                        newActiveKey = activeKey;

                  }

                  this.currentValue = newActiveKey;


                  this.$emit('input', newActiveKey);

                  console.log(newActiveKey)

                  // 切换面板是触发，返回当前展开的面板的 key，格式为数组
                  this.$emit('on-change', newActiveKey);
            }
      },
      watch: {
            value (val) {
                  this.currentValue = val;
            },
            currentValue () {
                  this.setActive();
            }
      },
      render () {
            return this.$createElement('div', this.setBackgroundColor(this.collapseBgColor, {
                  'class': {
                        [`${prefixCls}`]: true
                  }
            }), this.$slots.default)
      }
}
</script>
