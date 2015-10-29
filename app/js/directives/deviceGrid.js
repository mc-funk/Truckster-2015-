'use strict';

var directivesModule = require('./_index.js');
var moment = require('moment');

/**
 * @ngInject
 */
function deviceGrid(ApiService) {

  return {
    restrict: 'E',
    templateUrl: 'deviceGrid.html',
    scope: {},
    link: function(scope, element, attrs) {
      scope.moment = moment;
      scope.loading = true;
      ApiService.getDevices(function (devices) {
        scope.devices = devices;
        scope.loading = false;
      }, function (err) { console.log('getDevices failed:', err); });
    }
  };

}

directivesModule.directive('deviceGrid', ['ApiService', deviceGrid]);
