'use strict';

angular.module('myApp.addUser', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addUser', {
            templateUrl: 'addUser/addUser.html',
            controller: 'AddUserCtrl'
        });
    }])

    .controller('AddUserCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.testUser = {"user": {"name": "user4","password": "test4","isadmin": false,"email": "user4@user4.com"}};


            $http({
                method: 'POST',
                url: '"http://localhost:3000/adduser',
                data: "$scope.testUser",
                headers: {'Content-Type': 'application/json'}
            });



    }]);