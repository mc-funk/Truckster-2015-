'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function MainCtrl($scope, $mdToast, $document) {
  var last = {
    bottom: true,
    top: false,
    left: false,
    right: true
  };

  $scope.toastPosition = angular.extend({}, last);

  $scope.getToastPosition = function () {
    sanitizePosition();
    return Object.keys($scope.toastPosition)
      .filter(function (pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };
  $scope.showToast = function(template) {
    $mdToast.show({
      controller: 'ToastCtrl',
      templateUrl: template,
      parent : $document[0].querySelector('#toastBounds'),
      hideDelay: 6000,
      position: $scope.getToastPosition()
    });
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;
    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;
    last = angular.extend({},current);
  }
}

controllersModule.controller('MainCtrl', ['$scope', '$mdToast', '$document', MainCtrl]);
