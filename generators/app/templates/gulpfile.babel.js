import gulp from 'gulp'
import sequence from 'gulp-sequence'
import { lintAndFix, build, watch, buildVendor } from './gulplib'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))
argv.f = argv.f || './src/main.js'

// modules that will go to vendor bundle
const VENDORS = [
  'react',
  'react-dom',
]

// app bundle entries
const ENTRIES = [
  './src/main.js',
]

const STATICS_DIR = './statics'

gulp.task('build:vendor', buildVendor(VENDORS, STATICS_DIR))

gulp.task('build', build(argv.f, VENDORS, STATICS_DIR))

gulp.task('build:all', build(ENTRIES, VENDORS, STATICS_DIR))

gulp.task('watch', watch(argv.f, VENDORS, STATICS_DIR))

gulp.task('watch:all', watch(ENTRIES, VENDORS, STATICS_DIR))

gulp.task('postinstall', (cb) => {
  sequence('build:vendor', 'build:all')(cb)
})

gulp.task('lint', lintAndFix(['src/**/*.js'], { q: false }))

gulp.task('default', ['lint'])
