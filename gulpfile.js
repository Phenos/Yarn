var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var browserSync = require('browser-sync');
var config = require('./gulpfile.json');
var cwd = config.cwd;
var paths = config.paths;

gulp.task('loopbackAngular', loopbackAngularTask);
gulp.task('bump', bumpTask);
gulp.task('compileLess', lessTask);
gulp.task('copyStatic', copyStaticTask);
gulp.task('copyLess', copyLess);
gulp.task('copyJs', copyJsTask);
gulp.task('compressJS', compressJsTask);
gulp.task('injectJsFiles', injectJsFilesTask);
gulp.task('compressJSVendors', compressJsVendorsTask);
gulp.task('copyAssets', gulp.series(
    'copyStatic',
    'compressJSVendors',
    //'compressJS',
    'injectJsFiles',
    'copyJs',
    'copyLess'
));
gulp.task('clean', cleanTask);
gulp.task('cleanAfterBuild', cleanAfterTask);
gulp.task('server', serverTask);
gulp.task('api', apiTask);
gulp.task('watch', watchTask);
gulp.task('build', gulp.series(
    'clean',
    'compileLess',
    'copyAssets',
    //'loopbackAngular',
    'cleanAfterBuild'
));
gulp.task('devServerless', gulp.series(
    'build',
    'watch'
));
gulp.task('dev', gulp.series(
    'build',
    'watch',
    'api'
));


// -----[ Task Functions ]--------


function loopbackAngularTask() {
    return gulp.src('./server/server.js')
        .pipe($.loopbackSdkAngular())
        .pipe($.rename('lb-services.js'))
        .pipe(gulp.dest('./build/static/client-sdk/'));
}


function injectJsFilesTask() {

    return gulp.src(paths.staticRoot + '/index-template/index.html')
        .pipe($.inject(gulp.src(paths.javascriptSource, {
            read: false
        }), {
            ignorePath: ['src/', 'app/'],
            addPrefix: ''
        }))
        .pipe($.using())
        .pipe(gulp.dest(paths.staticRoot), cwd);
}


function bumpTask() {
    return gulp.src(['bower.json', 'package.json', 'src/app/static/metadata.json'], {base: '.'})
        //.pipe(using())
        .pipe($.bump({type: 'patch'}))
        .pipe(gulp.dest('./'), cwd);
}

function copyStaticTask() {
    // Copy static folder
    return gulp.src(paths.staticSource)
        //.pipe(using())
        .pipe(gulp.dest(paths.staticRoot, cwd));
}

function copyJsTask() {
    // Copy js folder
    return gulp.src(paths.javascriptSource, {
            base: "src/app/js/"
        })
        .pipe($.angularEmbedTemplates({
            basePath: paths.staticRoot
        }))
        //.pipe(using())
        .pipe(gulp.dest(paths.javacriptTarget), cwd);
}

function compressJsTask() {
    return gulp.src(paths.javascriptSource)
        //.pipe(using())
        .pipe($.sourcemaps.init())
        .pipe($.sourcemaps.write())
        //.pipe(uglify({
        //    mangle: false
        //}))
        .pipe($.concat('all.js'))
        .pipe(gulp.dest(paths.javacriptTarget), cwd);
}

function compressJsVendorsTask() {
    return gulp.src(paths.javascriptVendorsSource)
        //.pipe(using())
        //.pipe(sourcemaps.init())
        //.pipe(sourcemaps.write())
        //.pipe(uglify({
        //    mangle: false
        //}))
        .pipe($.concat('vendors.js'))
        .pipe(gulp.dest(paths.javacriptTarget), cwd);
}

function copyLess() {
    // move less files into the styles folder
    return gulp.src(paths.distTempLess + "/**")
        //.pipe(using())
        .pipe($.concat('all.css'))
        .pipe(gulp.dest(paths.distStylesRoot, cwd));
}

function cleanTask() {
    return del(paths.clean);
}

function cleanAfterTask() {
    return del(paths.cleanAfter);
}

function serverTask(callback) {
    browserSync.init({
        reloadDebounce: 2000,
        minify: false,
        proxy: config.server.proxy,
        host: config.server.host,
        port: config.server.port

    });
    callback();
}

function apiTask(callback) {
    var app = require("./server/server.js");
    app.start();
    callback();
}

function watchTask(callback) {
    gulp.watch(paths.watches.less, gulp.series('compileLess', 'copyLess', browserSync.reload));
    gulp.watch(paths.watches.js, gulp.series('copyJs', browserSync.reload));
    gulp.watch(paths.watches.statics, gulp.series('copyStatic', 'copyJs', browserSync.reload));
    callback();
}

function lessTask() {
    return gulp.src(paths.less)
        .pipe($.less())
        .pipe(gulp.dest(paths.distTempLess));
}

