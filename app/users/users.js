'use strict';

angular.module('myApp.users', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'users/users.html',
            controller: 'UsersCtrl'
        });
    }])

    .controller('UsersCtrl', ['$scope', '$http','moviesCart', function ($scope, $http, moviesCart) {
        $scope.usersInfo = {};
        var usersUrl = 'http://localhost:3000/users';

        $http.get(usersUrl).
        success(function(data) {
            $scope.usersInfo = data;
            console.log($scope.usersInfo);
        }).
        error(function(data) {
            $scope.error = 'Can`t load info';
        });

        $scope.delUser = function (id) {

            var deleteUrl = 'http://localhost:3000/deleteuser/'+id+'';
            $http.get(deleteUrl).
            success(function(data, status) {
                console.log(data)
                $scope.successDeleteTextAlert = "User deleted!";
            }).
            error(function(data, status) {
                $scope.errorDeleteTextAlert = "Error!";
                console.log(data)
            });

        }

    }]);
