"use strict";
var gulp = require("gulp");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var mqpacker = require("css-mqpacker");
var autoprefixer = require("autoprefixer");
var cssdeclsort = require("css-declaration-sorter");
var sassGlob = require("gulp-sass-glob"); //@importの記述を簡潔にする

gulp.task("sass", function () {
  return gulp.src(["./common/css/**/*.scss", "/common/css/**/*.sass"])
    .pipe(sassGlob()) //importの読み込みを簡潔にする
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(
      postcss([
        mqpacker(),
        autoprefixer({
          grid: true,
          cascade: false,
        }),
        cssdeclsort({ order: "alphabetical" }),
      ])
    )
    .pipe(gulp.dest("./beautify-css"));
});

gulp.task("default", gulp.series(gulp.parallel("sass")));
