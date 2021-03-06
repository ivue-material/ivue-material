/**
 * 公共配置
 */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 你定义过的其它规则复制并应用到 .vue 文件里相应语言的块
const {
  VueLoaderPlugin
} = require('vue-loader')


function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const babelOptions = {
  plugins: ['@vue/babel-plugin-jsx'],
}

const loaders = [{
    loader: 'style-loader',
    // options: {
    //   sourceMap: true,
    // },
  },
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      importLoaders: 1
    },
  },
]

module.exports = {
  // 加载器
  module: {
    // https://doc.webpack-china.org/guides/migrating/#module-loaders-module-rules
    rules: [{
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
                },
              },
            ],
            less: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
          postLoaders: {
            html: 'babel-loader?sourceMap'
          },
          sourceMap: true,
          esModule: true
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: babelOptions
        }, {
          loader: 'ts-loader',
          options: {
            appendTsxSuffixTo: [/\.vue$/],
            transpileOnly: true,
          },
        }]
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: babelOptions
        }, {
          loader: 'ts-loader',
          options: {
            appendTsxSuffixTo: [/\.vue$/],
            transpileOnly: true,
          },
        }]
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: babelOptions,
        }, ],
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
          ...loaders,
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        loaders: [
          ...loaders,
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          ...loaders,
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader?limit=8192',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    alias: {
      'vue': 'vue/dist/vue.esm-browser.js',
      '@': resolve('src'),
    }
  },
  plugins: [
    // 预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度。
    //  允许创建一个在编译时可以配置的全局常量
    new webpack.DefinePlugin({
      'process.env.VERSION': `'${pkg.version}'`
    }),
    new VueLoaderPlugin(),
  ]
};
