var gulp = require('gulp');

var clean = require('gulp-clean');
var runSequence = require('run-sequence');

gulp.task('nuke-everything', function () {
    return gulp.src('www').pipe(clean());
});

gulp.task('build', ['nuke-everything'], function (callback) {
    return runSequence(['inject-js'], callback);
});
