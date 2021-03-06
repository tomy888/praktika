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
    'myApp.loginService',
    'ngCookies',
    'myApp.game',
    'myApp.robotService',
    'myApp.commentsDrv'
]).config(['$locationProvider', '$routeProvider','$httpProvider', function ($locationProvider, $routeProvider,$httpProvider) {

    $httpProvider.interceptors.push('interceptorService');
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/movies'});
}]);
