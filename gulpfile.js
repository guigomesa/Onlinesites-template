var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    cdnizer = require("gulp-cdnizer");

gulp.task('styles', function() {
  return gulp.src('src/css/**/*.min.css')
    .pipe(minifycss())
    .pipe(gulp.dest('deploy/assets/css'))
    .pipe(notify({ message: 'Task Styles Concluída' }));
});

gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('deploy/assets/js'))
    .pipe(notify({ message: 'Task Script Concluída' }));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('deploy/assets/images'))
    .pipe(notify({ message: 'Tak Images Concluída' }));
});


gulp.task('bowertocdn', function(){
    return gulp.src(['*.html', '*.asp'])
    .pipe(cdnizer([
        {
            file: 'assets/components/jquery/dist/jquery.min.js',
            cdn: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'
        },
        {
            file: 'assets/components/bootstrap/dist/css/bootstrap.min.css',
            cdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
        },
        {
            file: 'assets/components/bootstrap/dist/js/bootstrap.min.js',
            cdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'
        },
        {
            file: 'assets/components/font-awesome/css/font-awesome.min.css',
            cdn: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'
        },
        {
            file: 'assets/components/video.js/dist/video-js/video-js.min.css',
            cdn: 'https://vjs.zencdn.net/4.12/video-js.css'
        },
        {
            file: 'assets/components/video.js/dist/video-js/video.js',
            cdn: 'https://vjs.zencdn.net/4.12/video.js'
        },
        {
            file: 'assets/components/jQuery-Mask-Plugin/dist/jquery.mask.min.js',
            cdn: 'http://igorescobar.github.io/jQuery-Mask-Plugin/js/jquery.mask.min.js'
        },
        {
            file: 'assets/components/jquery-validation/dist/jquery.validate.min.js',
            cdn: 'http://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.1/jquery.validate.min.js'
        },
        {
            file: 'assets/components/jquery-validation/dist/additional-methods.min.js',
            cdn: 'http://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.1/additional-methods.min.js'
        }
    ]))
    .pipe(gulp.dest("deploy"))
    .pipe(notify({ message: 'Tak Bower-to-CDN Concluída' }));
});

gulp.task('clean', function(cb) {
    del(['deploy', 'deploy/assets/css', 'deploy/assets/js', 'deploy/assets/images'], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'bowertocdn');
});

gulp.task('watch', function() {
  gulp.watch('src/css/**/*.min.css', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);
  gulp.watch(['*.html', '*.asp'], ['bowertocdn']);
  livereload.listen();
  gulp.watch(['src/**']).on('change', livereload.changed);

});
