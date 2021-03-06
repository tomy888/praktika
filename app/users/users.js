'use strict';

angular.module('myApp.users', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'users/users.html',
            controller: 'UsersCtrl'
        });
    }])

    .controller('UsersCtrl', ['$scope', '$http', '$location','loginService','$cookies', function ($scope, $http, $location, loginService,$cookies) {

        var token;
        $cookies.get('praktika_token') ? token = JSON.parse($cookies.get('praktika_token')).token : token = false;

        var usersUrl = 'http://530309.s.dedikuoti.lt:9001/api/users/?token='+token;
        $scope.editEnabled = false;

        $scope.getAllUsers = function () {
            $http.get(usersUrl).
            success(function(data,status) {
                $scope.usersInfo = data;
                //console.log($scope.usersInfo);
                //console.log(status);
            }).
            error(function(data,status) {
                //console.log(status);
              /*  if(status === 403){
                    $location.url('/403');
                }*/
            });
        };

        if (token) $scope.getAllUsers();
        else {
            $location.url('/403');
        }

        $scope.delUser = function (id) {
            //console.log(id)
            var deleteUrl = 'http://530309.s.dedikuoti.lt:9001/api/users/'+id+'/?token='+token+'';
            //console.log(deleteUrl);
            $http.delete(deleteUrl).
            success(function(response) {
                $scope.userDeleteResponce=response;
               console.log(response);
            }).
            error(function(response) {
                console.log(response)
            });
        };

        $scope.search = function () {
            if ($scope.id.length > 0) {
                var url = 'http://530309.s.dedikuoti.lt:9001/api/users/' + $scope.id + '/?token=' + token;

                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    $scope.userById = response.data;
                    console.log($scope.userById);
                    $scope.searchError = false;
                }, function errorCallback(response) {
                    console.log(response);
                    $scope.searchError = 'User not found!';
                });
            }
        };

        $scope.showAll = function () {
            $scope.userById = false;
        };

        $scope.updateUserById = function (user) {
            $http({
                method: 'PUT',
                url: 'http://530309.s.dedikuoti.lt:9001/api/users/'+user._id+'/?token=' + token,
                data: {
                    name:user.name,
                    username: user.username,
                    password: user.password,
                    admin: user.admin,
                    location: user.location
                }
            }).success(function (response) {
                console.log(response);
                $scope.getAllUsers();

            }).
            error(function(response) {
                console.log(response)
            });
            console.log(user);
        };

      //  $scope.editUser();

    }]);
