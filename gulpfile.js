const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');

// Rutas
const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    images: 'src/img/**/*.{png,jpg,jpeg,svg,gif,ico,webp,avif}',
    html: './*.html'
};

// CSS
function css() {
    const plugins = [
        autoprefixer({ overrideBrowserslist: ['last 3 versions'], cascade: false }),
        cssnano()
    ];
    return src(paths.scss)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));
}

// JavaScript
function javascript() {
    return src(paths.js)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
}

// Imágenes optimizadas
function imagenes() {
    return src(paths.images)
        .pipe(imagemin())
        .pipe(dest('build/img'));
}

// WebP
function versionWebp() {
    return src(paths.images)
        .pipe(webp())
        .pipe(dest('build/img'));
}

// HTML
function html() {
    return src(paths.html)
        .pipe(dest('build'));
}

// Watch
function dev() {
    watch(paths.scss, css);
    watch(paths.js, javascript);
    watch(paths.images, series(imagenes, versionWebp));
    watch(paths.html, html);
}

// Exports
exports.css = css;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.html = html;
exports.dev = dev;
exports.default = series(
    css,
    javascript,
    imagenes,
    versionWebp,
    html,
    dev
);
