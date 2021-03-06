/* eslint-disable */
const pkg = require('../package.json')
const path = require('path');
const rollup = require('rollup');
const vue = require('./plugin.js')

// 获取 package.json
const {
  getPackages
} = require('@lerna/project');
// 导入的CSS的汇总插件
const css = require('rollup-plugin-css-only');
// 使用Node解析算法查找模块
const {
  nodeResolve
} = require('@rollup/plugin-node-resolve');

// 带有编译器错误的Typescript汇总插件。
const typescript = require('rollup-plugin-typescript2');


// 需要安装的包
const deps = Object.keys(pkg.dependencies);

// 运行打包
const runBuild = async () => {
  let index = 0;
  const pkgs = await getPackages();

  const inputs = pkgs
    .map(pkg => pkg.name)
    .filter(name => {
      return name.includes('@ivue-material');
    }).slice(process.argv[2], process.argv[3]);

  build(inputs[index]);

  async function build(name) {
    if (!name) {
      return;
    }

    // rollup 打包的选项
    const rollupOptions = {
      // 入口文件地址
      input: path.resolve(__dirname, `../src/components/${name.split('@ivue-material/')[1]}/index.ts`),
      // 插件
      plugins: [
        nodeResolve(),
        css(),
        vue({
          // browser版本
          target: 'browser',
          css: false,
        }),
        typescript({
          // tsconfig 覆盖
          tsconfigOverride: {
            compilerOptions: {
              declaration: false,
            },
            'exclude': [
              'node_modules',
              '__tests__',
            ],
          },
          // 错误时终止，Bail out on first syntactic or semantic error.
          abortOnError: false,
        }),
      ],
      // 告诉rollup不要将此打包，而作为外部依赖
      external(id) {
        return /^vue/.test(id) ||
          /^@ivue-material/.test(id) ||
          deps.some(k => new RegExp('^' + k).test(id));
      }
    };

    // 输出选项
    const outOptions = {
      format: 'es',
      file: `dist/${name.split('@ivue-material/')[1]}/index.js`,
      paths(id) {
        if (/^@ivue-material/.test(id)) {
          return id.replace('@ivue-material', '..');
        }
      }
    };

    // 打包
    const bundle = await rollup.rollup(rollupOptions);
    console.log(name, 'done');

    await bundle.write(outOptions);

    // 递归
    index++;
    if (index < inputs.length) {
      await build(inputs[index]);
    }

  }
}

runBuild();
