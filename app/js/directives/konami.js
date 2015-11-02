'use strict';

import directivesModule from './_index.js';

/**
 * @ngInject
 */
function konami($document) {

  return {
    restrict: 'A',
    scope: {
      konami: '&'
    },
    link: (scope, element, attr) => {
      let konami_keys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], konami_index = 0;
      let handler = function(e) {
          if (e.keyCode === konami_keys[konami_index++]) {
              if (konami_index === konami_keys.length) {
                  $document.off('keydown', handler);
                  $document.find('body').addClass('transform');
                  //scope.$parent.showToast(attr.konami);
                  setTimeout(() => {
                    $document.find('body').removeClass('transform');
                  }, 3000);
              }
          } else {
              konami_index = 0;
          }
      };

      $document.on('keydown', handler);

      scope.$on('$destroy', () => {
          $document.off('keydown', handler);
      });
    }
  };

}

directivesModule.directive('konami', ['$document', konami]);
