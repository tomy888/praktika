'use strict';

angular.module('myApp.addUser', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addUser', {
            templateUrl: 'adduser/adduser.html',
            controller: 'AddUserCtrl'
        });
    }])

    .controller('AddUserCtrl', ['$scope', '$http','loginService','$cookies', function ($scope, $http,loginService,$cookies) {

        $scope.successTextAlert = false;
        $scope.errorTextAlert = false;
        /*$scope.token = '';
        $scope.token = loginService.token();*/
        var token;
        $cookies.get('praktika_token') ? token = JSON.parse($cookies.get('praktika_token')).token : token = false;

        $scope.addUser = function () {
            if (token.length > 0) {
                $scope.newUser = {
                    "name": $scope.user.name,
                    "username": $scope.user.username,
                    "password": $scope.user.password,
                    "admin": $scope.user.admin == 'true' ? true : false,
                    "location": $scope.user.location
                };

                $http.post('http://530309.s.dedikuoti.lt:9001/api/users/?token=' + token + '', $scope.newUser).success(function (data, status) {
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