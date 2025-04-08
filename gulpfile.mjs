import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

// Paths
const paths = {
    styles: {
        src: './assets/scss/**/*.scss',
        dist: './assets/css'
    }
};

// Compile SCSS to CSS
export function CustomStyles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ['> 1%'], cascade: false }))
        .pipe(cleanCSS({ level: 2 }))
        .pipe(gulp.dest(paths.styles.dist));
}

// Watch Task
export function watchFiles() {
    gulp.watch(paths.styles.src, CustomStyles);
}

// Export Tasks
export const build = gulp.parallel(CustomStyles);
export default gulp.series(build, watchFiles);
