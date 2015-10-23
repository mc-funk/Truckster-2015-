/*jshint unused: vars */
define([
  'angular',
  'services/apiService',
  'directives/deviceGrid',
  'controllers/main',
  'controllers/about',
  'controllers/nav',
  'controllers/header'],
  function (angular, ApiService, DeviceGrid, MainCtrl, AboutCtrl, NavCtrl, HeaderCtrl) {
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
      'exohackApp.controllers.MainCtrl',
      'exohackApp.controllers.AboutCtrl',
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
          templateUrl: 'static/app/views/main.html',
          controller: 'MainCtrl',
          controllerAs: 'main'
        })
        .when('/about', {
          templateUrl: 'static/app/views/about.html',
          controller: 'AboutCtrl',
          controllerAs: 'about'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
});
