'use strict';

import directivesModule from './_index.js';
import moment from 'moment';

/**
 * @ngInject
 */
function deviceGrid(ApiService) {

  return {
    restrict: 'E',
    templateUrl: 'deviceGrid.html',
    scope: {},
    link: (scope, element, attrs) => {
      scope.moment = moment;
      scope.loading = true;
      ApiService.getDevices((devices) => {
        scope.devices = devices;
        scope.loading = false;
      }, (err) => {
        if (err.status === 401) {
          console.log('Your API request was denied due to an invalid token/hostname combination or CIK');
          console.log('If you are running against localhost, please use a host alias so that your token will be accepted.');
        } else {
          console.log('getDevices failed:', err);
        }
      });
    }
  };

}

directivesModule.directive('deviceGrid', ['ApiService', deviceGrid]);
