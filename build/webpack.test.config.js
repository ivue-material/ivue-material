/*
* 单元测试
*/

const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config');

const webpackConfig = merge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        // 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用
        new webpack.DefinePlugin({
            'process.env': {
                // 因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号
                NODE_ENV: '"testing"'
            }
        }),
    ]
})

delete webpackConfig.entry;

module.exports = webpackConfig
