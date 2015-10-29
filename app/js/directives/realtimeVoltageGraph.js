'use strict';

var directivesModule = require('./_index.js');
var moment = require('moment');
var _ = require('lodash');

import {SmoothieChart, TimeSeries} from 'smoothie';
import {Socket, LongPoll} from '../vendor/phoenix';

/**
 * @ngInject
 */
function realtimeVoltageGraph(AppSettings) {

  // Establish websockets connection
  function init(cik, callback) {
    var socket = new Socket(AppSettings.webSocketsUrl, {
      logger: function (kind, msg, data) { /*console.log('socket', kind, msg, data);*/ },
      params: {token: AppSettings.apiKey, domain: window.location.host},
      transport: window.WebSocket
    });

    socket.connect();
    socket.onOpen(()  => { /* console.log('socket:open'); */});
    socket.onError(() => { /* console.log('socket:error'); */});
    socket.onClose(() => { /* console.log('socket:close'); */});

    var channel = socket.channel('rooms:device:' + cik, {});
    channel.join()
           .receive('ignore', () => { /*console.log('channel:ignore', 'auth error');*/ })
           .receive('ok',     () => { console.log('channel:join', 'ok'); callback(channel); });
    channel.onError((err) => { /*console.log('channel:error', err);*/ });
    channel.onClose(()    => { /*console.log('channel:close');*/ });
  }

  var datapoints = [];
  var labels     = [];

  var connected = false;
  var last = 0;

  return {
    restrict: 'E',
    templateUrl: 'realtimeVoltageGraph.html',
    scope: {
      deviceCik: '@',
      dataportRid: '@',
      data: '='
    },
    link: function(scope, element, attrs) {
      // Initialize chart
      var $chart   = element.find('canvas')[0];
      var chart    = new SmoothieChart({
        millisPerPixel: 100, minValueScale: 0,
        grid: {
          millisPerLine: 5000,
          strokeStyle: 'rgba(220, 220, 220, 0.5)',
          fillStyle: 'rgba(250, 250, 250, 1)',
          lineWidth: 1
        },
      });
      chart.streamTo($chart);
      var line1 = new TimeSeries();
      var line2 = new TimeSeries();
      chart.addTimeSeries(line1, { strokeStyle: 'rgba(220, 220, 220, 1)', fillStyle: 'rgba(220, 220, 220, 0.75)', lineWidth: 3});
      chart.addTimeSeries(line2, { strokeStyle: 'rgba(151, 187, 205, 1)', fillStyle: 'rgba(151, 187, 205, 0.75)', lineWidth: 3});

      line1.append(new Date().getTime(), 0);
      line2.append(new Date().getTime(), 0);

      // Parse dataport for aliases
      var dataport = scope.dataportRid;
      if (dataport.length < 32) {
        dataport = {'alias': dataport};
      }
      // Connect to websockets endpoint
      if (!connected) {
        var connection = init(scope.deviceCik, (channel) => {
          connected = true;
          // Handle authentication
          channel.on('auth:ready', () => {
            // Authenticate, which triggers the other events, so auth:success => device:cik
            channel.push('rpc:auth', scope.deviceCik);
          });
          channel.on('auth:success', (cik) => {
            channel.push('rpc:cmd', {
              calls: [{ id: 1, procedure: 'subscribe', arguments: [scope.dataportRid, {}]}]
            });
          });
          channel.on('auth:error', (err) => {
            console.log(err);
          });
          // Handle incoming data
          channel.on('device:' + scope.deviceCik, (payload) => {
            var data = payload.data;
            //console.log('channel:received', 'device:' + scope.deviceCik, data);
            if (_.isArray(data) && _.isArray(data[0].result)) {
              var point = data[0].result;
              var value;
              if (last) {
                value = point[0] - last;
              } else {
                value = point[1];
              }
              last = point[0];
              line1.append(new Date().getTime(), value);
              line2.append(new Date().getTime(), point[1]);
            }
          });
        });
      }
    }
  };

}

directivesModule.directive('realtimeVoltageGraph', ['AppSettings', realtimeVoltageGraph]);
