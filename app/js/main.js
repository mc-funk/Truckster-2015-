'use strict';

import angular       from 'angular';
import {AppSettings} from './constants';
import {OnConfig}    from './on_config';


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
angular.element(document).ready(() => {

  let requires = [
    'ui.router',
    'ngResource',
    'ngAnimate',
    'ngAria',
    'ngMaterial',
    'ngMdIcons',
    'ngMessages',
    'templates',
    'app.services',
    'app.controllers',
    'app.directives'
  ];

  let app = angular.module('app', requires)
                   .constant('AppSettings', AppSettings)
                   .config(OnConfig);

  app.run(['$rootScope', ($rootScope) => {
    $rootScope.$on('$stateChangeSuccess', (ev, toState) => {
      let title = 'ExoHack Example';
      if (toState && toState.title) {
        document.title = toState.title;
      }
    })
  }]);

  // mount on window for testing
  window.app = app;

  angular.bootstrap(document, ['app']);

});
