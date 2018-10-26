import IVueNotification from '../IVueNotification';

const prefixCls = 'ivue-notice';
const prefixKey = 'ivue_notice_key_';
let name = 1;
let top = 24;
let defaultDuration = 4.5;
let noticeInstance;

const iconTypes = {
      'success': 'check_circle_outline',
};

function getNoticeInstance () {
      noticeInstance = noticeInstance || IVueNotification.newInstance({
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
            const iconType = iconTypes[type];
            haveIcon = true;
            content = `
                  <div class="${prefixCls}-content ${prefixCls}-have-icon ${haveDesc}">
                        <i class="ivue-icon ${prefixCls}-icon-${type}">${iconType}</i>
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
      success (options) {
            return notice('success', options);
      }
}
