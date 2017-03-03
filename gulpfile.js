const gulp = require('gulp'),
      handlebars = require('gulp-compile-handlebars'),
      rename = require('gulp-rename'),
      yaml = require('js-yaml'),
      fs   = require('fs');

const developerData = Object.assign({}, ...[
    './data/data.yaml',
    './data/employment.yaml',
    './data/open-source.yaml',
    './data/personal-details.yaml',
    './data/academics.yaml',
    './data/summary.yaml'
  ].map((file) => yaml.safeLoad(fs.readFileSync(file, 'utf8')))
);

gulp.task('developer', () => {
  gulp.src('templates/index.hbs')
    .pipe(handlebars(developerData, {
      helpers: require('./templates/helpers.js'),
      batch: ['./templates'],
      compile: { noEscape: true }
    }))
    .pipe(rename('developer.html'))
    .pipe(gulp.dest('./'))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'))
});

gulp.task('manager', () => {
  gulp.src('templates/index.hbs')
    .pipe(handlebars(managerData, {
      helpers: require('./templates/helpers.js'),
      batch: ['./templates'],
      compile: { noEscape: true }
    }))
    .pipe(rename('manager.html'))
    .pipe(gulp.dest('./'))
});

gulp.task('default', ['developer']);
