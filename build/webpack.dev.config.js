/**
 * 本地预览
 */

const path = require('path');
const webpack = require('webpack');

// 创建html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack 合并插件
const {
  merge
} = require('webpack-merge');
// 公共参数
const webpackBaseConfig = require('./webpack.base.config');
// 识别某些类型的webpack错误
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  // 每个模块使用 eval() 执行，并且 source map 转换为 DataUrl 后添加到 eval() 中。
  // 初始化 source map 时比较慢，但是会在重新构建时提供比较快的速度，并且生成实际的文件。
  // 行数能够正确映射，因为会映射到原始代码中。它会生成用于开发环境的最佳品质的 source map。
  devtool: 'cheap-module-eval-source-map',
  // 入口
  entry: {
    main: './examples/main',
    vendors: ['vue', 'vue-router']
  },
  // 输出
  output: {
    path: path.join(__dirname, '../examples/dist'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  // 配置模块的解析方式
  resolve: {
    alias: {
      'ivue': '../../src/index',
      'src': '../../../',
      'vue': 'vue/dist/vue.esm-browser.js',
    }
  },
  // 插件
  plugins: [
    // 创建一个单独的文件（称为块），由多个入口点之间共享的公共模块组成。
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendors',
    //   filename: 'vendors.bundle.js'
    // }),
    // 创建HTML文件
    new HtmlWebpackPlugin({
      // 注入标记。
      inject: true,
      filename: path.join(__dirname, '../examples/dist/index.html'),
      template: path.join(__dirname, '../examples/index.html')
    }),
    // 识别某些类型的webpack错误并清理
    new FriendlyErrorsPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devServer: {
    inline: true,
    hot: true,
    stats: 'minimal',
    publicPath: '/',
    contentBase: __dirname,
    overlay: true,
  },
});
