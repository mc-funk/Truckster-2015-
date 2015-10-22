/*jshint unused: vars */
require.config({
  paths: {
    angular: '../../bower_components/angular/angular',
    ngMaterial: '../../bower_components/angular-material/angular-material',
    ngAria: '../../bower_components/angular-aria/angular-aria',
    ngTouch: '../../bower_components/angular-touch/angular-touch',
    'angular-resource': '../../bower_components/angular-resource/angular-resource',
    'angular-route': '../../bower_components/angular-route/angular-route',
    'angular-animate': '../../bower_components/angular-animate/angular-animate',
    jquery: '../../bower_components/jquery/dist/jquery',
    lodash: '../../bower_components/lodash/lodash',
    'angular-touch': '../../bower_components/angular-touch/angular-touch',
    'angular-material': '../../bower_components/angular-material/angular-material'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    'angular-route': [
      'angular'
    ],
    'angular-resource': [
      'angular'
    ],
    'angular-animate': [
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
  'angular-route',
  'angular-resource',
  'angular-animate',
  'ngAria',
  'ngMaterial',
  'app',
], function(angular, ngRoutes, ngResource, ngAnimate, _ngAria, ngMaterial, app) {
  'use strict';
  /* jshint ignore:start */
  var $html = angular.element(document.getElementsByTagName('html')[0]);
  /* jshint ignore:end */
  angular.element().ready(function() {
    angular.resumeBootstrap([app.name]);
  });
});
