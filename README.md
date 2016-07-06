# generator-react-css-modulesify [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> React + css-modulesify + gulp + browserify

This generator creates a new frontend-only project using React. It makes no assumption on your backend. It transpiles all the stuff into `static` folder, and you can point your statics folder to it on your server, or link it anywhere you want.

The new project use css-modulesify to provide a webpack-like way of importing styles from css. It provides component scoped css isolation to avoid naming conflict.

Ideally a component will have a `name.js` under `src/components` and `name.css` under `src/css` if it needs its own styles.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-react-css-modulesify using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-react-css-modulesify
```

Then generate your new project:

```bash
yo react-css-modulesify
```

## Usage

### Bundling

The project makes two bundles: one for vendors dependencies, which does not change very often, and one for your app.


## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [inoc603]()


[npm-image]: https://badge.fury.io/js/generator-react-css-modulesify.svg
[npm-url]: https://npmjs.org/package/generator-react-css-modulesify
[travis-image]: https://travis-ci.org/inoc603/generator-react-css-modulesify.svg?branch=master
[travis-url]: https://travis-ci.org/inoc603/generator-react-css-modulesify
[daviddm-image]: https://david-dm.org/inoc603/generator-react-css-modulesify.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/inoc603/generator-react-css-modulesify
