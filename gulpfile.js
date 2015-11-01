var gulp = require('gulp');
var less = require('gulp-less');
var using = require('gulp-using');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

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
        javascriptSource: [
            "src/app/js/module.js",
            "src/app/js/routes.js",
            "src/app/js/controllers/**/*.js",
            "src/app/js/services/**/*.js",
            "src/app/js/directives/**/*.js",
            "src/app/js/bigMess/bigmess.js",
            "src/app/js/bigMess/bigmess.pointer.js",
            "src/app/js/bigMess/bigmess.node.js",
            "src/app/js/bigMess/bigmess.cursor.js",
            "src/app/js/bigMess/bigmess.ast.js",
            "src/app/js/bigMess/bigmess.runtime.js",
            "src/app/js/bigMess/bigmess.script.js",
            "src/app/js/bigMess/bigmess.state.js",
            "src/app/js/mindgame.js"
        ],
        javascriptVendorsSource: [
            "./bower_components/angular/angular.js",
            "./bower_components/angular-ui-router/release/angular-ui-router.js",
            "./bower_components/angular-scroll-glue/src/scrollglue.js",
            "./bower_components/angular-hotkeys/build/hotkeys.js",
            "./bower_components/angularjs-breakpoint/breakpoint-0.0.1.js"
        ],
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
gulp.task('copyStaticTask', copyStaticTask);
gulp.task('copyBowerComponents', copyBowerComponents);
gulp.task('copyLess', copyLess);
gulp.task('copyJs', copyJsTask);
gulp.task('compressJS', compressJsTask);
gulp.task('compressJSVendors', compressJsVendorsTask);
gulp.task('copyAssets', gulp.series(
    'copyBowerComponents',
    'copyStaticTask',
    'compressJSVendors',
    'compressJS',
    'copyJs',
    'copyLess'
));
gulp.task('clean', cleanTask);
gulp.task('cleanAfterBuild', cleanAfterTask);
gulp.task('server', serverTask);
gulp.task('watch', watchTask);
gulp.task('build', gulp.series(
    'clean',
    'compileLess',
    'copyAssets',
    'cleanAfterBuild'
));
gulp.task('dev', gulp.series(
    'build',
    'server',
    'watch'
));

// -----[ Task Functions ]--------


function copyStaticTask() {
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

function compressJsTask() {
    return gulp.src(paths.javascriptSource)
        .pipe(using())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        //.pipe(uglify({
        //    mangle: false
        //}))
        .pipe(concat('all.js'))
        .pipe(gulp.dest(paths.javacriptTarget), cwd);
}

function compressJsVendorsTask() {
    return gulp.src(paths.javascriptVendorsSource)
        .pipe(using())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        //.pipe(uglify({
        //    mangle: false
        //}))
        .pipe(concat('vendors.js'))
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
        .pipe(concat('all.css'))
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