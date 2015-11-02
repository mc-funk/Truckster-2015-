'use strict';

import controllersModule from './_index';
import _ from 'lodash';

/**
 * @ngInject
 */
function NavCtrl($stateProvider, $scope, $mdSidenav) {

  var states = $stateProvider.get();
  $scope.pages = _.filter(_.map(states, (state) => {
    return { name: state.title, route: state.url, icon: state.icon };
  }), (page) => { return !!page.name; });

}

controllersModule.controller('NavCtrl', ['$state', '$scope', '$mdSidenav', NavCtrl]);
