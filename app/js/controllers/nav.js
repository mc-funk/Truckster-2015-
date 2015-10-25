'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function NavCtrl($scope, $mdSidenav) {

  $scope.pages = [
    { name: 'Home', route: '/', icon: 'home' },
    { name: 'Stats', route: '/stats', icon: 'whatshot' }
  ];

}

controllersModule.controller('NavCtrl', ['$scope', '$mdSidenav', NavCtrl]);
