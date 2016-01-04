/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    g = require('gulp-load-plugins')({lazy: false}),
    noop = g.util.noop,
    es = require('event-stream'),
    bowerFiles = require('main-bower-files'),
    rimraf = require('rimraf'),
    queue = require('streamqueue'),
    lazypipe = require('lazypipe'),
    stylish = require('jshint-stylish'),
    bower = require('./bower'),
    imagemin = require('gulp-imagemin'),
    ftp = require( 'vinyl-ftp' ),
    replace = require('gulp-replace'),
    shell = require('gulp-shell'),
    runSequence = require('run-sequence'),
    isWatching = false;

var htmlminOpts = {
  removeComments: true,
  collapseWhitespace: true,
  removeEmptyAttributes: false,
  collapseBooleanAttributes: true,
  removeRedundantAttributes: true
};

gulp.task('move-files-locally', function () {
  return  gulp.src('*.js', {read: false})
          .pipe(shell([
            'cd /Users/str/Projects/TripleDesign/Forsorgsmuseet/Work/Fattiggaard/Beta',
            'cp -a dist/ ../../Fattiggaard-web/app/assets/game/'
          ]));
});
gulp.task('set-semicolon', function(){
  var src = './src/app/js/';
  return gulp.src([src+'Main.js'])
      .pipe(replace('(function (lib, img, cjs, ss)', ';(function (lib, img, cjs, ss)'))     
      .pipe(gulp.dest(src));
});
gulp.task('reset-semicolon', function(){
  var src = './src/app/js/';
  return gulp.src([src+'Main.js'])
      .pipe(replace(';(function (lib, img, cjs, ss)', '(function (lib, img, cjs, ss)'))     
      .pipe(gulp.dest(src));
});
gulp.task('set-basepath', function(){
  var src = './src/app/js/utils/';
  return gulp.src([src+'Environment.js'])
      .pipe(replace('gameBasePath: undefined', 'gameBasePath: \'/assets/game/\''))     
      .pipe(gulp.dest(src));
});
gulp.task('reset-basepath', function(){
  var src = './src/app/js/utils/';
  return gulp.src([src+'Environment.js'])
      .pipe(replace('gameBasePath: \'/assets/game/\'', 'gameBasePath: undefined'))     
      .pipe(gulp.dest(src));
});
gulp.task('deploy-local', function(){
  runSequence('reset-semicolon', 'set-semicolon', 'set-basepath', 'dist', 'move-files-locally', 'reset-basepath');
});




/**
 * GZIP
 */
var gzip = require('gulp-gzip');
gulp.task('compress', function() {
    // gulp.src('./dev/scripts/*.js')
    // .pipe(gzip())
    // .pipe(gulp.dest('./public/scripts'));

    return gulp.src('./src/app/assets/logic/**/*.*')
    .pipe(gzip({ append: false }))
    .pipe(gulp.dest('./dist/assets/logic'));
});


/**
 * JS Hint
 */
gulp.task('jshint', function () {
  return gulp.src([
    './gulpfile.js',
    './src/app/**/*.js'
  ])
    .pipe(g.cached('jshint'))
    .pipe(jshint('./.jshintrc'))
    .pipe(livereload());
});

/**
 * CSS
 */
gulp.task('clean-css', function (done) {
  rimraf('./.tmp/css', done);
});

gulp.task('styles', ['clean-css'], function () {
  return gulp.src([
    './src/app/**/*.scss',
    '!./src/app/**/_*.scss'
  ])
    .pipe(g.sass())
    .pipe(gulp.dest('./.tmp/css/'))
    .pipe(g.cached('built-css'))
    .pipe(livereload());
});

gulp.task('styles-dist', ['styles'], function () {
  return cssFiles().pipe(dist('css', bower.name));
});

gulp.task('csslint', ['styles'], function () {
  return cssFiles()
    .pipe(g.cached('csslint'))
    .pipe(g.csslint('./.csslintrc'))
    .pipe(g.csslint.reporter());
});

/**
 * Scripts
 */
gulp.task('scripts-dist', [], function () {
  return appFiles().pipe(dist('js', bower.name, {ngAnnotate: true}));
});

/**
 * Templates
 */
// gulp.task('templates', function () {
//   return templateFiles().pipe(buildTemplates());
// });

// gulp.task('templates-dist', function () {
//   return templateFiles({min: true}).pipe(buildTemplates());
// });

/**
 * Vendors
 */
gulp.task('vendors', function () {
  var files = bowerFiles();
  var vendorJs = fileTypeFilter(files, 'js');
  var vendorCss = fileTypeFilter(files, 'css');
  var q = new queue({objectMode: true});
  if (vendorJs.length) {
    q.queue(gulp.src(vendorJs).pipe(dist('js', 'vendors')));
  }
  if (vendorCss.length) {
    q.queue(gulp.src(vendorCss).pipe(dist('css', 'vendors')));
  }
  return q.done();
});

/**
 * Index
 */
gulp.task('index', index);
gulp.task('build-all', ['styles'], index);

function index () {
  var opt = {read: false};
  return gulp.src('./src/app/index.html')
    .pipe(g.inject(gulp.src(bowerFiles(), opt), {ignorePath: 'bower_components', starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(g.inject(es.merge(appFiles(), cssFiles(opt)), {ignorePath: ['.tmp', 'src/app']}))
    .pipe(gulp.dest('./src/app/'))
    .pipe(g.embedlr())
    .pipe(gulp.dest('./.tmp/'))
    .pipe(livereload());
}

/**
 * Assets
 */
gulp.task('assets', ['sound', 'images', 'fonts', 'logic']);
gulp.task('images', function() {
    return gulp.src('./src/app/assets/images/**/*.*')
    .pipe(imagemin({ progressive: true , optimizationLevel: 5}))
    .pipe(gulp.dest('./dist/assets/images'));
});
gulp.task('sound', function() {
    return gulp.src('./src/app/assets/sounds/**/*.*')
    .pipe(imagemin({ progressive: true , optimizationLevel: 5}))
    .pipe(gulp.dest('./dist/assets/sounds'));
});
gulp.task('fonts', function() {
    return gulp.src(['./src/app/assets/fonts/**/*.*', '!./src/app/assets/fonts/**/*.html', '!./src/app/assets/fonts/**/*.txt'])
    .pipe(gulp.dest('./dist/assets/fonts'));
});
var uglify = require('gulp-uglify'); 
gulp.task('logic', function() {
    return gulp.src('./src/app/assets/logic/**/*.js')    
    .pipe(uglify({hoist_funs: true, hoist_vars: true}))
    // .pipe(gzip({ append: false }))
    .pipe(gulp.dest('./dist/assets/logic'));
});


// gulp.task('compress', function() {
//   return gulp.src('./src/app/assets/logic/**/*.*')
//     .pipe(uglify({hoist_funs: true, hoist_vars: true}))
//     .pipe(gulp.dest('./dist/assets/logic'));
// });
// gulp.task('scripts-dist', ['templates-dist'], function () {
//   return logicFiles().pipe(dist('js', bower.name, {ngAnnotate: true}));
// });


/**
 * Dist
 */
gulp.task('dist', ['vendors', 'assets', 'styles-dist', 'scripts-dist'], function () {
  return gulp.src('./src/app/index.html')
    .pipe(g.inject(gulp.src('./dist/vendors.min.{js,css}'), {ignorePath: 'dist', starttag: '<!-- inject:vendor:{{ext}} -->', addRootSlash: false}))
    .pipe(g.inject(gulp.src('./dist/' + bower.name + '.min.{js,css}'), {ignorePath: 'dist', addRootSlash: false}))
    .pipe(g.htmlmin(htmlminOpts))
    .pipe(gulp.dest('./dist/'));
});
gulp.task('dist-code', ['vendors', 'styles-dist', 'scripts-dist'], function () {
  return gulp.src('./src/app/index.html')
    .pipe(g.inject(gulp.src('./dist/vendors.min.{js,css}'), {ignorePath: 'dist', starttag: '<!-- inject:vendor:{{ext}} -->', addRootSlash: false}))
    .pipe(g.inject(gulp.src('./dist/' + bower.name + '.min.{js,css}'), {ignorePath: 'dist', addRootSlash: false }))
    .pipe(g.htmlmin(htmlminOpts))
    .pipe(gulp.dest('./dist/'));
});
gulp.task('dist-sound', function() {
    return gulp.src('./src/app/assets/sounds/**/*.*')
    .pipe(gulp.dest('./dist/assets/sounds'));
});


/**
 * Static file server
 */
gulp.task('statics', g.serve({
  port: 5000,
  root: ['./.tmp', './.tmp/src/app', './src/app', './bower_components']
}));

/**
 * Watch
 */
gulp.task('serve', ['watch']);
gulp.task('watch', ['statics', 'default'], function () {
  isWatching = true;
  // Initiate livereload server:
  g.livereload.listen(35729);
  gulp.watch('./src/app/**/*.js', ['jshint']).on('change', function (evt) {
    if (evt.type !== 'changed') {
      gulp.start('index');
    } else {
      g.livereload.changed(evt);
    }
  });
  gulp.watch('./src/app/index.html', ['index']);
  gulp.watch(['./src/app/**/*.html', '!./src/app/index.html']);
  gulp.watch(['./src/app/**/*.scss'], ['csslint']).on('change', function (evt) {
    if (evt.type !== 'changed') {
      gulp.start('index');
    } else {
      g.livereload.changed(evt);
    }
  });
});

/**
 * Default task
 */
gulp.task('default', ['lint', 'build-all']);

/**
 * Lint everything
 */
gulp.task('lint', ['jshint', 'csslint']);

/**
 * Test
 */
gulp.task('test', [], function () {
  return testFiles()
    .pipe(g.karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});

/**
 * Inject all files for tests into karma.conf.js
 * to be able to run `karma` without gulp.
 */
gulp.task('karma-conf', [], function () {
  return gulp.src('./karma.conf.js')
    .pipe(g.inject(testFiles(), {
      starttag: 'files: [',
      endtag: ']',
      addRootSlash: false,
      transform: function (filepath, file, i, length) {
        return '  \'' + filepath + '\'' + (i + 1 < length ? ',' : '');
      }
    }))
    .pipe(gulp.dest('./'));
});

/**
 * Test files
 */
function testFiles() {
  return new queue({objectMode: true})
    .queue(gulp.src(fileTypeFilter(bowerFiles(), 'js')))
    .queue(gulp.src('./bower_components/angular-mocks/angular-mocks.js'))
    .queue(appFiles())
    .queue(gulp.src(['./src/app/**/*_test.js', './.tmp/src/app/**/*_test.js']))
    .done();
}

/**
 * All CSS files as a stream
 */
function cssFiles (opt) {
  return gulp.src('./.tmp/css/**/*.css', opt);
}

/**
 * All AngularJS application files as a stream
 */
function appFiles () {
  var files = [
    // './.tmp/' + bower.name + '-templates.js',
    './.tmp/src/app/**/*.js',
    '!./.tmp/src/app/**/*_test.js',
    './src/app/**/*.js',
    '!./src/app/**/*_test.js',
    '!./src/app/**/_*.js',
    '!./src/app/assets/**/*.js',
    '!./src/app/**/*test*.js',
  ];
  return gulp.src(files)
    .pipe(g.angularFilesort());
}

/**
 * Logic js asset files
 */
function logicFiles () {
  var files = [
    './src/app/assets/logic/**/*.js',
  ];
  return gulp.src(files)
    .pipe(g.angularFilesort());
}

/**
 * Filter an array of files according to file type
 *
 * @param {Array} files
 * @param {String} extension
 * @return {Array}
 */
function fileTypeFilter (files, extension) {
  var regExp = new RegExp('\\.' + extension + '$');
  return files.filter(regExp.test.bind(regExp));
}

/**
 * Concat, rename, minify
 *
 * @param {String} ext
 * @param {String} name
 * @param {Object} opt
 */
function dist(ext, name, opt) {
  opt = opt || {};
  return lazypipe()
    .pipe(g.concat, name + '.' + ext)
    .pipe(gulp.dest, './dist')
    .pipe(opt.ngAnnotate ? g.ngAnnotate : noop)
    .pipe(opt.ngAnnotate ? g.rename : noop, name + '.annotated.' + ext)
    .pipe(opt.ngAnnotate ? gulp.dest : noop, './dist')
    .pipe(ext === 'js' ? g.uglify : g.minifyCss)
    .pipe(g.rename, name + '.min.' + ext)
    .pipe(gulp.dest, './dist')();
}

/**
 * Livereload (or noop if not run by watch)
 */
function livereload () {
  return lazypipe()
    .pipe(isWatching ? g.livereload : noop)();
}

/**
 * Jshint with stylish reporter
 */
function jshint (jshintfile) {
  return lazypipe()
    .pipe(g.jshint, jshintfile)
    .pipe(g.jshint.reporter, stylish)();
}

/**
 * Delploy
 */
gulp.task( 'deploy-stage', function () {
 
    var conn = ftp.create( {
        host:     'siloen.dk',
        user:     'siloen',
        password: 'cxraz999',
        parallel: 10,
        log:      null
    } );
 
    var globs = [
        'dist/index.html',
        'dist/*.js',
        'dist/*.css',
        'dist/assets/**'
    ];
 
    // using base = '.' will transfer everything to /public_html correctly 
    // turn off buffering in gulp.src for best performance 
 
    return gulp.src( globs, { base: './dist', buffer: false } )
        .pipe( conn.newer( '/var/www/html/clients/forsorgsmuseet' ) ) // only upload newer files 
        .pipe( conn.dest( '/var/www/html/clients/forsorgsmuseet' ) );
 
} );