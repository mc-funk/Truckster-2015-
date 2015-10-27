'use strict';

var angular = require('angular');

// angular modules
require('angular-ui-router');
require('angular-aria');
require('angular-resource');
require('angular-animate');
require('angular-material');
require('angular-material-icons');
require('chart.js');
require('angular-chart.js');
require('./templates');
require('./controllers/_index');
require('./services/_index');
require('./directives/_index');

// create and bootstrap application
angular.element(document).ready(function() {

  var requires = [
    'ui.router',
    'ngResource',
    'ngAnimate',
    'ngAria',
    'ngMaterial',
    'ngMdIcons',
    'chart.js',
    'templates',
    'app.services',
    'app.controllers',
    'app.directives'
  ];

  var AppSettings = require('./constants');
  var onConfig    = require('./on_config');

  var app = angular.module('app', requires)
                   .constant('AppSettings', AppSettings)
                   .config(onConfig);

  // mount on window for testing
  window.app = app;

  angular.bootstrap(document, ['app']);

});
