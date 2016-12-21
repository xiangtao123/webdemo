
var gulp = require('gulp');

// minify js
var uglify = require('gulp-uglify');
var pump = require('pump');

// minify css
var cleanCSS = require('gulp-clean-css');

// rename
var rename = require('gulp-rename');

// concat js
var concat = require('gulp-concat');

// concat css
var concatcss = require('gulp-concat-css');

// sourcemaps
var sourcemaps = require('gulp-sourcemaps');

// js hint
var jshint = require('gulp-jshint');

// concatreplace
var htmlreplace = require('gulp-html-replace');

// gulp-useref
var useref = require('gulp-useref');

// gulp-if
var gulpif = require('gulp-if');


// del
var del = require('del');

// web server
var webserver = require('gulp-webserver');


// minify concat
var dist_path = 'dist';

// src path
var src_path = 'src';


gulp.task('dev_server',function(){
  return gulp.src(src_path)
           .pipe(webserver({
              livereload:true,
              directoryListing:false,
              open:true
            }));
});

gulp.task('dist_server',function(){
   return gulp.src(dist_path)
           .pipe(webserver({
              livereload:true,
              directoryListing:false,
              open:true
            }));
});


gulp.task('clean', function(){
  return del([dist_path+'/**/*']); 
});

gulp.task('init',['clean'],function(){
  return gulp.src([src_path+'/**/*'])
           .pipe(gulp.dest(dist_path));

});


gulp.task('minify-js', function(cb){
  return gulp.src(src_path+'/js/*.js')
    .pipe(concat('concatenated.js'))
    .pipe(gulp.dest(dist_path+'/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(dist_path+'/js'));

});

gulp.task('minify-css', function(){
  return gulp.src(src_path+'/css/*.css')
         .pipe(concatcss('concatenated.css'))
         .pipe(gulp.dest(dist_path+'/css'))
         .pipe(cleanCSS({debug:true}, function(details){
           console.log(details.name + ': ' + details.stats.originalSize);
           console.log(details.name + ': ' + details.stats.minifiedSize);
         }))
         .pipe(rename({suffix:'.min'}))
         .pipe(gulp.dest(dist_path+'/css'));
});

gulp.task('lint', function(){
  return gulp.src([src_path+'/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('html-replace',['minify-css','minify-js'], function(){
  return gulp.src(dist_path+'/*.html')
    .pipe(htmlreplace({
      js:'js/concatenated.min.js',
      css:'css/concatenated.min.css'
    }))
    .pipe(gulp.dest(dist_path+'/'));// html 替换后的目录
});


gulp.task('html-useref', function () {
    return gulp.src(dist_path+'/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['html-useref']);


