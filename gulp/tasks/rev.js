var gulp       = require('gulp');
var rev        = require('gulp-rev');
var revReplace = require("gulp-rev-replace");
var browserSync = require('browser-sync');

gulp.task('rev', function () {
    return gulp.src(['build/**/*.js', 'build/**/*.css'])
        .pipe(rev())
        .pipe(gulp.dest('build'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build'));
});

gulp.task('revreplace', ['rev'], function() {
  var manifest = gulp.src('build/rev-manifest.json');

  return gulp.src('app/index.html')
    .pipe(revReplace({ manifest: manifest }))
    .pipe(gulp.dest('build'));
});
