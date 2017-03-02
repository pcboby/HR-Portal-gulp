// Generated on 2017-02-28 using generator-angular 0.15.1
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');

var $root = require('./bower.json').rootPath || './'

var $path = {
    app: $root + '/app',
    dist: $root + '/dist'
};

var paths = {
    scripts: [$path.app + '/scripts/app/*.js'],
    css: [$path.app + '/themes/**/css/*'],
    images: [$path.app + '/themes/**/images/*'],
    fonts: [$path.app + '/themes/**/fonts/*'],
    test: ['test/spec/**/*.js'],
    testRequire: [
        $path.app + '/bower_components/angular/angular.js',
        $path.app + '/bower_components/angular-mocks/angular-mocks.js',
        $path.app + '/bower_components/angular-resource/angular-resource.js',
        $path.app + '/bower_components/angular-cookies/angular-cookies.js',
        $path.app + '/bower_components/angular-sanitize/angular-sanitize.js',
        $path.app + '/bower_components/angular-route/angular-route.js',
        'test/mock/**/*.js',
        'test/spec/**/*.js'
    ],
    karma: 'karma.conf.js',
    views: {
        main: $path.app + '/index.html',
        files: [$path.app + '/views/**/*.html']
    }
};

////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()
    .pipe($.jshint, '.jshintrc')
    .pipe($.jshint.reporter, 'jshint-stylish');

var css = lazypipe()
    .pipe($.autoprefixer, 'last 1 version')
    .pipe(gulp.dest, '.tmp/themes');
var images = lazypipe()
    .pipe(gulp.dest, '.tmp/themes');

///////////
// Tasks //
///////////

gulp.task('css', function() {
    return gulp.src(paths.css)
        .pipe(css());
});

gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(images());
});

gulp.task('lint:scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(lintScripts());
});

gulp.task('clean:tmp', function(cb) {
    rimraf('./.tmp', cb);
});

gulp.task('start:client', ['start:server', 'css', 'images'], function() {
    openURL('http://localhost:9000/app');
});

gulp.task('start:server', function() {
    $.connect.server({
        root: ['./', '.tmp'],
        livereload: true,
        // Change this to '0.0.0.0' to access the server from outside.
        port: 9000
    });
});

gulp.task('start:server:test', function() {
    $.connect.server({
        root: ['test', $path.app, '.tmp'],
        livereload: true,
        port: 9001
    });
});

gulp.task('watch', function() {
    $.watch(paths.css)
        .pipe($.plumber())
        .pipe(css())
        .pipe($.connect.reload());

    $.watch(paths.views.files)
        .pipe($.plumber())
        .pipe($.connect.reload());

    $.watch(paths.scripts)
        .pipe($.plumber())
        .pipe(lintScripts())
        .pipe($.connect.reload());

    $.watch(paths.test)
        .pipe($.plumber())
        .pipe(lintScripts());

    gulp.watch('bower.json', ['bower']);
});

gulp.task('serve', function(cb) {
    runSequence('clean:tmp', ['lint:scripts'], ['start:client'],
        'watch', cb);
});

gulp.task('serve:prod', function() {
    $.connect.server({
        root: [$path.dist],
        livereload: true,
        port: 9000
    });
});

gulp.task('test', ['start:server:test'], function() {
    var testToFiles = paths.testRequire.concat(paths.scripts, paths.test);
    return gulp.src(testToFiles)
        .pipe($.karma({
            configFile: paths.karma,
            action: 'watch'
        }));
});

// inject bower components
gulp.task('bower', function() {
    return gulp.src(paths.views.main)
        .pipe(wiredep({
            directory: './bower_components',
            ignorePath: '..'
        }))
        .pipe(gulp.dest($path.app + '/'));
});

///////////
// Build //
///////////

gulp.task('clean:dist', function(cb) {
    rimraf('./dist', cb);
});

gulp.task('client:build', ['css'], function() {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var mainFilter = $.filter(['**/*','!index.html']);//{restore:true}

    return gulp.src([$path.app + '/**/**/*.html','!app/scripts/app/*.js',$path.app+'/**/*.js'])
        //join path
        .pipe($.useref({ searchPath: ['.tmp'] }))
        //filter js
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        //filter css
        .pipe(cssFilter)
        .pipe($.minifyCss({ cache: true }))
        .pipe(cssFilter.restore())
        //add all
        .pipe(mainFilter)
        .pipe($.rev())
        .pipe(mainFilter.restore())
        .pipe($.revReplace())
        //pipe to
        .pipe(gulp.dest($path.dist));
});

// gulp.task('html', function () {
//   return gulp.src($path.app + '/views/**/*')
//     // .pipe($.rev())
//     .pipe(gulp.dest($path.dist + '/views'));
// });

gulp.task('copy:extras', function() {
    return gulp.src($path.app + '/*/.*', { dot: true })
        .pipe(gulp.dest($path.dist));
});

gulp.task('copy:fonts', function() {
    return gulp.src([
            './bower_components/bootstrap/fonts/**/*',
            './bower_components/font-awesome/fonts/**/*',
            './bower_components/simple-line-icons/fonts/**/*'
        ])
        .pipe(gulp.dest($path.dist + '/themes/default/fonts'));
});

gulp.task('copy:api', function() {
    return gulp.src($path.app + '/api/**/*')
        .pipe(gulp.dest($path.dist + '/api'));
});
gulp.task('copy:images', function() {
    return gulp.src($path.app + '/themes/default/images/**/*')
        .pipe(gulp.dest($path.dist + '/themes/default/images'));
});

// gulp.task('copy:tpls', function () {
//   return gulp.src($path.app + '/tpls/**/*')
//     .pipe(gulp.dest($path.dist + '/tpls'));
// });

gulp.task('copy:upload', function() {
    return gulp.src($path.app + '/upload/**/*')
        .pipe(gulp.dest($path.dist + '/upload'));
});

// //copy utils
// gulp.task('copy:utils', function() {
//     return gulp.src($path.app + '/scripts/utils/*.js')
//         .pipe(gulp.dest($path.dist + '/scripts/utils'));
// });
// //copy controllers
// gulp.task('copy:controllers', function() {
//     return gulp.src($path.app + '/scripts/controllers/**/*.js')
//         //.pipe($.uglify())//js.controllers压缩
//         .pipe(gulp.dest($path.dist + '/scripts/controllers'));
// });
// //copy controllers
// gulp.task('copy:common', function() {
//     return gulp.src($path.app + '/scripts/common.js')
//         .pipe(gulp.dest($path.dist + '/scripts'));
// });
// //copy scripts
// gulp.task('copy:scripts', function() {
//     runSequence(['copy:utils', 'copy:controllers', 'copy:common']);
// });

gulp.task('build', ['clean:dist'], function() {
    runSequence(['copy:extras', 'copy:images', 'copy:fonts', 'copy:api', 'copy:upload', 'client:build']);
});

gulp.task('default', ['build']);
