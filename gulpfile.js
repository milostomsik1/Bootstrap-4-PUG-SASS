var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create();

//LIVE BROWSER RELOAD
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: './public'
		}
	});
});

//PUG TO HTML AND MINIFY
gulp.task('pug-to-html', function buildHTML() {
	return gulp.src('./src/*.pug')
	.pipe(pug({}))
	.pipe(gulp.dest('./public'))
	.pipe(browserSync.reload({ stream: true }));
});

//COMPILE & MINIFY BOOTSTRAP
gulp.task('compile-minify-bootstrap', function() {
	return gulp.src('./src/sass/bootstrap.scss')
	.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
	.pipe(autoprefixer({ cascade: false }))
	.pipe(gulp.dest('./public/css'))
	.pipe(browserSync.stream());
});

//COMPILE & MINIFY SASS
gulp.task('compile-minify-sass', function() {
	return gulp.src('./src/sass/*.sass')
	.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
	.pipe(autoprefixer({ cascade: false }))
	.pipe(gulp.dest('./public/css'))
	.pipe(browserSync.stream());
});

// MINIFY JAVASCRIPT
gulp.task('minify-js', function() {
	gulp.src('./src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./public/js'))
	.pipe(browserSync.stream()); //JS AUTO RELOAD
});

//GULP WATCH
gulp.task('watch', function() {
	gulp.watch('./src/sass/bootstrap.scss', ['compile-minify-bootstrap']);
	gulp.watch('./src/sass/**/*.sass', ['compile-minify-sass']);
	gulp.watch('./src/js/**/*.js', ['minify-js']);
	gulp.watch('./src/**/*.pug', ['pug-to-html']);
});

//GULP TASK RUNNER
gulp.task('default', ['browserSync', 'pug-to-html', 'compile-minify-bootstrap', 'compile-minify-sass', 'minify-js', 'watch']);
