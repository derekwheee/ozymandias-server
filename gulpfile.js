var gulp         = require('gulp');
var jshint       = require('gulp-jshint');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var rename       = require('gulp-rename');
var livereload   = require('gulp-livereload');
var htmlreplace  = require('gulp-html-replace');
var uglify       = require('gulp-uglifyjs');
var beep         = require('beepbeep');
var del          = require('del');
var chalk        = require('chalk');

gulp.task('copy:views', function () {

    console.log(chalk.magenta.bold('[copy:views]') + ' Copying views to dist');

    return gulp.src('./dashboard/views/**/*.hbs', {base: './dashboard/views'})
        .pipe(gulp.dest('./dashboard/dist/views/'));

});

gulp.task('html-replace', ['uglify', 'copy:views'], function() {

    console.log(chalk.magenta.bold('[html-replace]') + ' Replacing some HTML');

    return gulp.src('dashboard/views/shared/_layout.hbs')
        .pipe(htmlreplace({
            'js': 'js/scripts.min.js'
        }))
        .pipe(gulp.dest('dashboard/dist/views/shared/'));
});

gulp.task('lint', function() {

    console.log(chalk.magenta.bold('[lint]') + ' Linting JavaScript files');

    return gulp.src(['./**/*.js', '!./**/*.min.js', '!./dashboard/static/components/**/*.js', '!./dashboard/static/js/vendor/**/*.js', '!./node_modules/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));

});

gulp.task('sass:dev', function () {

    console.log(chalk.magenta.bold('[sass]') + ' Compiling development CSS');

    return gulp.src('dashboard/static/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            sourceMap: true
        }))
        .on('error', function (error) {
            beep();
            console.log(chalk.magenta.bold('[sass]') + ' There was an issue compiling Sass'.bold.red);
            console.error(error.message);
            this.emit('end');
        })
        // Should be writing sourcemaps AFTER autoprefixer runs,
        // but that breaks everything right now.
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 3 versions', 'ie 9']
        }))
        .pipe(gulp.dest('./dashboard/static/css'))
        .pipe(livereload());
});

gulp.task('sass:prod', function () {

    console.log(chalk.magenta.bold('[sass]') + ' Compiling production CSS');

    return gulp.src('dashboard/static/scss/*.scss')

        .pipe(sass({
            outputStyle: 'compressed',
            sourcemap: false
        }))

        .on('error', function (error) {
            beep();
            console.error(error);
            this.emit('end');
        })

        .pipe(autoprefixer({
            browsers: ['last 3 versions', 'ie 9']
        }))

        .pipe(gulp.dest('./dashboard/static/css'));
});

gulp.task('uglify', function() {

    console.log(chalk.magenta.bold('[uglify]') + ' Concatenating JavaScript files');

    return gulp.src([

        ])
        .pipe(uglify('scripts.min.js'))
        .pipe(gulp.dest('./dashboard/static/js/'));
});

// Watch files for changes
gulp.task('watch', function () {

    console.log(chalk.magenta.bold('[watch]') + ' Watching Sass files for changes');

    livereload.listen();
    gulp.watch(['dashboard/static/scss/**/*.scss'], ['sass:dev']);
    gulp.watch(['./**/*.js', '!./dashboard/static/components/**/*.js', '!./dashboard/static/js/vendor/**/*.js', '!./node_modules/**/*.js'], ['lint']);
    gulp.watch(['./dashboard/views/**/*.hbs'], ['copy:views']);

});

// Compile Sass and watch for file changes
gulp.task('dev', ['lint', 'sass:dev', 'copy:views', 'watch'], function () {
    return console.log(chalk.magenta.bold('\n[dev]') + chalk.bold.green(' Ready for you to start doing things\n'));
});

// Compile production Sass
gulp.task('build', ['sass:prod', 'html-replace', 'icons', 'lint']);
