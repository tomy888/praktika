'use strict';

angular.module('myApp.addUser', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addUser', {
            templateUrl: 'addUser/addUser.html',
            controller: 'AddUserCtrl'
        });
    }])

    .controller('AddUserCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.successTextAlert = false;
        $scope.errorTextAlert = false;

        $scope.addUser = function () {
            $scope.newUser = {
                "user": {
                    "name": $scope.user.name,
                    "password": $scope.user.password,
                    "isadmin": $scope.user.admin == 'true' ? true : false,
                    "email": $scope.user.email
                }
            };

            $http.post("http://localhost:3000/adduser", $scope.newUser).success(function (data, status) {
                console.log(data, status);
                $scope.successTextAlert = "User added!";
            }).error(function (data, status) {
                console.log(data, status);
                $scope.errorTextAlert = "Error!";
            });
        };


    }]);