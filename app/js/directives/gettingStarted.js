'use strict';

import directivesModule from './_index.js';

/**
 * @ngInject
 */
function gettingStarted() {

  return {
    restrict: 'E',
    templateUrl: 'gettingStarted.html',
    scope: {
    },
    link: (scope, element, attrs) => {
    }
  };

}

directivesModule.directive('gettingStarted', gettingStarted);
