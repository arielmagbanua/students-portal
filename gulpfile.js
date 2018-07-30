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