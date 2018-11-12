export default {
      props: {
            /*
            * 当前激活 tab 面板的 name，可以使用 v-model 双向绑定数据
            * 
            * @type{String,Number}
            */
            value: [String, Number],
            /*
            * 导航高度
            * 
            * @type{String,Number}
            */
            height: {
                  type: [String, Number],
                  default: undefined,
                  validator: v => !isNaN(parseInt(v))
            },
            /*
            * 导航内容居中
            * 
            * @type{Boolean}
            */
            centered: Boolean,
            /*
            * 导航内容向右
            * 
            * @type{Boolean}
            */
            right: Boolean,
            /*
            * 滑动条颜色
            * 
            * @type{String}
            */
            sliderColor: String,
            /*
            * 滑动条隐藏
            * 
            * @type{Boolean}
            */
            hideSlider: Boolean,
            /*
            * 是否显示导航栏箭头
            * 
            * @type{Boolean}
            */
            showArrows: Boolean,
            nextIcon: {
                  type: String,
                  default: 'chevron_right'
            },
            prevIcon: {
                  type: String,
                  default: 'chevron_left'
            }
      }
}