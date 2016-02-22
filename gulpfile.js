var gulp = require('gulp');
var less = require('gulp-less');
var using = require('gulp-using');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var bump = require('gulp-bump');
var del = require('del');
var shell = require('gulp-shell');
var electronConnect = require('electron-connect');
var electron = require('gulp-electron');

var browserSync;
var electronServer;

var config = {
    server: {
        proxy: "localhost:5000",
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
        electronSource: 'electron/**',
        storiesSource: 'src/app/stories/**',
        javascriptSource: [
            "src/app/js/config/module.js",
            "src/app/js/config/routes.js",
            "src/app/js/config/config.js",
            "src/app/js/yarn/yarn.js",
            "src/app/js/yarn/**/*.js",
            "src/app/js/game/game.predicates.js",
            "src/app/js/game/game.routines.js",
            "src/app/js/game/game.things.js",
            "src/app/js/controllers/**/*.js",
            "src/app/js/services/**/*.js",
            "src/app/js/directives/**/*.js"
        ],
        javascriptVendorsSource: [
            "./bower_components/lodash/dist/lodash.min.js",
            "./bower_components/postal.js/lib/postal.js",
            "./bower_components/ace-builds/src-noconflict/ace.js",
            "./bower_components/ace-builds/src-noconflict/ext-language_tools.js",
            "./bower_components/ace-builds/src-noconflict/worker-javascript.js",
            "./bower_components/ace-builds/src-noconflict/mode-javascript.js",
            "./bower_components/ace-builds/src-noconflict/theme-tomorrow.js",
            "./bower_components/angular/angular.js",
            "./bower_components/angular-resource/angular-resource.js",
            "./bower_components/angular-sanitize/angular-sanitize.js",
            "./bower_components/angular-aria/angular-aria.js",
            "./bower_components/ngstorage/ngStorage.min.js",
            "./bower_components/angular-animate/angular-animate.js",
            "./bower_components/angular-material/angular-material.js",
            "./bower_components/uri.js/src/URI.js",
            "./bower_components/angular-audio/app/angular.audio.js",
            "./bower_components/angular-uri/angular-uri.js",
            "./bower_components/angular-ui-ace/ui-ace.js",
            "./bower_components/angular-ui-router/release/angular-ui-router.js",
            "./bower_components/angular-hotkeys/build/hotkeys.js",
            "./bower_components/angularjs-breakpoint/breakpoint-0.0.1.js",
            "./bower_components/d3/d3.min.js"
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
gulp.task('copyElectronSrc', copyElectronSrcTask);
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
gulp.task('api', apiTask);
gulp.task('electron', electronTask);
gulp.task('runElectron', runElectronTask);
gulp.task('watch', watchTask);
gulp.task('watchElectron', watchElectronTask);
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
gulp.task('dev-electron', gulp.series(
    'build',
    'copyElectronSrc',
    'runElectron',
    'watchElectron'
));

// -----[ Task Functions ]--------

function bumpTask() {
    return gulp.src(['bower.json', 'package.json', 'src/app/static/metadata.json'], {base: '.'})
        .pipe(using())
        .pipe(bump({type: 'patch'}))
        .pipe(gulp.dest('./'), cwd);
}

function copyStaticTask() {
    // Copy static folder
    return gulp.src(paths.staticSource)
        .pipe(using())
        .pipe(gulp.dest(paths.staticRoot, cwd));
}
function copyElectronSrcTask() {
    // Copy electron related source to build folder
    return gulp.src(paths.electronSource)
        .pipe(using())
        .pipe(gulp.dest(paths.buildRoot, cwd));
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
        //.pipe(using())
        .pipe(gulp.dest(paths.javacriptTarget), cwd);
}

function compressJsTask() {
    return gulp.src(paths.javascriptSource)
        //.pipe(using())
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
    return del(paths.clean);
}

function cleanAfterTask() {
    return del(paths.cleanAfter);
}

function serverTask(callback) {
    browserSync = require('browser-sync');
    browserSync.init({
        reloadDebounce: 2000,
        minify: false,
        //server: {
        //    baseDir: config.server.root
        //},
        proxy: config.server.proxy,
        host: config.server.host,
        port: config.server.port

    });
    callback();
}

function apiTask() {
return gulp.src('*.js', {read: false})
    .pipe(shell([
        'npm start'
    ], {
        templateData: {}
    }))
}

function electronTask() {

    var packageJson = require('./package.json');

    // todo: Copy "/electron" sources to ./build

    // todo: Figure out where the root SHOULD be
    return gulp.src(".")
        .pipe(electron({
            src: './build',
            packageJson: packageJson,
            release: './release',
            cache: './cache',
            version: 'v0.35.2',
            packaging: true,
            platforms: ['darwin-x64'],
            //platforms: ['win32-ia32', 'darwin-x64'],
            platformResources: {
                darwin: {
                    CFBundleDisplayName: packageJson.name,
                    CFBundleIdentifier: packageJson.name,
                    CFBundleName: packageJson.name,
                    CFBundleVersion: packageJson.version,
                    icon: 'src/app/static/app-icons/yarn-icon.icns'
                },
                win: {
                    "version-string": packageJson.version,
                    "file-version": packageJson.version,
                    "product-version": packageJson.version,
                    "icon": 'src/app/static/app-icons/yarn-icon.ico'
                }
            }
        }))
        .pipe(gulp.dest("."));

}

function runElectronTask(callback) {
    var path = process.cwd() + "/build/";
    console.log("electron cwd path: " + path);
    electronServer = electronConnect.server.create({
        //port: 30081
        //path : "package.json",
        //path : "./build/package.json",
        //spawnOpt : {
        //    cwd: path
        //}
    });

    electronServer.start();
    callback();
}

function watchTask() {
    gulp.watch(paths.watches.less, gulp.series('compileLess', 'copyLess', browserSync.reload));
    gulp.watch(paths.watches.js, gulp.series('compressJS', 'copyJs', browserSync.reload));
    gulp.watch(paths.watches.stories, gulp.series('copyStories', browserSync.reload));
    gulp.watch(paths.watches.statics, gulp.series('copyStatic', browserSync.reload));
}

function watchElectronTask() {
    gulp.watch(paths.watches.less, gulp.series('compileLess', 'copyLess', electronServer.reload));
    gulp.watch(paths.watches.js, gulp.series('compressJS', 'copyJs', electronServer.reload));
    gulp.watch(paths.watches.stories, gulp.series('copyStories', electronServer.reload));
    gulp.watch(paths.watches.statics, gulp.series('copyStatic', electronServer.reload));
}

function lessTask() {
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(gulp.dest(paths.distTempLess));
}


// ------[ The End! --------


