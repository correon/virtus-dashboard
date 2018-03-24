const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');

/* ------------ Browsersync server ------------- */
gulp.task('server', function() {
  browserSync.init({
    server: {
      port: 9000,
      baseDir: 'build'
    }
  });

  gulp.watch('build/**/*').on('change', browserSync.reload);
});

/* ------------ Clean build directory------------- */
gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('images', function() {
  return gulp.src('src/images/*.*', { base: 'src/' }).pipe(gulp.dest('build'));
});

gulp.task('html', function() {
  return gulp.src('src/*.html').pipe(gulp.dest('build'));
});

/* ------------ Sass compile ------------- */
gulp.task('css', function() {
  return gulp
    .src('src/styles/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('js', function() {
  return gulp.src('src/*.js').pipe(gulp.dest('build'));
});

/* ------------ Watchers ------------- */
gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.scss', ['css']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/*.js', ['js']);
  gulp.watch('src/images/*.*', ['images']);
});

gulp.task('default', function() {
  runSequence('clean', ['images', 'html', 'css', 'js'], ['watch', 'server']);
});
