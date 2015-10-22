define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name exohackApp.ApiService
   * @description
   * # ApiService
   * Service in the exohackApp.
   */
  angular.module('exohackApp.services.ApiService', [])
  	.service('ApiService', ['$http', 'apiConfig', function ($http, apiConfig) {

      this.rpc = function (calls) {
        var requestObj = {
          auth:  { cik: apiConfig.cik },
          calls: calls
        };
        $http.post(apiConfig.baseUrl + '/api/onep:v1/rpc/process', requestObj)
             .then(function success(response) { console.log(response); },
                   function error(response)   { console.log(response); });
      };

      this.getStats = function () {
        $http({
          method: 'GET',
          url: apiConfig.baseUrl + '/stats/' + window.location.hostname
        }).then(function success(response) { console.log(response); },
                function error(response) { console.log(response); });
      };
  	}]);
});
