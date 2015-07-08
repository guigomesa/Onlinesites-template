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
  return gulp.src('Content/onlinesites.*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('deploy/Content'))
    .pipe(notify({ message: 'Task Styles Concluída' }));
});

gulp.task('scripts', function() {
  return gulp.src('js/onlinesites*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('deploy/js'))
    .pipe(notify({ message: 'Task Script Concluída' }));
});

gulp.task('images', function() {
  return gulp.src('images/*')
    .pipe(gulp.dest('deploy/images'))
    .pipe(notify({ message: 'Tak Images Concluída' }));
});


gulp.task('bowertocdn', function(){
    return gulp.src(['*.html', '*.asp'])
    .pipe(cdnizer([
        {
            file: 'bower_components/jquery/dist/jquery.min.js',
            cdn: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'
        },
        {
            file: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
            cdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
        },
        {
            file: 'bower_components/bootstrap/dist/js/bootstrap.min.js',
            cdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'
        },
        {
            file: 'bower_components/fontawesome/css/font-awesome.min.css',
            cdn: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'
        },        
        {
            file: 'bower_components/jquery-validation/dist/jquery.validate.min.js',
            cdn: 'http://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.1/jquery.validate.min.js'
        },
        {
            file: 'bower_components/jquery-validation/dist/additional-methods.min.js',
            cdn: 'http://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.1/additional-methods.min.js'
        },
        {
            file: 'js/onlinesites.js',
            cdn: 'js/onlinesites.min.js'
        },
        {
            file: 'js/onlinesites.mobile.js',
            cdn: 'js/onlinesites.mobile.min.js'
        }
    ]))
    .pipe(gulp.dest("deploy"))
    .pipe(notify({ message: 'Task Bower-to-CDN Concluída' }));
});

gulp.task('clean', function(cb) {
    del(['deploy/Content/css', 'deploy/js', 'deploy/images'], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'bowertocdn');
});

gulp.task('watch', function() {
  gulp.watch('Content/onlinesites.*.css', ['styles']);
  gulp.watch('js/onlinesites*.js', ['scripts']);
  gulp.watch('images', ['images']);
  gulp.watch(['*.html'], ['bowertocdn']);
  livereload.listen();
  gulp.watch(['**']).on('change', livereload.changed);

});
