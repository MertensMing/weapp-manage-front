const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const qiniu = require('gulp-qiniu');
const accessKey = 'qRffErplKquwE5_0JS6kQdQ4-oJWi8ZBpmH73MEP';
const secretKey = 'XxeasCERbG7eWynf42W1bRHqaSOghlEM24LQnrsD';

const qiniuOptions = function (bucket = 'weapp') {
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
  gulp.src('./dist/build/**/*.{png,gif,jpg,jpeg}')
    .pipe(qiniuOptions('weapp-resource'))
});

gulp.task('js', function() {
  gulp.src('./dist/build/**/*.js')
    .pipe(qiniuOptions('weapp-static'))
});

gulp.task('font', function() {
  gulp.src('./dist/build/**/*.{woff,woff2,eot,ttf,otf}')
    .pipe(qiniuOptions('weapp-resource'))
});

gulp.task('upload', ['img', 'font', 'js'], () => {});

gulp.task('img-mini', function () {
  gulp.src('./assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./assets/images'));
});
