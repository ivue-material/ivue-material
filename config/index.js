/**
 * @file 项目所有的配置文件
 */
'use strict'

// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');

module.exports = {
    dev: {
        env: require('./dev.env'),
        // paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // 为开发服务器定义代理规则。有关更多详细信息，请参阅开发期间的API代理 http://vuejs-templates.github.io/webpack/proxy.html
        proxyTable: {},
        // 各种Dev Server设置
        host: 'localhost',
        // 指定要侦听的开发服务器的端口
        port: 3000,
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        devtool: 'cheap-module-eval-source-map',

        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,
    },
    build: {
        env: require('./prod.env'),
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),
        // 这应该指向包含应用程序的所有静态资产的根目录
        assetsRoot: path.resolve(__dirname, '../dist'),
        // 将webpack生成的资源嵌入此目录中build.assetsRoot
        assetsSubDirectory: 'static',
        // 这应该是build.assetsRoot通过HTTP提供服务的URL路径
        assetsPublicPath: '/',
        // 是否为生产构建生成源映射
        productionSourceMap: true,
        devtool: 'source-map',
        //默认情况下Gzip关闭许多流行的静态主机，例如
        // Surge或Netlify已经为您准备了所有静态资产。
        //在设置为“true”之前，请确保：
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],

        //运行带有额外参数的build命令
        //在构建完成后查看捆绑分析器报告：
        //`npm run build --report`
        //设置为“true”或“false”以始终打开或关闭它
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
