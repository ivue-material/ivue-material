/**
 * @file 基础 webpack 配置文件，开发环境和生产环境公用的
 */

'use strict';
const path = require('path');
const config = require('../config');
const utils = require('./utils');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const nodeSassMagicImporter = require('node-sass-magic-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = process.env.NODE_ENV;
const sourceMap = env === 'development';


// 别名路径
function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

const webpackConfig = {
    context: path.resolve(__dirname, '../'),
    entry: {
        main: './src/index.js'
    },
    output: {
        // 输出目录作为绝对路径。
        path: config.build.assetsRoot,
        // 此选项确定每个输出包的名称。捆绑包将写入该output.path选项指定的目录。
        // filename: '[name].js',
        filename: utils.assetsPath('[name].js'),
        // path is '/'
        // 当使用按需加载或加载外部资源（如图像，文件等）时，这是一个重要选项
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath,
        chunkFilename: '[name].chunk.js'
    },
    // 配置模块的解析方式
    resolve: {
        // 自动解决某些扩展。
        extensions: ['.js', '.vue', '.json'],
        // 别名
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    transformAssetUrls: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(styl|stylus)$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap,
                        },
                    },
                    {
                        loader: 'stylus-loader',
                        options: {
                            sourceMap,
                            paths: [path.resolve(__dirname, 'node_modules')],
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap,
                            paths: [path.resolve(__dirname, 'node_modules')],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap,
                            importer: nodeSassMagicImporter(),
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        // 请确保引入这个插件来施展魔法
        new VueLoaderPlugin(),
    ],
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}

module.exports = webpackConfig;
