// 使用Node解析算法查找模块，在node_modules
import {
  nodeResolve
} from '@rollup/plugin-node-resolve';
import path from 'path';
import css from 'rollup-plugin-css-only';
import {
  terser
} from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';

// 最小化生成的包
import {
  uglify
} from "rollup-plugin-uglify";
import pkg from '../package.json';

// 包插件
const deps = Object.keys(pkg.dependencies);

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const vue = require('./plugin.js');

export default [{
  // 入口文件地址
  input: path.resolve(__dirname, '../src/index.ts'),
  output: {
    format: 'umd',
    name: 'ivue.umd.js',
    file: 'dist/index.umd.js',
  },
  plugins: [
    terser(),
    nodeResolve(),

    css(),
    vue({
      css: false
    }),
    // vue({
    //   target: 'browser',
    //   css: false,
    //   exposeFilename: false,
    // }),
    typescript({
      tsconfigOverride: {
        'include': [
          'src/**/*',
          'typings/vue-shim.d.ts',
        ],
        'exclude': [
          'node_modules',
          //   'packages/**/__tests__/*',
        ],
      },
      abortOnError: false,
    }),
  ],
  // 告诉rollup不要将此打包，而作为外部依赖
  external(id) {
    return /^vue/.test(id) ||
      deps.some(k => new RegExp('^' + k).test(id))
  },
}]
