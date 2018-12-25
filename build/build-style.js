const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

// 编译sass
gulp.task('css', function () {
      gulp.src('../src/styles/index.scss')
            .pipe(sass())
            .pipe(autoprefixer({
                  browsers: ['last 2 versions', 'ie > 8']
            }))
            .pipe(cleanCSS())
            .pipe(rename('ivue.css'))
            .pipe(gulp.dest('../dist/styles'));
      // layout
      gulp.src('../src/components/ivue-layout/layout.scss')
            .pipe(sass())
            .pipe(autoprefixer({
                  browsers: ['last 2 versions', 'ie > 8']
            }))
            .pipe(cleanCSS())
            .pipe(rename('layout.css'))
            .pipe(gulp.dest('../dist/styles'));
      // ivue-elevation
      gulp.src('../src/components/ivue-elevation/elevation.scss')
            .pipe(sass())
            .pipe(autoprefixer({
                  browsers: ['last 2 versions', 'ie > 8']
            }))
            .pipe(cleanCSS())
            .pipe(rename('elevation.css'))
            .pipe(gulp.dest('../dist/styles'));
});

// 拷贝字体文件
gulp.task('fonts', function () {
      gulp.src('../src/styles/common/iconfont/fonts/*.*')
            .pipe(gulp.dest('../dist/styles/fonts'));
});

gulp.task('default', ['css', 'fonts']);
