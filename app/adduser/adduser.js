'use strict';

angular.module('myApp.addUser', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addUser', {
            templateUrl: 'addUser/addUser.html',
            controller: 'AddUserCtrl'
        });
    }])

    .controller('AddUserCtrl', ['$scope', '$http','loginService', function ($scope, $http,loginService) {

        $scope.successTextAlert = false;
        $scope.errorTextAlert = false;
        $scope.token = '';
        $scope.token = loginService.token();

        $scope.addUser = function () {
            if ($scope.token.length > 0) {
                $scope.newUser = {
                    "name": $scope.user.name,
                    "username": $scope.user.username,
                    "password": $scope.user.password,
                    "admin": $scope.user.admin == 'true' ? true : false,
                    "location": $scope.user.location
                };

                $http.post('http://localhost:9001/api/users/?token=' + $scope.token + '', $scope.newUser).success(function (data, status) {
                    console.log(data, status);
                    $scope.successTextAlert = "User added!";
                }).error(function (data, status) {
                    //console.log(data, status);
                    $scope.successTextAlert = false;
                    if (data.error.code === 11000) {
                        $scope.errorTextAlert = "Username already exists! Please try another one"
                    } else {
                        $scope.errorTextAlert = "Error!";
                    }
                });
            }
        };


    }]);