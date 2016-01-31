/**
 * Created by vuji on 16/1/31.
 */
var gulp = require('gulp');

// 引入组件
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minfiyCss = require('gulp-minify-css');

var myPath = {
    jsDevDest : "./public_dev/js",
    jsDest : "./public/js",
    sassDevDest : './public_dev/stylesheets',
    sassDest : "./public/stylesheets",
    imagesDevDest : "./public_dev/images",
    imagesDest : "./public/images"
};

/**
 *  编译Sass
 */
gulp.task('sass', function() {
    gulp.src(myPath.sassDevDest+'/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(myPath.sassDest))
        .pipe(minfiyCss({compatibility: 'ie8'}))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(myPath.sassDest+"/min"));
});

/**
 * js语法检查
 */
gulp.task('lint',function(){
   gulp.src(myPath.jsDevDest+"/*.js")
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src(myPath.jsDevDest+'/*.js')
        .pipe(gulp.dest(myPath.jsDest))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(uglify())
        .pipe(gulp.dest(myPath.jsDest));
});



gulp.task('default', function() {
    gulp.run('lint', 'sass', 'scripts');

    // 监听js文件变化
    gulp.watch('./js/*.js', function(){
        gulp.run('lint', 'scripts');
    });

    // 监听sass文件变化
    gulp.watch(myPath.sassDevDest+'/*.scss', function(){
        gulp.run('sass');
    });
});