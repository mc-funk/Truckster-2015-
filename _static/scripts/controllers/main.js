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
        apiService.getDevices(onSuccess, onError);

        function onSuccess(data) {
          console.log('got result:');
          console.log(data);
        }

        function onError(data) {
          console.log('error');
          console.log(data);
        }
      };
    }]);
});
