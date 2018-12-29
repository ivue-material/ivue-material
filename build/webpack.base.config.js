/**
 * 公共配置
 */

const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve (dir) {
      return path.join(__dirname, '..', dir);
}

module.exports = {
      // 加载器
      module: {
            // https://doc.webpack-china.org/guides/migrating/#module-loaders-module-rules
            rules: [
                  {
                      // https://vue-loader.vuejs.org/en/configurations/extract-css.html
                      test: /\.vue$/,
                      loader: 'vue-loader',
                      options: {
                          loaders: {
                              css: [
                                  'vue-style-loader',
                                  {
                                      loader: 'css-loader',
                                      options: {
                                          sourceMap: true,
                                      }
                                  },
                              ],
                              less: [
                                  'vue-style-loader',
                                  {
                                      loader: 'css-loader',
                                      options: {
                                          sourceMap: true,
                                      }
                                  },
                                  {
                                      loader: 'less-loader',
                                      options: {
                                          sourceMap: true,
                                      }
                                  }
                              ]
                          },
                          postLoaders: {
                              html: 'babel-loader?sourceMap'
                          },
                          sourceMap: true
                      }
                  },
                  {
                      test: /\.js$/,
                      loader: 'babel-loader',
                      options: {
                          sourceMap: true,
                      },
                      exclude: /node_modules/,
                  },
                  {
                      test: /\.css$/,
                      loaders: [
                          {
                              loader: 'style-loader',
                              options: {
                                  sourceMap: true,
                              }
                          },
                          {
                              loader: 'css-loader',
                              options: {
                                  sourceMap: true,
                              }
                          },
                          {
                              loader: '\'autoprefixer-loader\'',
                          },
                      ]
                  },
                  {
                      test: /\.less$/,
                      loaders: [
                          {
                              loader: 'style-loader',
                              options: {
                                  sourceMap: true,
                              }
                          },
                          {
                              loader: 'css-loader',
                              options: {
                                  sourceMap: true,
                              }
                          },
                          {
                              loader: 'less-loader',
                              options: {
                                  sourceMap: true,
                              }
                          }
                      ]
                  },
                  {
                      test: /\.scss$/,
                      loaders: [
                          {
                              loader: 'style-loader',
                              options: {
                                  sourceMap: true,
                              }
                          },
                          {
                              loader: 'css-loader',
                              options: {
                                  sourceMap: true,
                              }
                          },
                          {
                              loader: 'sass-loader',
                              options: {
                                  sourceMap: true,
                              }
                          }
                      ]
                  },
                  {
                      test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                      loader: 'url-loader?limit=8192'
                  },
                  {
                      test: /\.(html|tpl)$/,
                      loader: 'html-loader'
                  }
              ]
      },
      resolve: {
            extensions: ['.js', '.vue'],
            alias: {
                  'vue': 'vue/dist/vue.esm.js',
                  '@': resolve('src')
            }
      },
      plugins: [
            // 预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度。
            new webpack.optimize.ModuleConcatenationPlugin(),
            //  允许创建一个在编译时可以配置的全局常量
            new webpack.DefinePlugin({
                  'process.env.VERSION': `'${pkg.version}'`
            }),
            // 生成依赖图
            // new BundleAnalyzerPlugin({
            //       //  可以是`server`，`static`或`disabled`。
            //       //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
            //       //  在“静态”模式下，会生成带有报告的单个HTML文件。
            //       //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
            //       analyzerMode: 'server',
            //       //  将在“服务器”模式下使用的主机启动HTTP服务器。
            //       analyzerHost: '127.0.0.1',
            //       //  将在“服务器”模式下使用的端口启动HTTP服务器。
            //       analyzerPort: 8888,
            //       //  路径捆绑，将在`static`模式下生成的报告文件。
            //       //  相对于捆绑输出目录。
            //       reportFilename: 'report.html',
            //       //  模块大小默认显示在报告中。
            //       //  应该是`stat`，`parsed`或者`gzip`中的一个。
            //       //  有关更多信息，请参见“定义”一节。
            //       defaultSizes: 'parsed',
            //       //  在默认浏览器中自动打开报告
            //       openAnalyzer: true,
            //       //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
            //       generateStatsFile: false,
            //       //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
            //       //  相对于捆绑输出目录。
            //       statsFilename: 'stats.json',
            //       //  stats.toJson（）方法的选项。
            //       //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
            //       //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
            //       statsOptions: null,
            // }
            // )
      ]
}

