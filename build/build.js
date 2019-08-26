/**
 * @file 生产环境构建入口
 */

/* eslint-disable no-console */

'use strict';

require('./check-versions')();

process.env.NODE_ENV = 'production';

// 以包的形式包装rm -rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除
const rm = require('rimraf');
const path = require('path');
const ora = require('ora');
const webpack = require('webpack');
const chalk = require('chalk');

const config = require('../config');
const webpackDistProd = require('./webpack.dist.prod');
const webpackDistDev = require('./webpack.dist.dev');

const spinner = ora('building for production...');
spinner.start();

// assetsRoot 这应该指向包含应用程序的所有静态资产的根目录
// assetsSubDirectory 将webpack生成的资源嵌入此目录中build.assetsRoot
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), function (err) {
    if (err) {
        throw err;
    }

    webpack(webpackDistProd, function (err, stats) {
        spinner.stop();
        if (err) {
            throw err;
        }

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        console.log(chalk.cyan('  Build complete.\n'));
        console.log(chalk.yellow(''
            + '  Tip: built files are meant to be served over an HTTP server.\n'
            + '  Opening index.html over file:// won\'t work.\n'
        ));

        if (!process.env.npm_config_report) {
            process.exit();
        }


        webpack(webpackDistDev, function (err, stats) {
            spinner.stop();
            if (err) {
                throw err;
            }

            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n');

            console.log(chalk.cyan('  Build complete.\n'));
            console.log(chalk.yellow(''
                + '  Tip: built files are meant to be served over an HTTP server.\n'
                + '  Opening index.html over file:// won\'t work.\n'
            ));

            if (!process.env.npm_config_report) {
                process.exit();
            }
        });
    });

});
