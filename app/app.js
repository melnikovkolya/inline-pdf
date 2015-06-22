'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp',
    [
      'ngRoute',
      'ui.bootstrap',
      'inlinePdf'
    ])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/inline-pdf'});
    }]);
