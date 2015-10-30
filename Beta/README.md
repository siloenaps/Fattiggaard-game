Fattiggården
https://www.npmjs.com/package/slush-angular
============

## Development

To start developing in the project run:

```bash
gulp serve
```

Then head to `http://localhost:3000` in your browser.

The `serve` tasks starts a static file server, which serves the AngularJS application, and a watch task which watches all files for changes and lints, builds and injects them into the index.html accordingly.

## Tests

To run tests run:

```bash
gulp test
```

**Or** first inject all test files into `karma.conf.js` with:

```bash
gulp karma-conf
```

Then you're able to run Karma directly. Example:

```bash
karma start --single-run
```

## Production ready build - a.k.a. dist

To make the app ready for deploy to production run:

```bash
gulp dist
```

Now there's a `./dist` folder with all scripts and stylesheets concatenated and minified, also third party libraries installed with bower will be concatenated and minified into `vendors.min.js` and `vendors.min.css` respectively.


Søren Tramm:

Based on Slush generator:

Refer to site regarding incapsulation and Angular:
http://lillylabs.no/2014/09/19/avoid-polluting-the-global-namespace-in-javascript/

For Angular:
https://egghead.io/lessons/

ng-view: https://egghead.io/lessons/angularjs-ng-view
