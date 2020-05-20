const browserify = require('browserify')
const gulp = require('gulp')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const gutil = require('gulp-util')
// var uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps')
const reactify = require('reactify')
const rename = require('gulp-rename')

gulp.task('demo', function() {
  const b = browserify({
    entries: './docs/demo/run.js',
    debug: true,
    transform: [[reactify, {es6: true, everything: true}]]
  })

  return b.bundle()
    .pipe(source('./docs/demo/run.js'))
    .pipe(buffer())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./docs/demo/write/'));
});

gulp.task('javascript', function() {
  const b = browserify({
    entries: './client/run.js',
    debug: true,
    transform: [[reactify, {es6: true, everything: true}]]
  })

  return b.bundle()
    .pipe(source('./client/run.js'))
    .pipe(buffer())
    // .pipe(sourcemaps.init({loadMaps: true}))
    // Add transformation tasks to the pipeline here.
    // .pipe(uglify())
    // .on('error', gutil.log)
    // .pipe(sourcemaps.write('./'))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./www/'));
});

const less = require('gulp-less')

gulp.task('less', function() {
  return gulp.src('./client/less/index.less')
    .pipe(less({
      // paths: [path.join(__dirname, 
    }))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./www'))
});

gulp.task('build', gulp.parallel('less', 'javascript'));

gulp.task('watch', function() {
  gulp.watch('client/**/*.js', gulp.series('javascript'));
  gulp.watch('client/**/*.less', gulp.series('less'));
});

gulp.task('default', gulp.series('build', 'watch'));
