var gulp = require('gulp'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename');

gulp.task('handlebars', function() {
  gulp.src('templates/index.hbs')
    .pipe(handlebars({}, {
      batch: ['./templates']
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'))
});

gulp.task('default', ['handlebars']);
