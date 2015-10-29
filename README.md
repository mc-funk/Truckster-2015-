# ExoHack Example Application

## Requirements

- Python
- Node

## Getting Started

### Build and Run (Development)

1. Clone this repository
2. `npm install -g gulp` (only if you don't have Bower installed)
3. `npm install`
4. `python virtualenv.py venv`
5. `venv/bin/pip install -r requirements.txt`
6. `gulp dev`

This will set up the environment and run the app at `localhost:3000` with BrowserSync
enabled.

### Build and Run (Production)

- `gulp prod`
- `venv/bin/gunicorn app:app`

### Run on Dokku

1. Create your app on Dokku
2. Add the remote to your git repo, i.e. `git remote add dokku@exohack.io:myapp`
3. `git push dokku master`

## Devices

Currently devices are not created for you, but the example app does have an device creator built in. The spec files for the example.exohack.io devices are under the `priv` folder in case you wish to build off of them.

## Application Structure

### AngularJS

AngularJS is a MVW (Model-View-Whatever) Javascript Framework for creating single-page web applications. In this example app, it is used for all the application routing as well as all of the frontend views and logic.

The AngularJS files are all located within `/app/js`, structured in the following manner:

```
/controllers
  _index.js   (the main module on which all controllers will be mounted, loaded in main.js)
  example.js
/directives
  _index.js   (the main module on which all directives will be mounted, loaded in main.js)
  example.js
/services
  _index.js   (the main module on which all services will be mounted, loaded in main.js)
  example.js
constants.js  (any constant values that you want to make available to Angular)
main.js       (the main file read by Browserify, also where the application is defined and bootstrapped)
on_config.js  (all route definitions and any logic that need to be executed on app.config)
templates.js  (this is created via Gulp by compiling your views, and will not be present beforehand)
```

Controllers, services, directives, etc. should all be placed within their respective folders, and will be automatically required via their respective `_index.js` using `bulk-require`. Most other logic can be placed in an existing file, or added in new files as long as it is required inside `main.js`.

#### Dependency injection

Dependency injection is carried out with the `ng-annotate` library. In order to take advantage of this, a simple comment of the format:

```javascript
/**
 * @ngInject
 */
```

needs to be added directly before any Angular functions/modules. The Gulp tasks will then take care of adding any dependency injection, requiring you only to specify the dependencies within the function call and nothing more.

---

### SASS

SASS, standing for 'Syntactically Awesome Style Sheets', is a CSS extension language adding things like extending, variables, and mixins to the language. This boilerplate provides a barebones file structure for your styles, with explicit imports into `app/styles/main.scss`. A Gulp task (discussed later) is provided for compilation and minification of the stylesheets based on this file.

---

### Browserify

Browserify is a Javascript file and module loader, allowing you to `require('modules')` in all of your files in the same manner as you would on the backend in a node.js environment. The bundling and compilation is then taken care of by Gulp, discussed below.

---

### Gulp

Gulp is a "streaming build system", providing a very fast and efficient method for running your build tasks.

### Web Server/Flask

This example app uses a very thin Python-based web server, running Flask. The important files to be aware of are:

- `app.py` - The Flask application module.
- `config/*` - The configuration files for the Flask application.


### Scripts

A number of build processes are automatically run on all of our Javascript files, run in the following order:

- **JSHint:** Gulp is currently configured to run a JSHint task before processing any Javascript files. This will show any errors in your code in the console, but will not prevent compilation or minification from occurring.
- **Browserify:** The main build process run on any Javascript files. This processes any of the `require('module')` statements, compiling the files as necessary.
- **Babelify:** This uses [babelJS](https://babeljs.io/) to provide support for ES6+ features.
- **Debowerify:** Parses `require()` statements in your code, mapping them to `bower_components` when necessary. This allows you to use and include bower components just as you would npm modules.
- **ngAnnotate:** This will automatically add the correct dependency injection to any AngularJS files, as mentioned previously.
- **Uglifyify:** This will minify the file created by Browserify and ngAnnotate.

The resulting file (`main.js`) is placed inside the directory `/build/js/`.

### Styles

Just one plugin is necessary for processing our SASS files, and that is `gulp-sass`. This will read the `main.scss` file, processing and importing any dependencies and then minifying the result. This file (`main.css`) is placed inside the directory `/build/css/`.

- **gulp-autoprefixer:** Gulp is currently configured to run autoprefixer after compiling the scss.  Autoprefixer will use the data based on current browser popularity and property support to apply prefixes for you. Autoprefixer is recommended by Google and used in Twitter, WordPress, Bootstrap and CodePen.

### Images

Any images placed within `/app/images` will be automatically copied to the `build/images` directory. If running `gulp prod`, they will also be compressed via imagemin.

### Views

When any changes are made to the `index.html` file, the new file is simply copied to the `/build/` directory without any changes occurring.

Files inside `/app/views/`, on the other hand, go through a slightly more complex process. The `gulp-angular-templatecache` module is used in order to process all views/partials, creating the `template.js` file briefly mentioned earlier. This file will contain all the views, now in Javascript format inside Angular's `$templateCache` service. This will allow us to include them in our Javascript minification process, as well as avoid extra HTTP requests for our views.

### Watching files

All of the Gulp processes mentioned above are run automatically when any of the corresponding files in the `/app` directory are changed, and this is thanks to our Gulp watch tasks. Running `gulp dev` will begin watching all of these files, while also serving to `localhost:3002`, and with browser-sync proxy running at `localhost:3000` (by default).

### Production Task

Just as there is the `gulp dev` task for development, there is also a `gulp prod` task for putting your project into a production-ready state. This will run each of the tasks, while also adding the image minification task discussed above. There is also an empty `gulp deploy` task that is included when running the production task. This deploy task can be fleshed out to automatically push your production-ready site to your hosting setup.

**Reminder:** When running the production task, gulp will not fire up the express server and serve your index.html. This task is designed to be run before the `deploy` step that may copy the files from `/build` to a production web server.

### Pre-compressing text assets

When running with `gulp prod`, a pre-compressed file is generated in addition to uncompressed file (.html.gz, .js.gz, css.gz). This is done to enable web servers serve compressed content without having to compress it on the fly. Pre-compression is handled by `gzip` task.
