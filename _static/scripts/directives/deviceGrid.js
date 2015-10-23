define(['angular', 'lodash'], function (angular, _) {
  'use strict';

  /**
   * @ngdoc directive
   * @name exohackApp.directive:deviceGrid
   * @description
   * # deviceGrid
   */
  angular.module('exohackApp.directives.DeviceGrid', [])
    .directive('deviceGrid', ['ApiService', function (ApiService) {
      return {
        restrict: 'E',
        templateUrl: 'static/app/views/deviceGrid.html',
        scope: {},
        link: function postLink(scope, element, attrs) {
          ApiService.getDevices(function (devices) {
            scope.devices = devices;
          }, function (err) { console.log('getDevices failed:', err); });
        }
      };
    }]);
});
