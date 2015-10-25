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
      ApiService.getDevices(function (devices) {
        scope.moment = moment;
        scope.devices = devices;
      }, function (err) { console.log('getDevices failed:', err); });
    }
  };

}

directivesModule.directive('deviceGrid', ['ApiService', deviceGrid]);
