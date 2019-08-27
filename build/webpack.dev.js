/**
 * @file 开发环境 webpack 配置文件
 */

// 'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 识别某些类别的webpack错误，并清理，聚合和优先级，以提供更好的开发人员体验。
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const utils = require('./utils');
const config = require('../config');
const webpackConfig = require('./webpack.config');

// 将热重新加载相关代码添加到条目块
Object.keys(webpackConfig.entry).forEach(function (name) {
    webpackConfig.entry[name] = ['./build/dev-client'].concat(webpackConfig.entry[name]);
});

module.exports = merge(webpackConfig, {
    mode: "development",
    // cheap-module-eval-source-map 开发速度更快
    devtool: config.dev.devtool,
    module: {
        rules: utils.styleLoaders({
            hotReload: true,
            extract: true,
            sourceMap: config.dev.cssSourceMap,
            usePostCSS: true
        })
    },
    plugins: [
        // 允许您创建可在配置全局常量的编译时间
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),

        // 将css提取到自己的文件中
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].css')
        }),

        // 热重新加载模块
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        // 简化HTML文件的创建
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'examples/index.html',
            // 所有javascript资源将被放置在body元素的底部。
            // 'head'将脚本放在head元素中
            inject: true
        }),

        new FriendlyErrorsPlugin()
    ]
});
