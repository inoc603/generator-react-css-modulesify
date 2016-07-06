import gulp from 'gulp'
import eslint from 'gulp-eslint'
import gulpIf from 'gulp-if'
import _ from 'lodash'
import browserify from 'browserify'
import babelify from 'babelify'
import watchify from 'watchify'
import source from 'vinyl-source-stream'
import streamify from 'gulp-streamify'
import path from 'path'
import uglifyjs from 'gulp-uglify'
import cssModulesify from 'css-modulesify'
import gutil from 'gulp-util'
import PrettyError from 'pretty-error'
import chalk from 'chalk'
import rename from 'gulp-rename'
import merge from 'merge-stream'
import livereload from 'livereactload'

const pe = new PrettyError()

pe.appendStyle({
  'pretty-error > trace > item': {
    marginTop: 0,
    marginBottom: 0,
  },
  'pretty-error > trace > item > header': {
    display: 'inline',
  },
  'pretty-error > trace > item > footer': {
    display: 'inline',
    marginLeft: 2,
  },
  'pretty-error > trace > item > footer > addr': {
    display: 'inline',
    color: 'grey',
  },
  'pretty-error > trace > item > footer > extra': {
    display: 'inline',
    color: 'grey',
  },
})

pe.start()
pe.skipNodeFiles()

const isProd = process.env.NODE_ENV === 'production'

function printErrorStack(err) {
  if (err) gutil.log(pe.render(err))
}

function getBrowserifyStream(opts) {
  opts = opts || {}
  console.log(__dirname, path.join(
    opts.staticsDir, `css/${path.basename(opts.file, '.js')}.css`))
  return browserify({
    entries: [opts.file],
    transform: [babelify],
    plugin: isProd || opts.watchify ? [livereload] : [],
    debug: !isProd,
    fullPaths: !isProd,
    cache: {},
    packageCache: {},
  })
  .plugin(cssModulesify, {
    rootDir: __dirname,
    output: path.join(
      opts.staticsDir, `css/${path.basename(opts.file, '.js')}.css`),
    global: true,
  })
  .external(opts.vendors || [])
}

function buildJsAndCss(file, vendors, staticsDir) {
  return getBrowserifyStream({
    file,
    staticsDir,
    vendors,
    watchify: false,
  })
  .on('error', printErrorStack)
  .bundle()
  .pipe(source(path.basename(file)))
  .pipe(streamify(uglifyjs()))
  .pipe(gulp.dest(path.join(staticsDir, 'js')))
}

function watchFile(file, vendors, staticsDir) {
  const bundler = getBrowserifyStream({
    file,
    vendors,
    staticsDir,
    watchify: true,
  })

  gutil.log('Start watching', file)

  const watcher = watchify(bundler)

  watcher.build = () => {
    gutil.log('Building', chalk.yellow(path.basename(file)))
    watcher.bundle()
           .on('error', printErrorStack)
           .pipe(source(file))
           .pipe(rename({ dirname: '' }))
           .pipe(gulp.dest(path.join(staticsDir, 'js')))
  }

  watcher.on('error', printErrorStack)
    .on('update', watcher.build)
    .on('time', (time) => {
      gutil.log(
        'Built %s in %s %s',
        chalk.yellow(path.basename(file)),
        chalk.magenta(time > 1000 ? +((time / 1000).toFixed(2)) : time),
        chalk.magenta(time > 1000 ? 's' : 'ms')
      )
    })

  watcher.build()
}

module.exports.lintAndFix = (files, args) =>
  () =>
    gulp.src(files || [])
      .pipe(eslint({
        fix: true,
        quiet: args && args.q || false,
      }))
      .pipe(eslint.format())
      .pipe(gulpIf(
        file => _.get(file, 'eslint.fixed'),
        gulp.dest(file => file.base),
      ))
      .pipe(eslint.failAfterError())

module.exports.buildVendor = (vendors, staticsDir) =>
  () =>
    browserify()
      .require(vendors)
      .bundle()
      .pipe(source('vendor.js'))
      .pipe(streamify(uglifyjs()))
      .pipe(gulp.dest(path.join(staticsDir, 'js')))

module.exports.build = (files, vendors, staticsDir) =>
  () =>
    merge((files instanceof Array ? files : [files]).map(
      file => buildJsAndCss(file, vendors, staticsDir),
    ))

module.exports.watch = (files, vendors, staticsDir) =>
  () =>
    merge((files instanceof Array ? files : [files]).map(
      file => watchFile(file, vendors, staticsDir),
    ))
