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
import webpack from 'webpack-stream';
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

//Optimize Images
export const images = () => {
  return src('src/img/**/*.{jpg,jpeg,png,svg,gif}')
    .pipe(gulpif(PRODUCTION, imagemin()))
    .pipe(dest('dist/images'));
};

export const copy = () => {
  return src([
    'src/**/*',
    '!src/{img,js,sass}',
    '!src/{img,js,sass}/**/*',
  ]).pipe(dest('dist'));
};

// Delete dist on each reload
export const clean = () => del(['dist']);

//Set up dev and build operations
export const dev = () => series(clean, parallel(style, images, copy), watchAll);
export const build = () => series(clean, parallel(style, images, copy));
export default dev;

export const scripts = () => {
  return src('src/js/index.js')
    .pipe(
      webpack({
        module: {
          rules: [
            {
              test: /\.js$/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [],
                },
              },
            },
          ],
        },
        mode: PRODUCTION ? 'production' : 'development',
        devtool: !PRODUCTION ? 'inline-source-map' : false,
        output: {
          filename: 'index.js',
        },
      })
    )
    .pipe(dest('dist/js'));
};

//Watch for changes
export const watchAll = () => {
  watch('src/sass/**/*.scss', style);
  watch('src/img/**/*.{jpg,jpeg,png,svg,gif}', images);
  watch(['src/**/*', '!src/{img,js,sass}', '!src/{img,js,sass}/**/*'], copy);
};
