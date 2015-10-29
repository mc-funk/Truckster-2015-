'use strict';

var directivesModule = require('./_index.js');
var _ = require('lodash');

/**
 * @ngInject
 */
function deviceCreator(ApiService, ngMessages) {

  return {
    restrict: 'E',
    templateUrl: 'deviceCreator.html',
    scope: {},
    link: function(scope, element, attrs) {

      scope.addDataPort = () => {
        scope.dataports.push({
          name: '', alias: '', format: '', unit: '', initialValue: ''
        });
      };
      scope.reset = reset;
      scope.isValid = () => {
        return scope.name &&
               _.every(scope.dataports, (dp) => {
                return dp.name && dp.format && dp.initialValue;
              });
      };

      reset();

      function reset() {
        scope.formats = ['float', 'integer', 'string'];
        scope.valid = true;
        scope.name  = 'My Device',
        scope.alias = 'my_device'
        scope.dataports = [
          { name: 'Analog Voltage', alias: 'analog_voltage', format: 'float', unit: '', initialValue: '0.01' }
        ];
      }
    }
  };

}

directivesModule.directive('deviceCreator', ['ApiService', deviceCreator]);
