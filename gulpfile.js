const gulp = require('gulp'),
      handlebars = require('gulp-compile-handlebars'),
      rename = require('gulp-rename'),
      yaml = require('js-yaml'),
      fs   = require('fs');

const developerData = Object.assign({}, ...[
    './data/developer/data.yaml',
    './data/developer/employment.yaml',
    './data/developer/open-source.yaml',
    './data/developer/personal-details.yaml',
    './data/developer/academics.yaml',
    './data/developer/summary.yaml'
  ].map((file) => yaml.safeLoad(fs.readFileSync(file, 'utf8')))
);

const managerData = {};

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

gulp.task('default', ['developer', 'manager']);
