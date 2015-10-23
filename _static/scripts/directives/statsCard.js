define(['angular', 'lodash'], function (angular, _) {
  'use strict';

  /**
   * @ngdoc directive
   * @name exohackApp.directive:statsCard
   * @description
   * # deviceGrid
   */
  angular.module('exohackApp.directives.StatsCard', [])
    .directive('statsCard', ['ApiService', function (ApiService) {
      return {
        restrict: 'E',
        templateUrl: 'static/app/views/statsCard.html',
        scope: {},
        link: function postLink(scope, element, attrs) {
          ApiService.getStats(function (stats) {
            scope.stats = stats.data;
          }, function (err) { console.log('getStats failed:', err); });
        }
      };
    }]);
});
