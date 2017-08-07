const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('default', () => {
    let akko = gulp.src('lib/Akko.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('akko.js'));

    akko
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));

    akko
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});
