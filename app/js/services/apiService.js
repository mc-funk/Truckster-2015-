'use strict';

import servicesModule from './_index.js';
import _              from 'lodash';
import moment         from 'moment';

/**
 * @ngInject
 */
function ApiService($q, $http, apiConfig) {

  $http.defaults.headers.common['Authorization'] = 'Bearer ' + apiConfig.apiKey;

  var service = {};

  function rpc(clientId, calls) {
    // clientId is optional, so shift the arguments if it wasn't provided
    if (_.isArray(clientId)) {
      calls     = clientId;
      clientId  = null;
    }
    // Add unique id to each call
    calls = _.map(calls, (call, i)  => {
      call['id'] = i + 1;
      return call;
    });
    // Compose request
    var requestObj = null;
    if (clientId == null) {
      requestObj = { calls: calls };
    } else {
      requestObj = { auth: { cik: apiConfig.cik, client_id: clientId }, calls: calls };
    }

    return $http.post(apiConfig.baseUrl + '/api/onep:v1/rpc/process', requestObj);
  }

  function getStats(onSuccess, onError) {
    return $http.get(apiConfig.baseUrl + '/stats/' + window.location.hostname)
                .then((response) => { onSuccess(response); },
                      (response) => { onError(response); });
  }

  function getTimeSeries(deviceId, dataportRid, limit, since, onSuccess, onError) {
    // Compose request
    var auth = { 'cik': deviceId };
    var requestObj = {
      auth:  auth,
      calls: [{ id: 0, procedure: 'read', arguments: [dataportRid, {limit: limit}]}]
    };

    return $http.post(apiConfig.baseUrl + '/api/onep:v1/rpc/process', requestObj)
                .then((response) => { onSuccess(response.data[0].result); },
                      (response) => { onError(response); });
  }

  // Helper function which retrieves device metadata after getting a listing of device clients
  function getDeviceInfo(response) {
    var clients = response.data[0].result.client;
    if (clients.length === 0) {
      return [];
    } else {
      var attrs = { description: true, key: true, tags: true, basic: true, subscribers: true, shares: true, aliases: true};
      var calls = _.map(clients, (client) => {
        return { procedure: 'info', arguments: [client, attrs] };
      });
      return rpc(calls).then(
        (response) => {
          var zipped    = _.zip(response.data, clients);
          response.data = _.map(zipped, (tuple) => {
            var device = tuple[0].result;
            device['client_id'] = tuple[1];
            if (device.description.meta) {
              device.description.meta = JSON.parse(device.description.meta);
            } else {
              device.description.meta = {};
            }
            return device;
          });
          return response;
        },
        (response) => {
          console.log('error', response);
        }
      );
    }
  }

  function getDeviceChildren(response) {
    if (response && response.data) {
      var calls = _.map(response.data, (device) => {
        var call = {
          procedure: 'listing',
          arguments: [{'alias': ''}, ['dataport', 'datarule', 'dispatch', 'client'], {'activated': true}]
        };
        return rpc(device['client_id'], [call])
                .then((r) => {
                        var children = r.data[0].result;
                        return _.merge(device, children);
                      },
                      (r) => { console.log(r); });
      });
      return $q.all(calls);
    }
  }

  function mapReads(device, rids, resources) {
    if (!_.isArray(resources)) {
      return device;
    }
    var resources = _.map(_.zip(rids, _.chunk(resources, 2)), (resourceTuple) => {
      var rid  = resourceTuple[0];
      var info = resourceTuple[1][0].result;
      var read = resourceTuple[1][1].result;
      info['rid'] = rid;
      info.description.meta = JSON.parse(info.description.meta);
      if (read.length > 0) {
        info['currentValue'] = {
          timestamp: read[0][0],
          value:     read[0][1]
        };
      } else {
        info ['currentValue'] = null;
      }
      return info;
    });
    _.forEach(['dataport', 'datarule', 'dispatch', 'client'], (key) => {
      device[key] = [];
    });
    _.forEach(resources, (resource) => {
      device[resource.basic.type].unshift(resource);
    });
    return device;
  }

  function getDeviceChildrenInfo(devices) {
    var devicesWithRids = _.map(devices, (device) => {
      return {
        device: device,
        cik:    device['client_id'],
        rids: _.flatten(_.map(
          _.zip(device.dataport, device.datarule, device.dispatch, device.client),
          (rids) => {
            return _.filter(rids, (rid) => { return typeof rid === 'string'; });
          }
        ))
      };
    });
    var requests = _.map(devicesWithRids, (device) => {
      var calls = _.map(device.rids, (rid) => {
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
              .then((r) => { return mapReads(device.device, device.rids, r.data); },
                    (r) => { console.log('clientReadRequestError', r); });
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
             .then((devices) => { onSuccess(devices); },
                   (err)     => { onError(err); });
  }

  service.rpc = rpc;
  service.getDevices = getDevices;
  service.getStats = getStats;
  service.getTimeSeries = getTimeSeries;

  return service;

}

servicesModule.service('ApiService', ['$q', '$http', 'AppSettings', ApiService]);
