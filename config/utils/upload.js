const gulp = require('gulp');
const qiniu = require('gulp-qiniu');
const path = require('path');

const accessKey = 'qRffErplKquwE5_0JS6kQdQ4-oJWi8ZBpmH73MEP';
const secretKey = 'XxeasCERbG7eWynf42W1bRHqaSOghlEM24LQnrsD';

const qiniuOptions = (bucket) => {
  return qiniu({
    accessKey,
    secretKey,
    bucket,
  });
};

gulp.task('upload:cdn', () => {
  gulp.src('../../dist/build/**/*.{js,css,png,svg,jpg,gif,jpeg,woff,woff2,eot,ttf,otf}')
    .pipe(qiniuOptions('weapp-static'))
});
