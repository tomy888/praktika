'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.movies',
    'myApp.actors',
    'myApp.search',
    'myApp.users',
    'myApp.addUser',
    'myApp.directives',
    'ui.bootstrap',
    'myApp.services',
    'myApp.cart',
    'myApp.step1',
    'myApp.step2',
    'myApp.step3',
    'myApp.historyService',
    'myApp.history',
    'myApp.loginDirective',
    "myApp.403",
    'myApp.loginService'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/movies'});
}]);
