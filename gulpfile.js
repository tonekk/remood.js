var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var del = require('del');

gulp.task('assets:js', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './assets/js/remood.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('./assets/js/remood.js'))
    .pipe(buffer())
    //.pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        // .pipe(uglify())
        .on('error', gutil.log)
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', function(done) {
  del(['./dist/*', '!./dist/.keep'], done);
});

gulp.task('default',
  ['assets']
);

gulp.task('assets',
  ['clean', 'assets:js']
);
