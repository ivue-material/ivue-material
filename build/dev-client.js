/**
 * @file 开发环境客户端
 */
'use strict'

// 用于W3C EventSource的浏览器polyfill（http://www.w3.org/TR/eventsource/
require('eventsource-polyfill');

// noInfo - 设置为true禁用信息控制台日志记录。
// reload - 设置为true以在webpack卡住时自动重新加载页面。
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (evnet) {
    if (evnet.action === 'reload') {
        window.location.reload();
    }
});
