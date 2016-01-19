var gulp = require('gulp');
var clean = require('gulp-clean');
var mainBowerFiles = require('main-bower-files');

gulp.task('clean-js', function () {
    return gulp.src('www/**/*.js').pipe(clean());
});

gulp.task('copy-dependencies', ['clean-js'], function () {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('www/lib'));
});

gulp.task('copy-js', ['copy-dependencies'], function () {
    return gulp.src('src/client/web/**/*')
        .pipe(gulp.dest('www'));
});