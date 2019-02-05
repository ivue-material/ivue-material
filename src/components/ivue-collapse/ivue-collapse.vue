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
            // 设置激活的面板
            setActive () {
                  let activeKey = this.getActiveKey();

                  // 循环面板
                  this.$children.forEach((child, index) => {
                        // 获取子组件名称
                        const name = child.name || index.toString;

                        // 激活子组件 
                        child.isActive = activeKey.indexOf(name) > -1;

                        // 设置子组件 index
                        child.index = index;
                  });
            },
            // 获取激活的key
            getActiveKey () {
                  // 获取初始化需要激活的面板
                  let activeKey = this.currentValue || [];

                  // 是否开启手风琴效果
                  const accordion = this.accordion;

                  // 判断是否是数组
                  if (!Array.isArray(activeKey)) {
                        activeKey = [activeKey];
                  }

                  // 手风琴效果
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

                  // 手风琴效果
                  if (this.accordion) {
                        if (!data.isActive) {
                              newActiveKey.push(name)
                        }
                  }
                  // 普通效果
                  else {

                        // 获取当前需要激活的面板
                        let activeKey = this.getActiveKey();

                        // 面板的 index
                        const nameIndex = activeKey.indexOf(name);

                        // 是否已经激活
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

                  // 重新设置当前激活的面板
                  this.currentValue = newActiveKey;

                  // 设置 v-model
                  this.$emit('input', newActiveKey);

                  // 切换面板是触发，返回当前展开的面板的 key，格式为数组
                  this.$emit('on-change', newActiveKey);
            }
      },
      watch: {
            // 监听 v-model 变化
            value (val) {
                  this.currentValue = val;
            },
            // 重新设置激活的面板
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
