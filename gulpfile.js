'use strict';
const gulp = require('gulp');

// UTILS
const concat = require('gulp-concat');
const gutil = require('gulp-util');

// CSS
const cleanCSS = require('gulp-clean-css');

// SCSS
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

// JS
const order = require('gulp-order');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');


// livereloading
const browserSync = require('browser-sync').create();


// ===============================
// GLOBAL OPTIONS
// ===============================
const options = {
  minify: {
    noSource: true,
    ext: { 
      min: '.js' 
    }
  },
  uglify: {
    mangle: false,
    ie8: true,
    safari10: true
  },
  babel: {
    presets: ['@babel/env']
  },
  scss: {
    outputStyle: 'compressed'
  },
  cleancss: {
    compatibility: 'ie8'
  }
}

// ===============================
// REUSABLE FUNCTIONS
// ===============================
const jsErrHandler = (err) => {
  gutil.log(gutil.colors.red('[Error]'), err.toString());
  console.error(err.message);
  this.emit('end');
}

const jsDependency = ( 
  sync 
  , source
  , dest
  , filename = 'bundledependency.js') => {

  const proc  = gulp.src(source).pipe(order([
      'jquery.min.js',
      'priority/**/*.js',
      'common/**/*.js'
    ]))
    .pipe(minify(options.minify))
    .on('error', (err) => {jsErrHandler(err)})
    .pipe(concat(filename))
    .pipe(gulp.dest(dest));

  if(sync) {
    proc.pipe(browserSync.reload({
      stream: true
    }));
  }

  return proc
}

const jsProject = ( 
  sync 
  , source 
  , dest
  , filename = 'bundleproject.js') => {

  const proc = gulp.src(source).pipe(babel(options.babel))
    .pipe(uglify(options.uglify))
    .on('error', (err) => {jsErrHandler(err)})
    .pipe(concat(filename))
    .pipe(gulp.dest(dest));
  if(sync) {
    proc.pipe(browserSync.reload({
      stream: true
    }));
  }
  return proc
}

const scss = ( 
  sync 
  , source
  , dest ) => {

  const plugins = [
      autoprefixer() ,
      cssnano({
        zindex: false,
        reduceIdents: false
      })
  ];

  const proc = gulp.src(source)
    .pipe(sass().on('error', sass.logError))
    .pipe(sass(options.sass)) // Using gulp-sass
    .pipe(postcss(plugins))
    .pipe(gulp.dest(dest));

  if(sync) {
    proc.pipe(browserSync.reload({
      stream: true
    }));
  }

  return proc
}

const css = (
  sync
  , source
  , dest 
  , filename = 'bundlecss.css') => {

  const proc =  gulp.src(source)
    .pipe(cleanCSS(options.cleancss))
    .pipe(concat(filename))
    .pipe(gulp.dest(dest));

  if(sync) {
    proc.pipe(browserSync.reload({
      stream: true
    }));
  }

  return proc
}

// ===============================
// SHOPIFY TASK RUNNERS
// ===============================
gulp.task('js-dependency', () => { jsDependency(false, 'src/js/dependency/**/*.js','assets/') });
gulp.task('js-project', () => { jsProject(false, 'src/js/project/**/*.js','assets/') });
gulp.task('scss', () => { scss(false, 'src/scss/**/*.scss','assets/') });
gulp.task('css', () => { css(false, 'src/css/**/*.css','assets/') });



gulp.task('default', [
  'css'
  , 'scss'
  , 'js-dependency'
  , 'js-project']
  , function(){
  gulp.watch('src/css/**/*.css', ['css']);
  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('src/js/dependency/**/*.js', ['js-dependency']);
  gulp.watch('src/js/project/**/*.js', ['js-project']);
});


// ===============================
// PLAYGROUND TASK RUNNERS
// ===============================

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      startPath:'./playground'
    }
  })
});


gulp.task('css-pg', () => { css(true, 'src/css/**/*.css','assets/') });
gulp.task('scss-pg', () => { scss(true, 'src/scss/**/*.scss','assets/') });
gulp.task('js-dependency-pg', () => { jsDependency(true, 'src/js/dependency/**/*.js','assets/') });
gulp.task('js-project-pg', () => { jsProject(true, 'src/js/project/**/*.js','assets/') });

gulp.task('playground', [
  'browserSync'
  , 'css-pg'
  ,'scss-pg'
  , 'js-dependency-pg'
  , 'js-project-pg']
  , function(){
  gulp.watch('src/css/**/*.css', ['css-pg']);
  gulp.watch('src/scss/**/*.scss', ['scss-pg']);
  gulp.watch('src/js/dependency/**/*.js', ['js-dependency-pg']);
  gulp.watch('src/js/project/**/*.js', ['js-project-pg']);
  gulp.watch('playground/**/*.html', browserSync.reload);
});












