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
    scope: {},
    link: function(scope, element, attrs) {
      ApiService.getTimeSeries('345f025456fb4b9a5e120bb12a33d8245a8d0d1c', 'cdca21552437ae4349c8f003be6bcecdf5ab2ef9', 100, null, function (data) {
        scope.moment  = moment;
        scope.series = ['Analog Voltage'];
        scope.labels = _.map(_.chunk(data, 5), function (chunk) { return moment.unix(chunk[0][0]).fromNow(); });
        scope.data = [
          _.map(data, function (element) { return element[1]; })
        ];
      }, function (err) { console.log('getTimeSeries failed:', err); });
    }
  };

}

directivesModule.directive('analogVoltageGraph', ['ApiService', analogVoltageGraph]);
