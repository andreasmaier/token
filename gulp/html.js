var gulp = require('gulp');
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');

gulp.task('inject-js', ['copy-js'], function () {
    return gulp.src('./src/client/web/index.html')
        .pipe(inject(
            gulp.src(['./src/client/web/**/*.js'])
                .pipe(angularFilesort()), {
                ignorePath: '/src/client/web'
            }
        ))
        .pipe(inject(
            gulp.src(bowerFiles(), {read: false}), {
                name: 'bower',
                transform: function (filepath, file) {
                    return '<script src="/lib/' + filepath.split('/').pop() + '"></script>'
                }
            }
        ))
        .pipe(gulp.dest('./www'));
});
