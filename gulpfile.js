var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

gulp.task('default', function() {
    gulp.src('./src/app/less/**/*.less')
        .pipe(less({
            //paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./src/app/css'));
});

gulp.watch('./src/app/less/*.less', ['default']);
