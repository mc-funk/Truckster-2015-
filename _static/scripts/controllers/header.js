define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name exohackApp.controller:HeaderCtrl
   * @description
   * # HeaderCtrl
   * Controller of the exohackApp
   */
  angular.module('exohackApp.controllers.HeaderCtrl', ['ngMaterial', 'ngMdIcons'])
    .controller('HeaderCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
      $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
      };
    }]);
});
