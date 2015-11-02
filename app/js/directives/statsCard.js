'use strict';

import directivesModule from './_index.js';

/**
 * @ngInject
 */
function statsCard(ApiService) {

  return {
    restrict: 'E',
    templateUrl: 'statsCard.html',
    scope: {},
    link: (scope, element, attrs) => {
      ApiService.getStats((stats) => {
        scope.stats = stats.data;
      }, (err) => { console.log('getStats failed:', err); });
    }
  };

}

directivesModule.directive('statsCard', ['ApiService', statsCard]);
