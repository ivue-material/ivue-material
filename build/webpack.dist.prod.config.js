const path = require('path');
const webpack = require('webpack');
// webpack 合并插件
const merge = require('webpack-merge');
// 公共参数
const webpackBaseConfig = require('./webpack.base.config.js');
// 压缩资源插件
const CompressionPlugin = require('compression-webpack-plugin');
// 压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = merge(webpackBaseConfig,{
      // 整个 source map 作为一个单独的文件生成。它为 bundle 添加了一个引用注释，以便开发工具知道在哪里可以找到它。
      devtool: 'source-map',
      // 入口
      entry: {
          main: './src/index.js'
      },
      // 输出
      output: {
            path: path.resolve(__dirname,'../dist'),
            publicPath: '/dist/',
            filename: 'ivue.min.js',
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
      // 插件
      plugins: [
             // 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用
             new webpack.DefinePlugin({
                  'process.env': {
                        // 因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号
                        NODE_ENV: '"production"'
                  }
            }),
            new UglifyJsPlugin({
                  // 启用并行化。默认并发运行数
                  parallel: true,
                  sourceMap: true
            }),
            new CompressionPlugin({
                  // 目标资源名称[path] 会被替换成原资源路径，[query] 替换成原查询字符串
                  asset: '[path].gz[query]',
                  // 可以是 (buffer, cb) => cb(buffer) 或者是使用 zlib 里面的算法的 {String}
                  algorithm: 'gzip',
                  // 处理所有匹配此 {RegExp} 的资源
                  test: /\.(js|css)$/,
                  // 只处理比这个值大的资源。按字节计算
                  threshold: 10240,
                  // 只有压缩率比这个值小的资源才会被处理
                  minRatio: 0.8
            })
      ]
});
