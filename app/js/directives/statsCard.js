'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function statsCard(ApiService) {

  return {
    restrict: 'E',
    templateUrl: 'statsCard.html',
    scope: {},
    link: function(scope, element, attrs) {
      ApiService.getStats(function (stats) {
        scope.stats = stats.data;
      }, function (err) { console.log('getStats failed:', err); });
    }
  };

}

directivesModule.directive('statsCard', ['ApiService', statsCard]);
