var gulp = require('gulp');
//var browserSync = require('browser-sync').create();
//var nodemon = require('gulp-nodemon');

//var started = false;

//gulp.task('js-watch', ['inject-js'], function () {
//    browserSync.reload();
//});

gulp.task('watch', ['build'], function () {
    //browserSync.init(null, {
    //    proxy: 'http://localhost:4004',
    //    browser: 'google chrome',
        //ws: true,
        //port: 8888
    //});

    gulp.watch(['src/client/web/**/*.js', 'src/client/web/**/*.html'], ['inject-js']);
});

//gulp.task('nodemon', ['build'], function (callback) {
//
//    return nodemon({
//        script: 'src/server/server.js'
//    })
//        .on('start', function () {
//            console.log('STARTING');
//
//            if (!started) {
//                callback();
//                started = true;
//            }
//        });
//});