'use strict';

angular.module('myApp.history', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/history', {
            templateUrl: 'history/history.html',
            controller: 'HistoryCtrl'
        });
    }])

    .controller('HistoryCtrl', ['$scope','purchaseHistory','$uibModal','$log','$http', function ($scope, purchaseHistory,$uibModal,$log,$http) {

        $scope.historyData = [];
        $scope.historyData = purchaseHistory.boughtMovies;
        $scope.movieInfo = 'No movie info';

        $scope.open = function (name) {
            var movieUrl = 'http://www.omdbapi.com/?t=' + name + '&y=true&plot=full&r=json&tomatoes=true&type=movie';

            $http({
                method: 'GET',
                url: movieUrl
            }).then(function successCallback(response) {
                $scope.movieInfo = response.data;

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'history/modal/ModalContent.html',
                    controller: function ($scope, $uibModalInstance, movieInfo) {
                        $scope.movieInfo = movieInfo;
                        console.log($scope.movieInfo);
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    },
                    size: 'lg',
                    resolve: {
                        movieInfo: function () {
                            return $scope.movieInfo;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    //
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }, function errorCallback(response) {
                $scope.error = 'Can`t load info';
            });


        };

    }]);