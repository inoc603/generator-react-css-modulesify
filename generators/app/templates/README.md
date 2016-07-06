# <% name %>

## Usage

### Bundling

The project makes two bundles: one for vendors dependencies, which does not change very often, and one for your app. For every entry file, a compiled css file will be created under `statics/css` e.g. `main.css`.

You can define vendor dependencies and entry files by udpating `VENDORS` and `ENTRIES` in `gulpfile.babel.js` 

```bash
# Build vendor bundle
gulp build:vendor
# Build main.js
gulp build
# Build other entry
gulp build -f path/to/other-entry.js
# Build all entries if you have more than one
gulp build:all
```

### Watching

The project use [livereactload](https://github.com/milankinen/livereactload) to provide hot reloading.

```bash
# Watch mian.js
gulp watch
# Watch other entry
gulp watch -f path/to/other-entry.js
# Watch all entries if you have more than one
gulp watch:all
```

Note that you have to serve `index.html` with a server in order for the page to reach the live reload server. Also changes made to css files will not update automatically (yet), you have to manually refresh the page.
