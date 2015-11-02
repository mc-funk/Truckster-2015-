'use strict';

import controllersModule from './_index';

/**
 * @ngInject
 */
function ToastCtrl($scope, $mdToast) {
  $scope.closeToast = function () {
    $mdToast.hide();
  };
}

controllersModule.controller('ToastCtrl', ToastCtrl);
