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
import named from 'vinyl-named';
import browserSync from 'browser-sync';
import zip from 'gulp-zip';
import replace from 'gulp-replace';
import wpPot from 'gulp-wp-pot';
import info from './package.json';
const PRODUCTION = yargs.argv.prod;

// Compile css
export const style = () => {
  return src('src/sass/style.scss')
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(PRODUCTION, postcss([autoprefixer])))
    .pipe(gulpif(PRODUCTION, cleanCss({ compatibility: 'ie8' })))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest('dist/css'))
    .pipe(server.stream());
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

export const scripts = () => {
  return src(['src/js/index.js', 'src/js/navigation.js'])
    .pipe(named())
    .pipe(
      webpack({
        module: {
          rules: [
            {
              test: /\.js$/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            },
          ],
        },
        mode: PRODUCTION ? 'production' : 'development',
        devtool: !PRODUCTION ? 'inline-source-map' : false,
        output: {
          filename: '[name].js',
        },
        externals: {
          bootstrap: 'bootstrap',
        },
      })
    )
    .pipe(dest('dist/js'));
};

// Browsersync
const server = browserSync.create();
export const serve = (done) => {
  server.init({
    proxy: 'http://localhost/bootstrap-theme',
  });
  done();
};
export const reload = (done) => {
  server.reload();
  done();
};

//Compress for zip file
export const compress = () => {
  return src([
    '**/*',
    '!node_modules{,/**}',
    '!bundled{,/**}',
    '!src{,/**}',
    '!.babelrc',
    '!.gitignore',
    '!gulpfile.babel.js',
    '!package.json',
    '!package-lock.json',
  ])
    .pipe(
      gulpif(
        (file) => file.relative.split('.').pop() !== 'zip',
        replace('_themename', info.name)
      )
    )
    .pipe(zip(`${info.name}.zip`))
    .pipe(dest('bundled'));
};

//Translations
export const pot = () => {
  return src('**/*.php')
    .pipe(
      wpPot({
        domain: '_themename',
        package: info.name,
      })
    )
    .pipe(dest(`languages/${info.name}.pot`));
};

//Watch for changes
export const watchAll = () => {
  watch('src/sass/**/*.scss', style);
  watch('src/img/**/*.{jpg,jpeg,png,svg,gif}', series(images, reload));
  watch(
    ['src/**/*', '!src/{img,js,sass}', '!src/{img,js,sass}/**/*'],
    series(copy, reload)
  );
  watch('src/js/**/*.js', series(scripts, reload));
  watch('**/*.php', reload);
};

//Set up dev and build commands. Note that all tasks must be registered BEFORE this code, therefore this code needs to come at the end of the file
export const dev = series(
  clean,
  parallel(style, images, copy, scripts),
  serve,
  watchAll
);
export const build = series(
  clean,
  parallel(style, images, copy, scripts),
  pot,
  compress
);
export default dev;
