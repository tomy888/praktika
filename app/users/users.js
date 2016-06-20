'use strict';

angular.module('myApp.users', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'users/users.html',
            controller: 'UsersCtrl'
        });
    }])

    .controller('UsersCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.usersInfo = {};
        $scope.error = null;
        var usersUrl = 'http://localhost:3000/users';

        $http.jsonp(usersUrl).
        success(function(data) {
            $scope.usersInfo = data;
            console.log($scope.usersInfo);
        }).
        error(function(data) {
            $scope.error = 'Can`t load info';
        });

    }]);