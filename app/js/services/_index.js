'use strict';

import angular from 'angular';
let bulk = require('bulk-require');

export default angular.module('app.services', []);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
