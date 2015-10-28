var gulp = require('gulp');
var less = require('gulp-less');
var using = require('gulp-using');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');

var config = {
    server: {
        host: 'localhost',
        root: 'build/static',
        port: 8001
    },
    paths: {
        buildRoot: 'build',
        staticRoot: 'build/static',
        distStylesRoot: 'build/static/styles',
        distTempLess: 'build/static/less-temp',
        less: 'src/app/less/**/*.less',
        staticSource: 'src/app/static/**',
        javascriptSource: 'src/app/js/**',
        javacriptTarget: 'build/static/js',
        bowerComponentsSource: 'bower_components/**',
        bowerComponentsTarteg: 'build/static/bower_components',
        clean: [
            'build'
        ],
        cleanAfter: [
            'build/static/less-temp'
        ],
        watch: [
            'src/app/less/**/*.less',
            'src/app/static/**/*.html',
            'src/app/static/**/*.txt',
            'src/app/js/**/*.js'
        ]
    }
};

var cwd = {
    cwd: '.'
};

var paths = config.paths;

gulp.task('compileLess', lessTask);
gulp.task('copyStatic', copyStatic);
gulp.task('copyBowerComponents', copyBowerComponents);
gulp.task('copyLess', copyLess);
gulp.task('copyJs', copyJsTask);
gulp.task('copyAssets', gulp.series('copyBowerComponents', 'copyStatic', 'copyJs', 'copyLess'));
gulp.task('clean', cleanTask);
gulp.task('cleanAfterBuild', cleanAfterTask);
gulp.task('server', serverTask);
//gulp.task('watchJs', watchJsTask);
//gulp.task('watchLess', watchLessTask);
gulp.task('watch', watchTask);
gulp.task('build', gulp.series('clean', 'compileLess', 'copyAssets', 'cleanAfterBuild'));
gulp.task('dev', gulp.series('build', 'server', 'watch'));

// -----[ Task Functions ]--------

function copyStatic() {
    // Copy static folder
    return gulp.src(paths.staticSource)
        .pipe(using())
        .pipe(gulp.dest(paths.staticRoot, cwd));
}

function copyJsTask() {
    // Copy js folder
    return gulp.src(paths.javascriptSource)
        .pipe(using())
        .pipe(gulp.dest(paths.javacriptTarget), cwd);
}

function copyBowerComponents() {
    // copy bower components in static folder
    return gulp.src(paths.bowerComponentsSource)
        .pipe(using())
        .pipe(gulp.dest(paths.bowerComponentsTarteg, cwd));
}

function copyLess() {
    // move less files into the styles folder
    return gulp.src(paths.distTempLess + "/**")
        .pipe(using())
        .pipe(gulp.dest(paths.distStylesRoot, cwd));
}

function cleanTask() {
    return gulp.src(paths.clean, {read: false})
        .pipe(using())
        .pipe(clean());
}

function cleanAfterTask() {
    return gulp.src(paths.cleanAfter, {read: false})
        .pipe(using())
        .pipe(clean());
}

function serverTask(callback) {
    browserSync.init({
        server: {
            baseDir: config.server.root
        },
        host: config.server.host,
        port: config.server.port

    });
    callback();
}

function watchTask() {
    return gulp.watch(paths.watch, gulp.series('build', browserSync.reload));
}

function lessTask() {
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(gulp.dest(paths.distTempLess));
}


// ------[ The End! --------