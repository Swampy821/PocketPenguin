var gulp = require ( "gulp" );
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var jsonMinify = require('gulp-json-minify');

gulp.task("default", function() {
  return gulp.src("js/script.js")
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("js"));
});

gulp.task("data", function() {
  return gulp.src("data.json")
    .pipe(jsonMinify())
    .pipe(rename("data.min.json"))
    .pipe(gulp.dest("data"));
});