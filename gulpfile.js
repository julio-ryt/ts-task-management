'use strict';

const { src, dest, watch } = require('gulp');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

function scssTask() {
  return src('./sass/main.scss', { sourcemaps: true })
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([cssnano()]))
    .pipe(concat('styles.min.css'))
    .pipe(dest('./css', { sourcemaps: '.' }));
}

function watchTask() {
  watch('./sass/**/*.scss', scssTask);
}

exports.default = watchTask;
