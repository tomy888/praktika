'use strict';

angular.module('myApp.loginDirective', ['ngRoute']).directive('login', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/components/directives/templates/login-template.html',
        controller: function ($scope,$http) {
            $scope.usersData = {};
            var usersUrl = 'http://localhost:3000/users';

            $http.get(usersUrl).
            success(function(data) {
                $scope.usersData = data;
                console.log($scope.usersData);
            }).
            error(function(data) {
                $scope.error = 'Can`t load info';
            });

        }
    };
});