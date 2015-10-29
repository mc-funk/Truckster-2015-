'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function gettingStarted() {

  return {
    restrict: 'E',
    templateUrl: 'gettingStarted.html',
    scope: {
    },
    link: function(scope, element, attrs) {
    }
  };

}

directivesModule.directive('gettingStarted', gettingStarted);
