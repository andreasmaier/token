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
            gulp.src(bowerFiles({
                "overrides": {
                    "phaser": {
                        "main": ["build/phaser.min.js", "build/phaser.map"]
                    }
                }
            }), {read: false}), {
                name: 'bower',
                transform: function (filepath, file) {
                    if(filepath.split('.').pop() === 'css') {
                        return '<link rel="stylesheet" type="text/css" href="/lib/' + filepath.split('/').pop() +'">';
                    } else {
                        return '<script src="/lib/' + filepath.split('/').pop() + '"></script>'
                    }
                }
            }
        ))
        .pipe(gulp.dest('./www'));
});
