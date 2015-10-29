'use strict';

var angular = require('angular');

// angular modules
require('angular-ui-router');
require('angular-aria');
require('angular-resource');
require('angular-animate');
require('angular-material');
require('angular-material-icons');
require('angular-messages');
require('chart.js');
require('smoothie');
require('./vendor/angular-chart.js');
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
    'ngMessages',
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
  app.run(['$rootScope', ($rootScope) => {
    $rootScope.$on('$stateChangeSuccess', (ev, toState) => {
      var title = 'ExoHack Example';
      if (toState && toState.title) {
        document.title = toState.title;
      }
    })
  }]);

  // mount on window for testing
  window.app = app;

  angular.bootstrap(document, ['app']);

});
