'use strict';

angular.module('myApp.search', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'search/search.html',
            controller: 'SearchCtrl'
        });
    }])

    .controller('SearchCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.movieInfo = {};
        $scope.error = null;
        $scope.items = ['settings', 'home', 'other'];
        $scope.search = function () {
            if ($scope.keywords.length > 0) {
                var movieUrl = 'http://www.omdbapi.com/?t=' + $scope.keywords + '&y=true&plot=full&r=json&tomatoes=true&type=movie';

                $http({
                    method: 'GET',
                    url: movieUrl
                }).then(function successCallback(response) {
                    $scope.movieInfo = response.data;
                    console.log($scope.movieInfo);
                }, function errorCallback(response) {
                    $scope.error = 'Can`t load info';
                });
            }
        }


    }]);