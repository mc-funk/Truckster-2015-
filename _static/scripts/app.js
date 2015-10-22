/*jshint unused: vars */
define(['angular', 'controllers/main', 'controllers/about'],
  function (angular, MainCtrl, AboutCtrl) {
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
      'exohackApp.controllers.MainCtrl',
      'exohackApp.controllers.AboutCtrl',
      /*angJSDeps*/
      'ngAria',
      'ngResource',
      'ngRoute',
      'ngAnimate',
      'ngMaterial'
      //'ngTouch'
  ])
    .config(function ($routeProvider) {
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
