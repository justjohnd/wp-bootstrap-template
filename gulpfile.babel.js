import { src, dest, watch, series, parallel } from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import imagemin from 'gulp-imagemin';
import del from 'del';
const PRODUCTION = yargs.argv.prod;

// Compile css
export const style = () => {
  return src('src/sass/style.scss')
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(PRODUCTION, postcss([autoprefixer])))
    .pipe(gulpif(PRODUCTION, cleanCss({ compatibility: 'ie8' })))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest('dist/css'));
};

//Optimize img
export const img = () => {
  return src('src/img/**/*.{jpg,jpeg,png,svg,gif}')
    .pipe(gulpif(PRODUCTION, imagemin()))
    .pipe(dest('dist/img'));
};

// Copy files from src not included in any directories to dist
export const copy = () => {
  return src([
    'src/**/*',
    '!src/{img,js,sass}',
    '!src/{img,js,sass}/**/*',
  ]).pipe(dest('dist'));
};

// Delete dist on build
export const clean = () => del(['dist']);

// Set dev and build tasks
export const dev = series(clean, parallel(style, img, copy), watchAll);
export const build = series(clean, parallel(style, img, copy));
export default dev;

//Watch for changes
export const watchAll = () => {
  watch('src/sass/**/*.scss', style);
  watch('src/img/**/*.{jpg,jpeg,png,svg,gif}', img);
  watch(['src/**/*', '!src/{img,js,sass}', '!src/{img,js,sass}/**/*'], copy);
};
