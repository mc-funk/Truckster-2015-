'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var gutil       = require('gulp-util');

gulp.task('build', ['clean'], function(cb) {

  cb = cb || function() { gutil.log('Build complete!'); };

  global.isProd = false;

  runSequence(['styles', 'images', 'fonts', 'views', 'browserify'], 'revreplace', cb);
});
