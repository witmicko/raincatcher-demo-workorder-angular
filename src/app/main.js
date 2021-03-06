'use strict';

var angular = require('angular');
var mediatorSubsribers = require('./mediator_subscribers');
var _ = require('lodash');
// require('fh-js-sdk/dist/feedhenry-forms.js');

angular.module('app', [
  require('angular-ui-router'),
  require('angular-material'),
  require('fh-wfm-mediator'),
  require('fh-wfm-workorder-angular')({
    mode: "admin",
    listColumnViewId: "column2",
    mainColumnViewId: "content@app"
  })
]);


//Initialising the application with required serviceconfig and initialising script.
function AppConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/workorders/list');

  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'app/main.tpl.html',
      data: {
        columns: 3
      },

      controller: function($scope, $state, $mdSidenav, mediator) {
        mediatorSubsribers.setupSubscribers(mediator);

        $scope.$state = $state;
        $scope.toggleSidenav = function(event, menuId) {
          $mdSidenav(menuId).toggle();
          event.stopPropagation();
        };
        $scope.navigateTo = function(state, params) {
          if (state) {
            if ($mdSidenav('left').isOpen()) {
              $mdSidenav('left').close();
            }
            $state.go(state, params);
          }
        };
      }
    });
}

angular.module('app').config(["$stateProvider", "$urlRouterProvider", AppConfig]);