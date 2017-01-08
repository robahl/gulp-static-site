var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    pug = require('gulp-pug'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    jeet = require('jeet'),
    rupture = require('rupture');

gulp.task('stylus', function() {
  return gulp.src('src/styl/**/*.styl')
    .pipe(plumber())
    .pipe(stylus({
      use: [jeet(), rupture()]
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(connect.reload());
});

gulp.task('pug', function() {
  return gulp.src(['src/views/**/*.pug', '!src/views/includes/*.pug'])
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('public'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: ['public'],
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(['src/styl/**/*.styl'], ['stylus']);
  gulp.watch(['src/views/**/*.pug'], ['pug']);
});

gulp.task('default', ['stylus', 'pug', 'connect', 'watch']);
