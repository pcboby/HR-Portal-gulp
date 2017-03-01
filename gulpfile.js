// Generated on 2017-02-28 using generator-angular 0.15.1
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');

var yeoman = {
  app: require('./bower.json').appPath || 'app',
  dist: 'dist'
};

var paths = {
  scripts: [yeoman.app + '/scripts/app/*.js'],
  themes: [yeoman.app + '/themes/**/**/*.css'],
  test: ['test/spec/**/*.js'],
  testRequire: [
    yeoman.app + '/bower_components/angular/angular.js',
    yeoman.app + '/bower_components/angular-mocks/angular-mocks.js',
    yeoman.app + '/bower_components/angular-resource/angular-resource.js',
    yeoman.app + '/bower_components/angular-cookies/angular-cookies.js',
    yeoman.app + '/bower_components/angular-sanitize/angular-sanitize.js',
    yeoman.app + '/bower_components/angular-route/angular-route.js',
    'test/mock/**/*.js',
    'test/spec/**/*.js'
  ],
  karma: 'karma.conf.js',
  views: {
    main: yeoman.app + '/index.html',
    files: [yeoman.app + '/views/**/*.html']
  }
};

////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
  .pipe($.jshint.reporter, 'jshint-stylish');

var themes = lazypipe()
  .pipe($.autoprefixer, 'last 1 version')
  .pipe(gulp.dest, '.tmp/themes');

///////////
// Tasks //
///////////

gulp.task('themes', function () {
  return gulp.src(paths.themes)
    .pipe(themes());
});

gulp.task('lint:scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(lintScripts());
});

gulp.task('clean:tmp', function (cb) {
  rimraf('./.tmp', cb);
});

gulp.task('start:client', ['start:server', 'themes'], function () {
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
    root: ['test', yeoman.app, '.tmp'],
    livereload: true,
    port: 9001
  });
});

gulp.task('watch', function () {
  $.watch(paths.themes)
    .pipe($.plumber())
    .pipe(themes())
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

gulp.task('serve', function (cb) {
  runSequence('clean:tmp',
    ['lint:scripts'],
    ['start:client'],
    'watch', cb);
});

gulp.task('serve:prod', function() {
  $.connect.server({
    root: [yeoman.dist],
    livereload: true,
    port: 9000
  });
});

gulp.task('test', ['start:server:test'], function () {
  var testToFiles = paths.testRequire.concat(paths.scripts, paths.test);
  return gulp.src(testToFiles)
    .pipe($.karma({
      configFile: paths.karma,
      action: 'watch'
    }));
});

// inject bower components
gulp.task('bower', function () {
  return gulp.src(paths.views.main)
    .pipe(wiredep({
      directory: './bower_components',
      ignorePath: '..'
    }))
  .pipe(gulp.dest(yeoman.app + '/'));
});

///////////
// Build //
///////////

gulp.task('clean:dist', function (cb) {
  rimraf('./dist', cb);
});

gulp.task('client:build', ['themes'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return gulp.src(yeoman.app+'/**/**/*.html')
    //join path
    .pipe($.useref({searchPath: ['.tmp']}))
    //filter js
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    //filter css
    .pipe(cssFilter)
    .pipe($.minifyCss({cache: true}))
    .pipe(cssFilter.restore())
    //add rev
    .pipe($.rev())
    .pipe($.revReplace())
    //pipe to
    .pipe(gulp.dest(yeoman.dist));
});

// gulp.task('html', function () {
//   return gulp.src(yeoman.app + '/views/**/*')
//     // .pipe($.rev())
//     .pipe(gulp.dest(yeoman.dist + '/views'));
// });

gulp.task('copy:extras', function () {
  return gulp.src(yeoman.app + '/*/.*', { dot: true })
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('copy:fonts', function () {
  return gulp.src([
      './bower_components/bootstrap/fonts/**/*',
      './bower_components/font-awesome/fonts/**/*',
      './bower_components/simple-line-icons/fonts/**/*'
    ])
    .pipe(gulp.dest(yeoman.dist + '/themes/default/fonts'));
});

gulp.task('copy:api', function () {
  return gulp.src(yeoman.app + '/api/**/*')
    .pipe(gulp.dest(yeoman.dist + '/api'));
});
gulp.task('copy:images', function () {
  return gulp.src(yeoman.app + '/themes/default/images/**/*')
    .pipe(gulp.dest(yeoman.dist + '/themes/default/images'));
});

// gulp.task('copy:tpls', function () {
//   return gulp.src(yeoman.app + '/tpls/**/*')
//     .pipe(gulp.dest(yeoman.dist + '/tpls'));
// });

gulp.task('copy:upload', function () {
  return gulp.src(yeoman.app + '/upload/**/*')
    .pipe(gulp.dest(yeoman.dist + '/upload'));
});

//copy utils
gulp.task('copy:utils', function () {
  return gulp.src(yeoman.app + '/scripts/utils/*.js')
    .pipe(gulp.dest(yeoman.dist + '/scripts/utils'));
});
//copy controllers
gulp.task('copy:controllers', function () {
  return gulp.src(yeoman.app + '/scripts/controllers/**/*.js')
    //.pipe($.uglify())//js.controllers压缩
    .pipe(gulp.dest(yeoman.dist + '/scripts/controllers'));
});
//copy controllers
gulp.task('copy:common', function () {
  return gulp.src(yeoman.app + '/scripts/common.js')
    .pipe(gulp.dest(yeoman.dist + '/scripts'));
});
//copy scripts
gulp.task('copy:scripts', function () {
  runSequence(['copy:utils', 'copy:controllers', 'copy:common']);
});

gulp.task('build', ['clean:dist'], function () {
  runSequence(['copy:extras', 'copy:scripts','copy:images', 'copy:fonts', 'copy:api', 'copy:upload', 'client:build']);
});

gulp.task('default', ['build']);
