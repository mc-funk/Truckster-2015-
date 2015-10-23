/*jshint unused: vars */
define([
  'angular',
  'services/apiService',
  'directives/deviceGrid',
  'directives/statsCard',
  'controllers/main',
  'controllers/stats',
  'controllers/nav',
  'controllers/header'],
  function (angular, ApiService, DeviceGrid, StatsCard, MainCtrl, StatsCrl, NavCtrl, HeaderCtrl) {
  'use strict';

  /**
   * @ngdoc overview
   * @name exohackApp
   * @description
   * # exohackApp
   *
   * Main module of the application.
   */
  return angular
    .module('exohackApp', [
      'exohackApp.services.ApiService',
      'exohackApp.directives.DeviceGrid',
      'exohackApp.directives.StatsCard',
      'exohackApp.controllers.MainCtrl',
      'exohackApp.controllers.StatsCtrl',
      'exohackApp.controllers.NavCtrl',
      'exohackApp.controllers.HeaderCtrl',
/*angJSDeps*/
      'ngAria',
      'ngResource',
      'ngRoute',
      'ngAnimate',
      'ngMaterial',
      'ngMdIcons'
      //'ngTouch'
  ])
    .constant('apiConfig', window.APP_CONFIG)
    .config(function ($mdThemingProvider, $routeProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('light-blue')
        .warnPalette('red');
      $routeProvider
        .when('/', {
          templateUrl: 'static/app/views/main.html?cache=' + window.APP_CONFIG.cacheBuster,
          controller: 'MainCtrl',
          controllerAs: 'main'
        })
        .when('/stats', {
          templateUrl: 'static/app/views/stats.html?cache=' + window.APP_CONFIG.cacheBuster,
          controller: 'StatsCtrl',
          controllerAs: 'stats'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
});
