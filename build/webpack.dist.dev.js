// https://markus.oberlehner.net/blog/setting-up-a-vue-project-with-webpack-4-and-babel-7/

const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
// 清理dist文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const env = require('../config/prod.env');

const webpackConfig = merge(baseWebpackConfig, {
    mode: "development",
    module: {
        rules: utils.styleLoaders({
            // 是否为生产构建生成源映射
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    // 完整的SourceMap作为单独的文件发出
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    // 将编译后的文件写入磁盘
    output: {
        // 输出目录作为绝对路径
        // path.resolve(__dirname, '../dist')
        path: config.build.assetsRoot,
        publicPath: '/dist/',
        // 确定每个输出包的名称
        filename: 'ivue.js',
        library: 'ivue',
        // 将你的 library 暴露为所有的模块定义下都可运行的方式。它将在 CommonJS, AMD 环境下运行
        libraryTarget: 'umd',
        // 当使用了 libraryTarget: "umd"，设置：
        umdNamedDefine: true
    },
    // 外部扩展
    externals: {
        vue: {
              // 可以通过一个全局变量访问 library（例如，通过 script 标签）。
              root:'Vue',
              // 可以将 library 作为一个 CommonJS 模块访问。
              commonjs: 'vue',
              // 导出的是 module.exports.default.
              commonjs2: 'vue',
              // 类似于 commonjs，但使用 AMD 模块系统。
              amd: 'vue'
        }
  },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    compress: {
                        // 在UglifyJs删除没有用到的代码时不输出警告
                        warnings: false,
                        // 删除所有的 `console` 语句，可以兼容ie浏览器
                        drop_console: true,
                        // 内嵌定义了但是只用到一次的变量
                        collapse_vars: true,
                        // 提取出出现多次但是没有定义成变量去引用的静态值
                        reduce_vars: true,
                    },
                    output: {
                        // 最紧凑的输出
                        beautify: false,
                        // 删除所有的注释
                        comments: false,
                    }
                }
            }),
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 清理 /dist 文件夹
        // new CleanWebpackPlugin(),
        // short-circuits all Vue.js warning code
        new webpack.DefinePlugin({
            'process.env': env,
        }),

        // 将css提取到自己的文件中
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            // allChunks: true
        }),


        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap
                ? { safe: true, map: { inline: false } }
                : { safe: true }
        }),

        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
});

module.exports = webpackConfig;
