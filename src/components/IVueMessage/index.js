import IvueNotification from '../IvueNotification';


const prefixCls = 'ivue-message';
const prefixKey = 'ivue_message_key_';

let name = 1;
let top = 24;
let defaultDuration = 1.5;
let messageInstance;

const iconTypes = {
      'success': 'check_circle',
      'info': 'info',
      'warning': 'warning',
      'error': 'error'
};

// 获取实例
function getMessageInstance () {
      messageInstance = messageInstance || IvueNotification.newInstance({
            prefixCls: prefixCls,
            styles: {
                  top: `${top}px`
            }
      });

      return messageInstance;
}


function notice (type, options) {
      // content
      const content = options.content || '';
      // duration
      const duration = (options.duration === 0) ? 0 : options.duration || defaultDuration;
      // onClose
      const onClose = options.onClose || function () { };
      // closable 
      const closable = options.closable || false;
      // render
      const render = options.render || function () { };
      // loading
      const loading = type === 'loading' ? 'ivue-load-loop' : '';
      let contents;

      const radius = 20;
      const size = 20;
      const percent = 20;
      const viewBoxSize = radius / (1 - 4 / +size);
      const circumference =  2 * Math.PI * radius
      const strokeDashoffset = ((100 - percent) / 100) * circumference + 'px';
      const strokeDasharray = Math.round(circumference * 1000) / 1000;
      const strokeWidth = 2 / +size * viewBoxSize * 2

      const iconType = iconTypes[type];

      let instance = getMessageInstance();

      if (type === 'loading') {
            contents = `
                  <div class="${prefixCls}-content">
                        <div class="ivue-progress-circular-indeterminate">
                              <svg  xmlns='http://www.w3.org/2000/svg'
                                    viewBox="${viewBoxSize} ${viewBoxSize} ${2 * viewBoxSize} ${2 * viewBoxSize}"
                                    class="${prefixCls}-loading ${loading}"
                                    v-if="${type} === 'loading'"
                              >
                                    <circle fill='transparent'
                                          cx="${2 * viewBoxSize}"
                                          cy="${2 * viewBoxSize}"
                                          r="20"
                                          stroke-width="${strokeWidth}"
                                          stroke-dasharray="${strokeDasharray}"
                                          stroke-dashoffset="${strokeDashoffset}"
                                          class="ivue-progress-circular-overlay"
                                    >
                                    </circle>
                              </svg>
                        </div>
                        <span>${content}</span>
                  </div>
            `
      }
      else{
            contents =  `
                  <div class="${prefixCls}-content ${prefixCls}-${type}">
                        <i class="ivue-icon ${prefixCls}-icon ${prefixCls}-icon-${type}" v-else>${iconType}</i>
                        <span>${content}</span>
                  </div>
            `     
      }

      instance.notice({
            prefixCls: prefixCls,
            name: `${prefixKey}${name}`,
            duration: duration,
            styles: {},
            transitionName: 'move-up',
            content: contents,
            render: render,
            onClose: onClose,
            closable: closable,
            type: 'message'
      });

      return (function () {
            let target = name++;

            return function () {
                  instance.remove(`${prefixKey}${target}`)
            }
      })();
}

export default {
      info (options) {
            return this.message('info', options);
      },
      success (options) {
            return this.message('success', options);
      },
      warning (options) {
            return this.message('warning', options);
      },
      error (options) {
            return this.message('error', options);
      },
      loading (options) {
            return this.message('loading', options);
      },
      config (options) {
            if (options.top || options.top === 0) {
                  top = options.top;
            }

            if (options.duration || options.duration === 0) {
                  defaultDuration = options.duration;
            }
      },
      message (type, options) {
            if (typeof options === 'string') {
                  options = {
                        content: options
                  }
            }

            return notice(type, options);
      },
      // 销毁所有组件
      destroy () {
            let instance = getMessageInstance();
            messageInstance = null;
            instance.destroy('ivue-message');
      }
}