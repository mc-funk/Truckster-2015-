'use strict';

var directivesModule = require('./_index.js');
var moment = require('moment');
var _ = require('lodash');

/**
 * @ngInject
 */
function analogVoltageGraph(ApiService) {

  return {
    restrict: 'E',
    templateUrl: 'analogVoltageGraph.html',
    scope: {
      deviceCik: '@',
      dataportRid: '@'
    },
    link: function(scope, element, attrs) {
      var dataport = scope.dataportRid;
      if (dataport.length < 32) {
        dataport = {'alias': dataport};
      }
      ApiService.getTimeSeries(scope.deviceCik, dataport, 50, null, function (data) {
        scope.moment  = moment;
        scope.series = ['Analog Voltage'];
        scope.labels = _.map(data, function (element) { return moment.unix(element[0]).fromNow(); });
        scope.data = [
          _.map(data, function (element) { return element[1]; })
        ];
      }, function (err) { console.log('getTimeSeries failed:', err); });
    }
  };

}

directivesModule.directive('analogVoltageGraph', ['ApiService', analogVoltageGraph]);
