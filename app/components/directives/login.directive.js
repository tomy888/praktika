'use strict';

angular.module('myApp.loginDirective', ['ngRoute']).directive('login', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/components/directives/templates/login-template.html',
        controller: function () {

        }
    };
});