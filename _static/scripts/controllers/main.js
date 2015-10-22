define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name exohackApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the exohackApp
   */
  angular.module('exohackApp.controllers.MainCtrl', ['ngMaterial', 'ngMdIcons'])
    .controller('MainCtrl', ['$scope', 'ApiService', function ($scope, apiService) {
      $scope.getDeviceList = function getDeviceList() {
        var args = [{"alias": ""}, ["dataport", "datarule", "dispatch", "client"], { owned: true }];
        var calls = [
          { id: 1, procedure: 'listing', arguments: args }
        ];
        apiService.rpc(calls);
      };
    }]);
});
