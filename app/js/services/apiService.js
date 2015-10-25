'use strict';

var servicesModule = require('./_index.js');
var _ = require('lodash');
var moment = require('moment');

/**
 * @ngInject
 */
function ApiService($q, $http, apiConfig) {

  var service = {};

  function rpc(clientId, calls) {
    // clientId is optional, so shift the arguments if it wasn't provided
    if (_.isArray(clientId)) {
      calls     = clientId;
      clientId  = null;
    }
    // Add unique id to each call
    calls = _.map(calls, function (call, i) {
      call['id'] = i + 1;
      return call;
    });
    // Compose request
    var auth = null;
    if (clientId == null) {
      auth = { 'cik': apiConfig.cik }
    } else {
      auth = { 'cik': apiConfig.cik, 'client_id': clientId }
    }
    var requestObj = {
      auth:  auth,
      calls: calls
    };

    return $http.post(apiConfig.baseUrl + '/api/onep:v1/rpc/process', requestObj);
  }

  function getStats(onSuccess, onError) {
    return $http.get(apiConfig.baseUrl + '/stats/' + window.location.hostname)
                .then(function (response) { onSuccess(response); },
                      function (response) { onError(response); });
  }

  function getTimeSeries(dataportRid, onSuccess, onError) {
    return null; // TODO
  }

  // Helper function which retrieves device metadata after getting a listing of device clients
  function getDeviceInfo(response) {
    var clients = response.data[0].result.client;
    if (clients.length === 0) {
      return [];
    } else {
      var attrs = { description: true, key: true, tags: true, basic: true, subscribers: true, shares: true, aliases: true};
      var calls = _.map(clients, function (client) {
        return { procedure: 'info', arguments: [client, attrs] };
      });
      return rpc(calls).then(function (response) {
        var zipped    = _.zip(response.data, clients);
        response.data = _.map(zipped, function (tuple) {
          var device = tuple[0].result;
          device['client_id'] = tuple[1];
          device.description.meta = JSON.parse(device.description.meta);
          return device;
        });
        return response;
      }, function onError(response) { console.log('error', response); });
    }
  }

  function getDeviceChildren(response) {
    var calls = _.map(response.data, function (device) {
      var call = {
        procedure: 'listing',
        arguments: [{'alias': ''}, ['dataport', 'datarule', 'dispatch', 'client'], {'activated': true}]
      };
      return rpc(device['client_id'], [call])
              .then(function (r) {
                      var children = r.data[0].result;
                      return _.merge(device, children);
                    },
                    function (r) { console.log(r); });
    });
    return $q.all(calls);
  }

  function mapReads(device, rids, resources) {
    if (!_.isArray(resources)) {
      return device;
    }
    var resources = _.map(_.zip(rids, _.chunk(resources, 2)), function (resourceTuple) {
      var rid  = resourceTuple[0];
      var info = resourceTuple[1][0].result;
      var read = resourceTuple[1][1].result;
      info['rid'] = rid;
      info.description.meta = JSON.parse(info.description.meta);
      if (read.length > 0) {
        info['currentValue'] = {
          timestamp: read[0][0],
          value: read[0][1]
        };
      } else {
        info ['currentValue'] = null;
      }
      return info;
    });
    _.forEach(['dataport', 'datarule', 'dispatch', 'client'], function (key) {
      device[key] = [];
    });
    _.forEach(resources, function (resource) {
      device[resource.basic.type].unshift(resource);
    });
    return device;
  }

  function getDeviceChildrenInfo(devices) {
    var devicesWithRids = _.map(devices, function(device) {
      return {
        device: device,
        cik:    device['client_id'],
        rids: _.flatten(_.map(
          _.zip(device.dataport, device.datarule, device.dispatch, device.client),
          function (rids) {
            return _.filter(rids, function (rid) { return typeof rid === 'string'; });
          }
        ))
      };
    });
    var requests = _.map(devicesWithRids, function (device) {
      var calls = _.map(device.rids, function (rid) {
        var infoAttrs = {"description": true, "key": true, "tags": true, "basic": true, "subscribers": true, "shares": true, "aliases": true};
        return [{
          procedure: 'info',
          arguments: [rid, infoAttrs]
        }, {
          procedure: 'read',
          arguments: [rid, {limit: 1}]
        }];
      });
      return rpc(device.cik, _.flatten(calls))
              .then(function (r) { return mapReads(device.device, device.rids, r.data); },
                    function (r) { console.log('clientReadRequestError', r); });
    });
    return $q.all(requests);
  }

  function getDevices(onSuccess, onError) {
    var args = [{'alias': ''}, ['client'], { owned: true }];
    var calls = [
      { procedure: 'listing', arguments: args }
    ];
    return rpc(calls)
             .then(getDeviceInfo, onError)
             .then(getDeviceChildren, onError)
             .then(getDeviceChildrenInfo, onError)
             .then(function (devices) {
                     onSuccess(devices);
                   },
                   onError);
  }

  service.rpc = rpc;
  service.getDevices = getDevices;
  service.getStats = getStats;

  return service;

}

servicesModule.service('ApiService', ['$q', '$http', 'AppSettings', ApiService]);
