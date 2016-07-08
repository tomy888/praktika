'use strict';

angular.module('myApp.loginDirective', ['ngRoute']).directive('login', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/components/directives/templates/login-template.html',
        controller: function ($scope, loginService, $cookies) {

            $scope.loggedIn = false;
            $scope.errorTextAlert = false;

            var token;
            $cookies.get('praktika_token') ? token = JSON.parse($cookies.get('praktika_token')).token : token = false;

            if($cookies.get('praktika_token')) {
                $scope.guestName = JSON.parse($cookies.get('praktika_token')).username;
                $scope.loggedIn = true;
            }

            $scope.login = function () {
                //loginService.login($scope.guest);
                //$scope.guestName = $scope.guest.username;
                loginService.loginUser($scope.guest).then(
                    function (success) {
                        if(success.success) {
                            loginService.setToken(success.token, $scope.guest.username);
                            loginService.guestName = $scope.guest.username;
                            $scope.guestName = loginService.guestName;
                            $scope.loggedIn = true;
                        }
                    }, function (error) {
                        console.log(error);
                        $scope.errorTextAlert = error;
                    });
            };

        }
    };
});