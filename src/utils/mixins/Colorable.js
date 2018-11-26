import Vue from 'vue';

function isCssColor (color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
}

export default Vue.extend({
      name: 'colorable',
      props: {
            color: {
                  type: String,
                  default: ''
            }
      },
      methods: {
            // 设置背景颜色
            setBackgroundColor (color, data) {
                  if (isCssColor(color)) {
                        data.style = {
                              ...data.style,
                              'background-color': `${color}`,
                              'border-color': `${color}`
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
            // 设置文字颜色
            setTextColor (color, data) {
                  if (isCssColor(color)) {
                        data.style = {
                              ...data.style,
                              'color': `${color}`
                        }
                  }
                  else if (color) {
                        data.class = {
                              ...data.class,
                              [color]: true
                        }
                  }

                  return data;
            }
      }
});
