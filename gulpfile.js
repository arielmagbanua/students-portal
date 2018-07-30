const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const inlinesource = require('gulp-inline-source');
const babelMinify = require('gulp-babel-minify');

var htmlFilesToIgnore = ['!src/test.html'];

gulp.task('minify-html', function () {
    htmlFilesToIgnore.push('src/*.html');

    return gulp.src(htmlFilesToIgnore)
        .pipe(inlinesource({ compress: true }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('public'));
});

gulp.task('sass', function () {
    let pathsToCompile = [
        'src/sass/**/*.scss',
        '!src/sass/test.scss'
    ];

    return gulp.src(pathsToCompile)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('src/sass/**/*.scss', ['sass']);
});