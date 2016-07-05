'use strict';

angular.module('myApp.loginDirective', ['ngRoute']).directive('login', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/components/directives/templates/login-template.html',
        controller: function ($scope,$http,loginService) {

            $scope.login = function () {
                $scope.newUser = {"username":$scope.guest.username,"password":$scope.guest.password};
                

                $http.post("http://localhost:9001/api/authenticate", $scope.newUser).success(function (data, status) {
                    //console.log(data, status);
                    $scope.success = data;
                    //console.log($scope.success.message)
                    if($scope.success.success == true){
                        $scope.successTextAlert = "Welcome "+$scope.guest.username+"!";
                        loginService.addResponseData($scope.success.token);
                    }
                    else{
                        $scope.errorTextAlert = "Password or username is incorrect!";
                    }
                }).error(function (data, status) {
                    //console.log(data, status);
                });
            };

        }
    };
});