'use strict';

/**
 * @ngInject
 */
function OnConfig($mdThemingProvider, $stateProvider, $locationProvider, $urlRouterProvider) {

  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('light-blue')
    .warnPalette('red');

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Home', {
    url: '/',
    controller: 'MainCtrl as home',
    templateUrl: 'main.html',
    title: 'Dashboard'
  })
  .state('Stats', {
    url: '/stats',
    controller: 'StatsCtrl as stats',
    templateUrl: 'stats.html',
    title: 'Statistics'
  });

  $urlRouterProvider.otherwise('/');
/*
  $routeProvider
    .when('/', {
      templateUrl: '/views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .when('/stats', {
      templateUrl: '/views/stats.html',
      controller: 'StatsCtrl',
      controllerAs: 'stats'
    })
    .otherwise({
      redirectTo: '/'
    });

    */
}

module.exports = OnConfig;
