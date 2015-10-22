define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name exohackApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the exohackApp
   */
  angular.module('exohackApp.controllers.MainCtrl', ['ngMaterial'])
    .controller('MainCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
      $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
      };
    }]);
});
