import IvueNotification from '../ivue-notification';

const prefixCls = 'ivue-notice';
const prefixKey = 'ivue_notice_key_';
let name = 1;
let top = 24;
let defaultDuration = 4.5;
let noticeInstance;

const iconTypes = {
      'success': 'check_circle',
      'info': 'info',
      'warning': 'warning',
      'error': 'error'
};

const noTitleTypes = {
      'success': 'check_circle',
      'info': 'info',
      'warning': 'warning',
      'error': 'error'
};

function getNoticeInstance () {
      noticeInstance = noticeInstance || IvueNotification.newInstance({
            prefixCls: prefixCls,
            styles: {
                  top: `${top}px`,
                  right: 0
            }
      });

      return noticeInstance;
}

function notice (type, options) {
      // 标题
      const title = options.title || '';
      // 描述
      const desc = options.desc || '';
      // key
      const key = options.name || `${prefixKey}${name}`;
      // onclose
      const onClose = options.onClose || function () { };
      // render
      const render = options.render;
      // duration
      const duration = (options.duration === 0) ? 0 : options.duration || defaultDuration;

      name++;

      let instance = getNoticeInstance();

      let content;

      let haveIcon;

      const haveDesc = (options.render && !title) ? '' : (desc || options.render) ? `${prefixCls}-have-desc` : '';

      if (type === 'normal') {
            haveIcon = false;
            content = `
                  <div class="${prefixCls}-content ${haveDesc}">
                        <div class="${prefixCls}-title">${title}</div>
                        <div class="${prefixCls}-desc">${desc}</div>
                  </div>
            `
      }
      else {
            const iconType = haveDesc === '' ? noTitleTypes[type] : iconTypes[type];
            haveIcon = true;
            content = `
                  <div class="${prefixCls}-content ${prefixCls}-have-icon ${haveDesc}">
                        <i class="ivue-icon ${prefixCls}-icon ${prefixCls}-icon-${type}">${iconType}</i>
                        <div class="${prefixCls}-title">${title}</div>
                        <div class="${prefixCls}-desc">${desc}</div>
                  </div>
            `
      }

      instance.notice({
            prefixCls: prefixCls,
            name: key.toString(),
            duration: duration,
            styles: {},
            transitionName: 'move-notice',
            content: content,
            render: render,
            onClose: onClose,
            closable: true,
            type: 'notice',
            haveIcon: haveIcon
      });
}

export default {
      open (options) {
            return notice('normal', options);
      },
      info (options) {
            return notice('info', options);
      },
      warning (options) {
            return notice('warning', options);
      },
      success (options) {
            return notice('success', options);
      },
      error (options) {
            return notice('error', options);
      },
      // 全局配置
      config (options) {
            if (options.top) {
                  top = options.top;
            }

            if (options.duration || options.duration === 0) {
                  defaultDuration = options.duration;
            }
      },
      // 关闭某个通知
      close (name) {
            if (name) {
                  name = name.toString();
                  if (noticeInstance) {
                        noticeInstance.remove(name);
                  }
            }
            else {
                  return false;
            }
      },
      // 销毁所有组件
      destroy(){
            let instance = getNoticeInstance();
            noticeInstance = null;
            instance.destroy('ivue-notice');
      }
}
