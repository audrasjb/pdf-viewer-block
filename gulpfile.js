var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var csso = require('gulp-csso');
var del = require('del');
const minify = require('gulp-minify');
var concat = require("gulp-concat");

  /**
   * [template_url] == mise en place des variables
   */
  var config = {
    theme: ""
  }
 

/*min css*/

gulp.task('cleancss', function(){
	return del([config.theme + 'public/css/style.min.css'])
});


gulp.task('mincss',['cleancss'], function () {
	 return gulp.src(config.theme + 'public/css/**/*.css')
   	.pipe(concatCss("style.min.css"))
    .pipe(csso())
    .pipe(gulp.dest(config.theme + 'public/css'))
});

gulp.task('cleancssadmin', function(){
	return del([config.theme + 'admin/css/style.min.css'])
});

gulp.task('mincssadmin',['cleancssadmin'], function () {
	 return gulp.src(config.theme + 'admin/css/**/*.css')
   	.pipe(concatCss("style.min.css"))
    .pipe(csso())
    .pipe(gulp.dest(config.theme + 'admin/css'))
});

 

//gulp.task('minjs', function () {
//	return gulp.src(config.theme + 'public/js/**/*.js')
//    .pipe(concat('scripts.js'))
 // 	.pipe(minify())
   // .pipe(gulp.dest(config.theme + 'public/js'))
//});






/*The Night Watch*/
gulp.task('watch', function () {
  gulp.watch(config.theme + 'public/css/**/!(style.min)*.css',['mincss']);
  gulp.watch(config.theme + 'admin/css/**/!(style.min)*.css',['mincssadmin']);
  //gulp.watch(config.theme + 'public/js/**/!(scripts.min)*.js',['minjs']);
});