var gulp = require('gulp');
var exec = require('child_process').exec;

//Run Flask server
gulp.task('flask', function() {
    var proc = exec('venv/bin/python app.py debug');
});
