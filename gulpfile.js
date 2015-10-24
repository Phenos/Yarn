var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var serve = require('gulp-serve');

var paths = {
    webroot: '.',
    less: './src/app/less/**/*.less'
};

gulp.task('serve', serve({
    root: [paths.webroot],
    port: 8001
}));

gulp.task('less', function() {
    gulp.src(paths.less)
        .pipe(less())
        .pipe(gulp.dest('./src/app/css'));
});

gulp.task('watch', function() {
    gulp.watch('./src/app/less/*.less', ['less']);
});
