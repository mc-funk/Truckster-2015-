'use strict';

/**
 * @ngInject
 */
export function OnConfig($mdThemingProvider, $stateProvider, $locationProvider, $urlRouterProvider) {

  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('deep-orange')
    .warnPalette('red');
  $mdThemingProvider.theme('dark', 'default')
    .primaryPalette('pink')
    .dark();

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('Home', {
      url: '/',
      controller: 'MainCtrl as main',
      templateUrl: 'main.html',
      title: 'Dashboard',
      icon: 'home'
    })
    .state('Stats', {
      url: '/stats',
      controller: 'StatsCtrl as stats',
      templateUrl: 'stats.html',
      title: 'Statistics',
      icon: 'whatshot'
    })
    .state('Demos', {
      url: '/demos',
      controller: 'DemoCtrl as demo',
      templateUrl: 'demos.html',
      title: 'Demos',
      icon: 'apps'
    });  

  $urlRouterProvider.otherwise('/');
}
