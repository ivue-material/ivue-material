import IVueLoadingBar from './IVueLoadingBar.js';

let IVueLoadingBarInstance;
let color = 'primary';
let failedColor = 'error';
let height = 2;
let timer;

// 获取组件实例
function getIVueLoadingBarInstance () {
      IVueLoadingBarInstance = IVueLoadingBarInstance || IVueLoadingBar.newInstance({
            color: color,
            failedColor: failedColor,
            height: height
      });

      return IVueLoadingBarInstance;
}

// 更新组件
function update (options) {
      let instance = getIVueLoadingBarInstance();

      instance.update(options);
}

// 隐藏组件
function hide () {
      setTimeout(() => {
            update({
                  show: false
            });

            setTimeout(() => {
                  update({
                        percent: 0
                  })
            }, 200);
      }, 800);
}

// 清除定时器
function clearTimer () {
      if (timer) {
            clearInterval(timer);
            timer = null;
      }
}


export default {
      // 开始
      start () {
            if (timer) {
                  return;
            }

            let percent = 0;

            update({
                  percent: percent,
                  status: 'success',
                  show: true
            });


            // 设置进度
            timer = setInterval(() => {
                  percent += Math.floor(Math.random() * 3 + 1);
                  // 进度大于95清除定时器
                  if (percent > 95) {
                        clearTimer();
                  }
                  update({
                        percent: percent,
                        start: 'success',
                        show: true
                  })
            }, 200);
      },
      // 更新
      update (percent) {
            clearTimer();
            update({
                  percent: percent,
                  start: 'success',
                  show: true
            });
      },
      // 完成
      finish () {
            clearTimer();
            update({
                  percent: 100,
                  status: 'success',
                  show: true
            });
            hide();
      },
      // 错误
      error () {
            clearTimer();
            update({
                  percent: 100,
                  status: 'error',
                  show: true
            });
            hide();
      },
      // 公共参数
      config (options) {
            if (options.color) {
                  color = options.color;
            }
            if (options.failedColor) {
                  failedColor = options.failedColor;
            }
            if (options.height) {
                  height = options.height;
            }
      },
      // 销毁
      destroy(){
            clearTimer();
            let instance = getIVueLoadingBarInstance();
            IVueLoadingBarInstance = null;
            instance.destroy();
      }
};