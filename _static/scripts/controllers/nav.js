define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name exohackApp.controller:NavCtrl
   * @description
   * # NavCtrl
   * Controller of the exohackApp
   */
  angular.module('exohackApp.controllers.NavCtrl', ['ngMaterial', 'ngMdIcons'])
    .controller('NavCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
      $scope.pages = [
        { name: 'Home', route: '#/', icon: 'home' },
        { name: 'Stats', route: '#/stats', icon: 'whatshot' }
      ];
    }]);
});
