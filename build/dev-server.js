/**
 * @file 开发环境服务端
 */

/* eslint-disable no-console */

'use strict';

require('./check-versions')();
const config = require('../config');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const opn = require('opn');
const path = require('path');
const webpack = require('webpack');
const express = require('express');
// 轻松的配置代理服务器中间件
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = require('./webpack.dev');

let app = express();
// 默认调试服务器端口
let port = process.env.PORT || config.dev.port;

// 启动调试服务器时是否自动打开浏览器，默认为 false
let autoOpenBrowser = !!config.dev.autoOpenBrowser;
let compiler = webpack(webpackConfig);

// 中间件处理内存中的文件
// 如果文件在监视模式下更改，则中间件会延迟请求，直到编译完成。
let devMiddleware = require('webpack-dev-middleware')(compiler, {
    // 当使用按需加载或加载外部资源（如图像，文件等）时，这是一个重要选项
    publicPath: webpackConfig.output.publicPath,
    quiet: true
});

// 热重装
let hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: function () { }
});

// 当 html-webpack-plugin 的模版文件更新的时候，强制重新刷新调试页面
compiler.hooks.shouldEmit.tap('compilation', function (compilation) {
    compilation.hooks.additionalAssets.tapAsync('html-webpack-plugin-after-emit', function (data, cb) {

        hotMiddleware.publish({
            action: 'reload'
        });
        cb();
    });
});

// 指定需要代理的请求列表
let proxyTable = config.dev.proxyTable;

// 代理请求
Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context];

    if (typeof options === 'string') {
        options = {
            target: options
        };
    }

    // context：确定应将哪些请求代理到目标主机
    // options.target：要代理的目标主机
    app.use(proxyMiddleware(options.filter || context, options))
});

// 处理 history API 的回退情况（如果在线上环境中，也需要服务器做相应处理）
app.use(require('connect-history-api-fallback')());

// 服务器部署 webpack 打包的静态资源
app.use(devMiddleware);

// 使用热更新， 如果编译出现错误会实时展示编译错误
app.use(hotMiddleware);

let url = 'http://localhost:' + port;

let newResolve;
let readyPromise = new Promise(function (resolve) {
    newResolve = resolve;
});

console.log('> Starting dev server...');

// 当编译器包有效时，通常在编译之后执行回调函数
// 捆绑包生效时执行的功能。如果捆绑在调用时有效，则立即执行回调。
devMiddleware.waitUntilValid(function () {
    console.log('> Listening at ' + url + '\n');

    // 当测试环境下，不需要打开浏览器
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(url);
    }

    newResolve();
});

let server = app.listen(port);

module.exports = {
    ready: readyPromise,
    close: function () {
        server.close();
    }
}
