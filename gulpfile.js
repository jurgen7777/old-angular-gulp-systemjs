var gulp = require('gulp');
var typescript = require('typescript');
var tsc = require('gulp-typescript');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
// var sourcemaps = require('gulp-sourcemaps');

var systemjsBuilder = require('systemjs-builder');

var tsProject = tsc.createProject({
  "target": "es5",
  "lib": ["es6", "dom"],
  "module": "commonjs",
  "moduleResolution": "node",
  "sourceMap": false,
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true,
  "removeComments": true,
  "noImplicitAny": false,
  "suppressImplicitAnyIndexErrors": true
});

gulp.task('serve', function() {
  browserSync.init({
    open: true,
    host: 'localhost',
    injectChanges: true,
    watchOptions: {
      ignored: 'node_modules'
    },
    ghostMode: false,
    watch: false,
  });
})

gulp.task('tsc', function () {

  return gulp.src(['app/**/*.ts'], { base: 'app' })
    // .pipe(sourcemaps.init())
    // .pipe(tsc({   
    //   "target": "es5",
    //   "lib": ["es6", "dom"],
    //   "module": "commonjs",
    //   "moduleResolution": "node",
    //   "sourceMap": false,
    //   "emitDecoratorMetadata": true,
    //   "experimentalDecorators": true,
    //   "removeComments": true,
    //   "noImplicitAny": false,
    //   "suppressImplicitAnyIndexErrors": true
    // }))
    .pipe(tsProject())
    // .pipe(sourcemaps.write({ sourceRoot: 'app' }))
    .pipe(gulp.dest('build/'));

});

gulp.task('bundle-rxjs', function () {
  var builder = new systemjsBuilder('./', {
      paths: {"rxjs/*": "node_modules/rxjs/*.js"},
      map: {"rxjs": "node_modules/rxjs"},
      packages: {"rxjs": {main: 'Rx.js', defaultExtension: "js"}}
  });

  return builder.bundle('rxjs', 'vendor/Rx.min.js', {
      sourceMaps: true,
      minify: true,
      mangle: true
  })
  .then(function() {
      console.log('Build complete');
  })
  .catch(function(err) {
      console.log('Build error');
      console.log(err);
  });
});


gulp.task('dist-config', function() {
  return gulp.src('app/configs/systemjs.config.js')
    .pipe(gulp.dest('production/configs'));
});

// gulp.task('dist', gulp.series('dist-config', 'tsc'));

gulp.task('bundle-app', gulp.series(function() {

  var builder = new systemjsBuilder('', 'app/configs/systemjs.config.js');
  return builder
      .bundle('build/**/*', 'test-build/main.test.bundle.min.js', {
          minify: false,
          mangle: false,
          sourceMaps: true
      })
      .then(function() {
          console.log('Build complete');
      })
      .catch(function(err) {
          console.log('Build error');
          console.log(err);
      });

}));

gulp.task('bundle-vendor', gulp.series(function() {

  var builder = new systemjsBuilder('', 'app/configs/systemjs.config.js');
  return builder
  // .bundle('build/app/**/* - [build/app/**/*.js]', 'test-build/vendor.bundle.min.js', {
      .bundle('build/**/* - [build/**/*.js]', 'production/dependencies.bundle.min.js', {
      // .bundle('app/**/* - [app/**/*]', 'test-build/vendor.bundle.min.js', {
          minify: false,
          mangle: false,
          sourceMaps: true

      })
      .then(function() {
          console.log('Build complete');
      })
      .catch(function(err) {
          console.log('Build error');
          console.log(err);
      });

}));

gulp.task('watch', function() {
  // gulp.watch('app/*.ts', gulp.series('bundle-app'));
  gulp.watch('app/**/*.ts', gulp.series('tsc'));
});


// gulp.task('production', gulp.series('bundle-app', 'bundle-dependencies'));

gulp.task('test-build', gulp.series(
  // 'bundle-app',
  'bundle-vendor'
));