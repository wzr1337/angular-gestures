'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var usemin = require('gulp-usemin');
var path = require('path');
var rimraf = require('gulp-rimraf');
var ngAnnotate = require('gulp-ng-annotate');
var server = require('gulp-webserver');

var bases = {
 app: 'app/',
 dist: 'dist/'
};

var paths = {
  scripts: ['scripts/**/*.js', '!scripts/libs/**/*.js'],
  styles: ['styles/**/*.css'],
  html: ['index.html', '404.html'],
  views: ['views/**/*.html']
};

gulp.task('copy', ['clean'], function() {
  return gulp.src(paths.views, {cwd: bases.app, read:true})
  .pipe(gulp.dest(path.join(bases.dist, 'views')));
});

gulp.task('clean', function() {
  var stream = gulp.src([bases.dist], { read: false }) // much faster
    .pipe(rimraf());
  return stream;
});

// Process scripts and concatenate them into one output file
gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts, {cwd: bases.app})
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('usemin', ['clean', 'scripts'], function () {
  return gulp.src('./*.html', {cwd: bases.app})
    .pipe(usemin({
      js: [ngAnnotate(), uglify(), rev()]
    }))
    .pipe(gulp.dest(bases.dist));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(path.join(bases.app, paths.scripts[0]), ['usemin']);
});

gulp.task('default', ['clean', 'usemin', 'copy']);

gulp.task('serve', function() {
  gulp.src('./')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});
