'use strict';

angular.module('myApp.users', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'users/users.html',
            controller: 'UsersCtrl'
        });
    }])

    .controller('UsersCtrl', ['$scope', '$http', '$location','loginService', function ($scope, $http, $location, loginService) {
        //console.log(loginService.responseData);
        $scope.token = '';
        $scope.token = loginService.token();
        //console.log($scope.token);
        var usersUrl = 'http://localhost:9001/api/users/?token='+$scope.token+'';
        console.log(usersUrl);

        $http.get(usersUrl).
        success(function(data,status) {
            $scope.usersInfo = data;
            //console.log($scope.usersInfo);
            //console.log(status);
        }).
        error(function(data,status) {
            //console.log(status);
            if(status === 403){
                $location.url('/403');
            }
        });

        /*$scope.delUser = function (id) {

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

        }*/

    }]);
