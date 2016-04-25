/* eslint-env node */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var browserSync = require('browser-sync');
var config = require('./gulpfile.json');
var cwd = config.cwd;
var paths = config.paths;

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
//    'compressJS',
    'injectJsFiles',
    'copyJs',
    'copyLess'
));
gulp.task('clean', cleanTask);
gulp.task('cleanPhonegap', cleanPhonegapTask);
gulp.task('cleanAfterBuild', cleanAfterTask);
gulp.task('server', serverTask);
gulp.task('watch', watchTask);
gulp.task('build', gulp.series(
    'clean',
    'compileLess',
    'copyAssets',
    'cleanAfterBuild'
));
gulp.task('buildPhonegap', gulp.series(
    'cleanPhonegap',
    'build',
    buildPhonegapTask
));
gulp.task('devServerless', gulp.series(
    'build',
    'watch'
));
gulp.task('dev', gulp.series(
    'build',
    'watch'
));
gulp.task('dev-phonegap', gulp.series(
    'buildPhonegap',
    'watch'
));
gulp.task('lint', lintTask);
gulp.task('doc', docTask);

// -----[ Task Functions ]--------

function docTask(cb) {
    gulp.src(['README.md'].concat(paths.javascriptSource), {read: false})
        .pipe($.jsdoc3(config.jsdoc, cb));
}

function lintTask() {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(paths.javascriptSource)
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe($.eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe($.eslint.format())
        .pipe($.eslint.results(function (results) {
            // Called once for all ESLint results.
            console.info('Total Results: ' + results.length);
            console.info('Total Warnings: ' + results.warningCount);
            console.info('Total Errors: ' + results.errorCount);
        }))
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe($.eslint.failAfterError());
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
//        .pipe(using())
        .pipe($.bump({type: 'patch'}))
        .pipe(gulp.dest('./'), cwd);
}

function copyStaticTask() {
    // Copy static folder
    return gulp.src(paths.staticSource)
//        .pipe(using())
        .pipe(gulp.dest(paths.staticRoot, cwd));
}

function buildPhonegapTask() {
    // Copy static folder
    return gulp.src(paths.buildRoot + "/**")
//        .pipe(using())
        .pipe(gulp.dest(paths.phonegapBuildRoot, cwd));
}
function cleanPhonegapTask() {
    return del(paths.phonegapBuildRoot);
}

function copyJsTask() {
    // Copy js folder
    return gulp.src(paths.javascriptSource, {
            base: "src/app/js/"
        })
        .pipe($.angularEmbedTemplates({
            basePath: paths.staticRoot
        }))
//        .pipe(using())
        .pipe(gulp.dest(paths.javacriptTarget), cwd);
}

function compressJsTask() {
    return gulp.src(paths.javascriptSource)
//        .pipe(using())
        .pipe($.sourcemaps.init())
        .pipe($.sourcemaps.write())
//        .pipe(uglify({
//            mangle: false
//        }))
        .pipe($.concat('all.js'))
        .pipe(gulp.dest(paths.javacriptTarget), cwd);
}

function compressJsVendorsTask() {
    return gulp.src(paths.javascriptVendorsSource)
//        .pipe(using())
//        .pipe(sourcemaps.init())
//        .pipe(sourcemaps.write())
//        .pipe(uglify({
//            mangle: false
//        }))
        .pipe($.concat('vendors.js'))
        .pipe(gulp.dest(paths.javacriptTarget), cwd);
}

function copyLess() {
    // move less files into the styles folder
    return gulp.src(paths.distTempLess + "/**")
//        .pipe(using())
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

function watchTask(callback) {
    gulp.watch(paths.watches.less, gulp.series('compileLess', 'copyLess', browserSync.reload));
    gulp.watch(paths.watches.js, gulp.series('copyJs', browserSync.reload));
    gulp.watch(paths.watches.statics, gulp.series(
        'copyStatic', 'copyJs', 'injectJsFiles', browserSync.reload));
    callback();
}

function lessTask() {
    return gulp.src(paths.less)
        .pipe($.less())
        .pipe(gulp.dest(paths.distTempLess));
}

