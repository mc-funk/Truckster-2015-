/*jshint unused: vars */
require.config({
  paths: {
    angular: '../../bower_components/angular/angular',
    ngMaterial: '../../bower_components/angular-material/angular-material',
    ngMdIcons: '../../bower_components/angular-material-icons/angular-material-icons',
    ngAria: '../../bower_components/angular-aria/angular-aria',
    ngTouch: '../../bower_components/angular-touch/angular-touch',
    ngResource: '../../bower_components/angular-resource/angular-resource',
    ngRoute: '../../bower_components/angular-route/angular-route',
    ngAnimate: '../../bower_components/angular-animate/angular-animate',
    jquery: '../../bower_components/jquery/dist/jquery',
    lodash: '../../bower_components/lodash/lodash',
    moment: '../../bower_components/moment/moment',
    'angular-material': '../../bower_components/angular-material/angular-material',
    'angular-material-icons': '../../bower_components/angular-material-icons/angular-material-icons.min',
    'angular-resource': '../../bower_components/angular-resource/angular-resource',
    'angular-route': '../../bower_components/angular-route/angular-route',
    'angular-touch': '../../bower_components/angular-touch/angular-touch'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    ngRoute: [
      'angular'
    ],
    ngResource: [
      'angular'
    ],
    ngAnimate: [
      'angular'
    ],
    ngAria: [
      'angular'
    ],
    ngTouch: [
      'angular'
    ],
    ngMaterial: [
      'angular'
    ],
    ngMdIcons: [
      'angular'
    ]
  },
  priority: [
    'angular'
  ],
  packages: [

  ]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require([
  'angular',
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'ngAria',
  'ngMaterial',
  'ngMdIcons',
  'app',
], function(angular, ngRoutes, ngResource, ngAnimate, _ngAria, ngMaterial, _ngMdIcons, app) {
  'use strict';
  /* jshint ignore:start */
  var $html = angular.element(document.getElementsByTagName('html')[0]);
  /* jshint ignore:end */
  angular.element().ready(function() {
    angular.resumeBootstrap([app.name]);
  });
});
