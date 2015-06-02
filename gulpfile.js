var 
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch')
;

gulp.task('compress', function() {
  return gulp.src('src/jquery.twst.js')
    .pipe(uglify())
    .pipe(rename('jquery.twst.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    return gulp.src('src/twst.scss')
        .pipe(sass({
            errLogToConsole: true
        })) 
        .pipe(gulp.dest('dist/'))
    ;
});

gulp.task('watch', function () {
    gulp.watch('./src/*',['build'])
});

gulp.task('default',['build']);
gulp.task('build',['sass','compress']);

