var gulp = require('gulp');
var less = require('gulp-less');
var using = require('gulp-using');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var bump = require('gulp-bump');

var config = {
    server: {
        host: 'localhost',
        root: 'build/static',
        port: 8001
    },
    paths: {
        buildRoot: 'build',
        staticRoot: 'build/static',
        storiesRoot: 'build/static/stories',
        distStylesRoot: 'build/static/styles',
        distTempLess: 'build/static/less-temp',
        less: 'src/app/less/**/*.less',
        staticSource: 'src/app/static/**',
        storiesSource: 'src/app/stories/**',
        javascriptSource: [
            "src/app/js/yarn/yarn.js",
            "src/app/js/yarn/**/*.js",
            "src/app/js/module.js",
            "src/app/js/routes.js",
            "src/app/js/game/game.predicates.js",
            "src/app/js/game/game.routines.js",
            "src/app/js/game/game.things.js",
            "src/app/js/controllers/**/*.js",
            "src/app/js/services/**/*.js",
            "src/app/js/directives/**/*.js"
        ],
        javascriptVendorsSource: [
            "./bower_components/angular/angular.js",
            "./bower_components/angular-animate/angular-animate.js",
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
        ],
        watches: {
            statics: [
                'src/app/static/**/*.html',
                'src/app/static/**/*.txt'
            ],
            js: 'src/app/js/**/*.js',
            stories: 'src/app/stories/**',
            less: 'src/app/less/**/*.less'
        }
    }
};

var cwd = {
    cwd: '.'
};

var paths = config.paths;

gulp.task('bump', bumpTask);
gulp.task('compileLess', lessTask);
gulp.task('copyStatic', copyStaticTask);
gulp.task('copyStories', copyStoriesTask);
gulp.task('copyBowerComponents', copyBowerComponents);
gulp.task('copyLess', copyLess);
gulp.task('copyJs', copyJsTask);
gulp.task('compressJS', compressJsTask);
gulp.task('compressJSVendors', compressJsVendorsTask);
gulp.task('copyAssets', gulp.series(
    'copyBowerComponents',
    'copyStatic',
    'copyStories',
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

function bumpTask() {
    return gulp.src(['./bower.json', './package.json', './src/app/static/metadata.json'])
        .pipe(bump({type:'patch'}))
        .pipe(gulp.dest('./'));
}

function copyStaticTask() {
    // Copy static folder
    return gulp.src(paths.staticSource)
        .pipe(using())
        .pipe(gulp.dest(paths.staticRoot, cwd));
}

function copyStoriesTask() {
    // Copy static folder
    return gulp.src(paths.storiesSource)
        .pipe(using())
        .pipe(gulp.dest(paths.storiesRoot, cwd));
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
        .pipe(uglify({
            mangle: false
        }))
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
    gulp.watch(paths.watches.less, gulp.series('compileLess', 'copyLess', browserSync.reload));
    gulp.watch(paths.watches.js, gulp.series('compressJS', 'copyJs', browserSync.reload));
    gulp.watch(paths.watches.stories, gulp.series('copyStories', browserSync.reload));
    gulp.watch(paths.watches.statics, gulp.series('copyStatic', browserSync.reload));
}

function lessTask() {
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(gulp.dest(paths.distTempLess));
}


// ------[ The End! --------