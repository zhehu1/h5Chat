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
var stylish = require('jshint-stylish');
var imagemin = require('gulp-imagemin');

var myPath = {
    jsDevDest : "./public_dev/js",
    jsDest : "./public/js",
    sassDevDest : './public_dev/css',
    sassDest : "./public/css",
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
        .pipe(gulp.dest(myPath.sassDest));
});

/**
 * js语法检查
 */
gulp.task('lint',function(){
   gulp.src(myPath.jsDevDest+"/*.js")
       .pipe(jshint())
       .pipe(jshint.reporter(stylish));
});

/**
 *  压缩js文件
 */
gulp.task('scripts', function() {
    gulp.src(myPath.jsDevDest+'/*.js')
        .pipe(gulp.dest(myPath.jsDest))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(uglify())
        .pipe(gulp.dest(myPath.jsDest));
});

/**
 * 图片压缩
 */
gulp.task('imagemin',function(){
    gulp.src(myPath.imagesDevDest+"/**")
        .pipe(imagemin())
        .pipe(gulp.dest(myPath.imagesDest));
});

gulp.task('default', function() {
    gulp.run('lint', 'sass', 'scripts','imagemin');
    //gulp.run('lint', 'sass','imagemin');

    //// 监听js文件变化
    gulp.watch(myPath.jsDevDest+'/*.js', function(){
        gulp.run('lint', 'scripts');
    });

    // 监听js文件变化
    gulp.watch(myPath.jsDevDest+'/*.js', function(){
        gulp.run('lint');
    });

    // 监听sass文件变化
    gulp.watch(myPath.sassDevDest+'/*.scss', function(){
        gulp.run('sass');
    });

    gulp.watch(myPath.imagesDevDest+'/**', function(){
        gulp.run('imagemin');
    });
});