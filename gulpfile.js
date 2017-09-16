const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const qiniu = require('gulp-qiniu');
const hash = require('gulp-hash-filename');
const clean = require('gulp-clean');
const rename = require("gulp-rename");

const accessKey = 'qRffErplKquwE5_0JS6kQdQ4-oJWi8ZBpmH73MEP';
const secretKey = 'XxeasCERbG7eWynf42W1bRHqaSOghlEM24LQnrsD';

const qiniuOptions = (bucket) => {
  return qiniu({
    accessKey: accessKey,
    secretKey: secretKey,
    bucket,
    private: false  
  }, {
    versioning: false,
    versionFile: './cdn.json',
    concurrent: 10
  });
}

gulp.task('img', function() {
  gulp.src('./dist/build/**/*.{png,gif,jpg,jpeg,svg}')
    .pipe(qiniuOptions('weapp-static'))
});

gulp.task('js', function() {
  gulp.src('./dist/build/**/*.js')
    .pipe(qiniuOptions('weapp-static'))
});

gulp.task('css', function() {
  gulp.src('./dist/build/**/*.css')
    .pipe(qiniuOptions('weapp-static'))
});

gulp.task('font', function() {
  gulp.src('./dist/build/**/*.{woff,woff2,eot,ttf,otf}')
    .pipe(qiniuOptions('weapp-static'))
});

gulp.task('upload', ['img', 'font', 'js', 'css'], () => {});

gulp.task('img-mini', function () {
  gulp.src('./dist/build/assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/build/assets/images'));
});

gulp.task('copy-assets-local', function() {
  return gulp.src('./assets/**/*')
    .pipe(rename({}))
    .pipe(gulp.dest('./dist/local/assets'))
});

gulp.task('clean-local', function () {
   return gulp.src('./dist/local', {
     read: false
  }).pipe(clean());
});

gulp.task('copy-assets-build', function() {
  return gulp.src('./assets/**/*')
    .pipe(rename({}))
    .pipe(gulp.dest('./dist/build/assets'))
});

gulp.task('clean-build', function () {
   return gulp.src('./dist/build', {
     read: false
  }).pipe(clean());
});
