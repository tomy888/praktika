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
    'ui.bootstrap'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/movies'});
}]);
