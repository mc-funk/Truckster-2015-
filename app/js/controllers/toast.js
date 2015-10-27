'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ToastCtrl($scope, $mdToast) {
  $scope.closeToast = function () {
    $mdToast.hide();
  };
}

controllersModule.controller('ToastCtrl', ToastCtrl);
