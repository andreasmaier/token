var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var clean = require('gulp-clean');

gulp.task('nuke-everything', function () {
    return gulp.src('www').pipe(clean());
});

gulp.task('copy-src', ['copy-dependencies', 'nuke-everything'], function () {
    return gulp.src('src/clients/web/**/*')
        .pipe(gulp.dest('www'));
});

gulp.task('copy-dependencies', ['nuke-everything'], function () {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('www/lib'));
});